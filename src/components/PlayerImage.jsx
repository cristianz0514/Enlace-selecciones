import React, { useEffect, useState } from "react";

const memoryCache = new Map();
const countryAliases = {
  Brasil: ["brazil", "brasil"],
  Argentina: ["argentina"],
  Colombia: ["colombia"],
  Francia: ["france", "francia", "french"],
  Inglaterra: ["england", "inglaterra", "english"],
  Espana: ["spain", "espana", "espanya", "spanish"]
};

function normalizeText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function nameLooksRight(playerName, candidateName = "") {
  const playerParts = normalizeText(playerName).split(" ").filter((part) => part.length > 2);
  const candidate = normalizeText(candidateName);
  const mainSurname = playerParts[playerParts.length - 1];
  const firstName = playerParts[0];
  return candidate.includes(normalizeText(playerName)) || (candidate.includes(firstName) && candidate.includes(mainSurname));
}

function contextLooksRight(player, context = "") {
  const normalized = normalizeText(context);
  const club = normalizeText(player.club);
  const countryMatches = (countryAliases[player.country] || []).some((country) => normalized.includes(country));
  const clubMatches = club && normalized.includes(club);
  const sportMatches = normalized.includes("footballer") || normalized.includes("soccer") || normalized.includes("football");
  return sportMatches && (clubMatches || countryMatches);
}

async function fetchImageAsDataUrl(url) {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) return "";
  return blobToDataUrl(await imageResponse.blob());
}

async function fetchFromBdfutbol(player) {
  const token = localStorage.getItem("bdfutbol_token");
  const email = localStorage.getItem("bdfutbol_email");
  const password = localStorage.getItem("bdfutbol_password");
  let authToken = token;

  if (!authToken && email && password) {
    const login = await fetch("https://photoapi.bdfutbol.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!login.ok) return "";
    const session = await login.json();
    authToken = session.token;
    if (authToken) localStorage.setItem("bdfutbol_token", authToken);
  }

  if (!authToken) return "";

  const body = {
    name: player.name,
    team: player.club,
    number: String(player.nationalNumber || "")
  };

  const requestPhoto = async (payload) =>
    fetch("https://photoapi.bdfutbol.com/photos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(payload)
    });

  const response = await requestPhoto(body);
  if (!response.ok) return "";

  const contentType = response.headers.get("content-type") || "";
  if (contentType.startsWith("image/")) return blobToDataUrl(await response.blob());

  const data = await response.json();
  const candidates = data.photos || [];
  const exact = candidates.find((item) => normalizeText(item.team).includes(normalizeText(player.club)));
  if (!exact?.photoId) return "";

  const photoResponse = await requestPhoto({ photoId: exact.photoId });
  return photoResponse.ok ? blobToDataUrl(await photoResponse.blob()) : "";
}

async function fetchFromSportsDb(player) {
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(player.name)}`);
  if (!response.ok) return "";

  const data = await response.json();
  const candidates = data.player || [];
  const scored = candidates
    .map((item) => {
      const context = [item.strSport, item.strPlayer, item.strTeam, item.strNationality, item.strDescriptionEN].filter(Boolean).join(" ");
      const image = item.strThumb || item.strCutout || item.strRender;
      const clubMatches = normalizeText(item.strTeam).includes(normalizeText(player.club));
      const countryMatches = (countryAliases[player.country] || []).some((country) => normalizeText(item.strNationality).includes(country));
      const trustedContext = contextLooksRight(player, context);
      return {
        item,
        image,
        score: Number(Boolean(image)) + Number(nameLooksRight(player.name, item.strPlayer)) * 4 + Number(clubMatches) * 4 + Number(countryMatches) * 2 + Number(trustedContext)
      };
    })
    .sort((a, b) => b.score - a.score);
  const match = scored.find(({ item, image, score }) => {
    const context = [item.strPlayer, item.strTeam, item.strNationality, item.strDescriptionEN].filter(Boolean).join(" ");
    return image && score >= 7 && nameLooksRight(player.name, item.strPlayer) && contextLooksRight(player, context);
  });

  return match ? fetchImageAsDataUrl(match.item.strThumb || match.item.strCutout || match.item.strRender) : "";
}

async function fetchFromWikipedia(player) {
  const query = encodeURIComponent(`${player.name} ${player.club} footballer`);
  const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&generator=search&gsrsearch=${query}&gsrlimit=5&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=360&exintro=1&explaintext=1&format=json`;
  const response = await fetch(url);
  if (!response.ok) return "";

  const data = await response.json();
  const pages = Object.values(data.query?.pages || {});
  const match = pages.find((page) => {
    const context = [page.title, page.extract].filter(Boolean).join(" ");
    return page.thumbnail?.source && nameLooksRight(player.name, page.title) && contextLooksRight(player, context);
  });

  return match ? fetchImageAsDataUrl(match.thumbnail.source) : "";
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function fetchRealPhoto(player) {
  const key = `player-photo:v3:${player.name}:${player.club}`;
  if (memoryCache.has(key)) return memoryCache.get(key);

  const stored = localStorage.getItem(key);
  if (stored) {
    memoryCache.set(key, stored);
    return stored;
  }

  if (player.source === "generated") return player.photo;

  const dataUrl = (await fetchFromBdfutbol(player)) || (await fetchFromSportsDb(player)) || (await fetchFromWikipedia(player)) || player.photo;
  try {
    localStorage.setItem(key, dataUrl);
  } catch {
    // Some browsers may refuse large localStorage writes; memory cache still helps this session.
  }
  memoryCache.set(key, dataUrl);
  return dataUrl;
}

export default function PlayerImage({ player, className = "" }) {
  const [src, setSrc] = useState(player.photo);

  useEffect(() => {
    let active = true;
    setSrc(player.photo);
    fetchRealPhoto(player)
      .then((photo) => {
        if (active) setSrc(photo || player.photo);
      })
      .catch(() => {
        if (active) setSrc(player.photo);
      });
    return () => {
      active = false;
    };
  }, [player]);

  return <img className={className} src={src} alt={player.name} crossOrigin="anonymous" loading="lazy" />;
}
