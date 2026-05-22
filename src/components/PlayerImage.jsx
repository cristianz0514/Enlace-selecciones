import React, { useEffect, useState } from "react";

const memoryCache = new Map();

const countryAliases = {
  Brasil: ["brazil", "brasil", "brazilian", "brasileño"],
  Argentina: ["argentina", "argentinian", "argentino"],
  Colombia: ["colombia", "colombian", "colombiano"],
  Francia: ["france", "french", "french", "francés", "francia"],
  Inglaterra: ["england", "english", "inglés", "britain", "british"],
  Espana: ["spain", "spanish", "español", "espana", "españa"]
};

// Nombres alternativos para búsqueda — jugadores cuyo nombre real difiere del conocido
const searchAliases = {
  "Vinicius Junior": ["Vinicius Jr", "Vinícius Júnior"],
  "Neymar Jr": ["Neymar", "Neymar Jr."],
  "Eder Militao": ["Éder Militão"],
  "Gabriel Magalhaes": ["Gabriel Magalhães", "Gabriel"],
  "Bruno Guimaraes": ["Bruno Guimarães"],
  "Joao Gomes": ["João Gomes"],
  "Emerson Royal": ["Emerson"],
  "Casemiro": ["Carlos Casemiro"],
  "Endrick": ["Endrick Felipe"],
  "Savinho": ["Sávio"],
  "Rodrygo": ["Rodrygo Goes"],
  "Raphinha": ["Raphinha Belloli"],
  "Estevao": ["Estêvão Willian"],
  "Igor Jesus": ["Igor Jesus"],
  "Luiz Henrique": ["Luiz Henrique"],
  "Galeno": ["Wenderson Galeno"],
  "Pedro": ["Pedro Guilherme"],
  "Gabigol": ["Gabriel Barbosa"],
  "Caio Henrique": ["Caio Henrique"],
  "Renan Lodi": ["Renan Lodi"],
  "Thiago Silva": ["Thiago Silva"],
  "Fabinho": ["Fabinho Tavares"],
  "Jhon Lucumi": ["Jhon Lucumí"],
  "Luis Diaz": ["Luis Díaz"],
  "Jhon Duran": ["Jhon Durán"],
  "Yerry Mina": ["Yerry Mina"],
  "Davinson Sanchez": ["Dávinson Sánchez"],
  "Daniel Munoz": ["Daniel Muñoz"],
  "Johan Mojica": ["Johan Mojica"],
  "James Rodriguez": ["James Rodríguez"],
  "Jefferson Lerma": ["Jefferson Lerma"],
  "Richard Rios": ["Richard Ríos"],
  "Rafael Santos Borre": ["Rafael Santos Borré"],
  "Cucho Hernandez": ["Cucho Hernández"],
  "Luis Sinisterra": ["Luis Sinisterra"],
  "Yaser Asprilla": ["Yáser Asprilla"],
  "Oscar Cortes": ["Óscar Cortés"],
  "Falcao Garcia": ["Radamel Falcao", "Falcao"],
  "Duvan Zapata": ["Duván Zapata"],
  "Oscar Estupinan": ["Óscar Estupiñán"],
  "Jhon Cordoba": ["Jhon Córdoba"],
  "Camilo Vargas": ["Camilo Vargas"],
  "David Ospina": ["David Ospina"],
  "Deiver Machado": ["Déiver Machado"],
  "Mateus Uribe": ["Mateus Uribe"],
  "Wilmar Barrios": ["Wilmar Barrios"],
  "Jhon Arias": ["Jhon Arias"],
  "Juan Fernando Quintero": ["Juan Fernando Quintero"],
  "Jorge Carrascal": ["Jorge Carrascal"],
  "Edwin Cardona": ["Edwin Cardona"],
  "Kevin Castano": ["Kevin Castaño"],
  "Andres Andrade": ["Andrés Andrade"],
  "Santiago Arias": ["Santiago Arias"],
  "Jeison Murillo": ["Jeison Murillo"],
  "Frank Fabra": ["Frank Fabra"],
  "Geovanny Caicedo": ["Geovanny Caicedo"],
  "Juan David Cabal": ["Juan David Cabal"],
  "Cristian Borja": ["Cristian Borja"],
  "Bernardo Espinosa": ["Bernardo Espinosa"],
  "Teofilo Gutierrez": ["Teo Gutiérrez", "Teófilo Gutiérrez"],
  "Dayro Moreno": ["Dayro Moreno"],
  "Harold Preciado": ["Harold Preciado"],
  "Alfredo Morelos": ["Alfredo Morelos"],
  "Christian Marrugo": ["Christian Marrugo"],
  "Juan Guillermo Cuadrado": ["Cuadrado", "Juan Cuadrado"],
  "Kylian Mbappe": ["Kylian Mbappé"],
  "Ousmane Dembele": ["Ousmane Dembélé"],
  "N'Golo Kante": ["N'Golo Kanté"],
  "Aurelien Tchouameni": ["Aurélien Tchouaméni"],
  "Eduardo Camavinga": ["Eduardo Camavinga"],
  "Warren Zaire-Emery": ["Warren Zaïre-Emery"],
  "Randal Kolo Muani": ["Randal Kolo Muani"],
  "Bradley Barcola": ["Bradley Barcola"],
  "Desire Doue": ["Désiré Doué"],
  "Theo Hernandez": ["Théo Hernandez"],
  "Dayot Upamecano": ["Dayot Upamecano"],
  "Jules Kounde": ["Jules Koundé"],
  "Ibrahima Konate": ["Ibrahima Konaté"],
  "Benoit Badiashile": ["Benoît Badiashile"],
  "Leny Yoro": ["Leny Yoro"],
  "Khephren Thuram": ["Khéphren Thuram"],
  "Rayan Cherki": ["Rayan Cherki"],
  "Moussa Diaby": ["Moussa Diaby"],
  "Arnaud Kalimuendo": ["Arnaud Kalimuendo"],
  "Pierre Kalulu": ["Pierre Kalulu"],
  "Theo Ndicka": ["Tuta Ndicka", "Evan Ndicka"],
  "Matteo Guendouzi": ["Mattéo Guendouzi"],
  "Youssouf Fofana": ["Youssouf Fofana"],
  "Lucas Hernandez": ["Lucas Hernández"],
  "Emiliano Martinez": ["Emiliano Martínez", "Emi Martinez"],
  "Lautaro Martinez": ["Lautaro Martínez"],
  "Alejandro Garnacho": ["Alejandro Garnacho"],
  "Nicolas Otamendi": ["Nicolás Otamendi"],
  "Cristian Romero": ["Cristian Romero", "Cuti Romero"],
  "Lisandro Martinez": ["Lisandro Martínez"],
  "Nahuel Molina": ["Nahuel Molina"],
  "Nicolas Tagliafico": ["Nicolás Tagliafico"],
  "Enzo Fernandez": ["Enzo Fernández"],
  "Alexis Mac Allister": ["Alexis Mac Allister"],
  "Rodrigo De Paul": ["Rodrigo De Paul"],
  "Exequiel Palacios": ["Exequiel Palacios"],
  "Giovani Lo Celso": ["Giovani Lo Celso"],
  "Angel Di Maria": ["Ángel Di María"],
  "Paulo Dybala": ["Paulo Dybala"],
  "Nicolas Gonzalez": ["Nicolás González"],
  "Julian Alvarez": ["Julián Álvarez"],
  "Franco Mastantuono": ["Franco Mastantuono"],
  "Valentin Carboni": ["Valentín Carboni"],
  "Giuliano Simeone": ["Giuliano Simeone"],
  "Claudio Echeverri": ["Claudio Echeverri"],
  "Matias Soule": ["Matías Soulé"],
  "Santiago Gimenez": ["Santiago Giménez"],
  "Mauro Icardi": ["Mauro Icardi"],
  "Giovanni Simeone": ["Giovanni Simeone"],
  "Valentin Castellanos": ["Valentín Castellanos", "Taty Castellanos"],
  "Joaquin Correa": ["Joaquín Correa"],
  "Jude Bellingham": ["Jude Bellingham"],
  "Harry Kane": ["Harry Kane"],
  "Bukayo Saka": ["Bukayo Saka"],
  "Phil Foden": ["Phil Foden"],
  "Cole Palmer": ["Cole Palmer"],
  "Declan Rice": ["Declan Rice"],
  "Trent Alexander-Arnold": ["Trent Alexander-Arnold"],
  "Pedri": ["Pedri González", "Pedro González López"],
  "Gavi": ["Gavi Páez", "Pablo Gavi"],
  "Lamine Yamal": ["Lamine Yamal"],
  "Nico Williams": ["Nico Williams"],
  "Rodri": ["Rodri Hernández", "Rodrigo Hernández"],
  "Martin Zubimendi": ["Martín Zubimendi"],
  "Dani Olmo": ["Dani Olmo"],
  "Ferran Torres": ["Ferran Torres"],
  "Alvaro Morata": ["Álvaro Morata"],
  "Alejandro Grimaldo": ["Alejandro Grimaldo"],
  "Fabian Ruiz": ["Fabián Ruiz"],
  "Mikel Merino": ["Mikel Merino"],
  "William Saliba": ["William Saliba"],
  "Mike Maignan": ["Mike Maignan"]
};

function normalizeText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSearchNames(player) {
  const aliases = searchAliases[player.name] || [];
  return [player.name, ...aliases].filter(Boolean);
}

function nameLooksRight(playerName, candidateName = "") {
  const playerParts = normalizeText(playerName).split(" ").filter((p) => p.length > 2);
  const candidate = normalizeText(candidateName);
  const mainSurname = playerParts[playerParts.length - 1];
  const firstName = playerParts[0];
  return (
    candidate.includes(normalizeText(playerName)) ||
    (firstName && mainSurname && candidate.includes(firstName) && candidate.includes(mainSurname)) ||
    (playerParts.length === 1 && candidate.includes(playerParts[0]))
  );
}

function contextLooksRight(player, context = "") {
  const normalized = normalizeText(context);
  const club = normalizeText(player.club);
  const countryMatches = (countryAliases[player.country] || []).some((c) => normalized.includes(c));
  const clubMatches = club && normalized.includes(club.split(" ")[0]);
  const sportMatches =
    normalized.includes("footballer") ||
    normalized.includes("soccer") ||
    normalized.includes("football") ||
    normalized.includes("futbolista") ||
    normalized.includes("futbol");
  return sportMatches || clubMatches || countryMatches;
}

function fetchWithTimeout(url, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function fetchImageAsDataUrl(url) {
  try {
    const resp = await fetchWithTimeout(url);
    if (!resp.ok) return "";
    return blobToDataUrl(await resp.blob());
  } catch {
    return "";
  }
}

async function fetchFromBdfutbol(player) {
  const token = localStorage.getItem("bdfutbol_token");
  const email = localStorage.getItem("bdfutbol_email");
  const password = localStorage.getItem("bdfutbol_password");
  let authToken = token;

  if (!authToken && email && password) {
    try {
      const login = await fetch("https://photoapi.bdfutbol.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!login.ok) return "";
      const session = await login.json();
      authToken = session.token;
      if (authToken) localStorage.setItem("bdfutbol_token", authToken);
    } catch {
      return "";
    }
  }

  if (!authToken) return "";

  try {
    const body = { name: player.name, team: player.club, number: String(player.nationalNumber || "") };
    const requestPhoto = (payload) =>
      fetch("https://photoapi.bdfutbol.com/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
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
  } catch {
    return "";
  }
}

async function fetchFromSportsDb(player) {
  const searchNames = getSearchNames(player);

  for (const name of searchNames) {
    try {
      const response = await fetchWithTimeout(
        `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`
      );
      if (!response.ok) continue;

      const data = await response.json();
      const candidates = data.player || [];

      const scored = candidates
        .map((item) => {
          const context = [item.strSport, item.strPlayer, item.strTeam, item.strNationality, item.strDescriptionEN]
            .filter(Boolean)
            .join(" ");
          const image = item.strThumb || item.strCutout || item.strRender;
          const clubNorm = normalizeText(item.strTeam || "");
          const playerClubNorm = normalizeText(player.club);
          const clubMatches =
            clubNorm.includes(playerClubNorm.split(" ")[0]) ||
            playerClubNorm.includes(clubNorm.split(" ")[0]);
          const countryMatches = (countryAliases[player.country] || []).some((c) =>
            normalizeText(item.strNationality || "").includes(c)
          );
          const nameMatch = nameLooksRight(name, item.strPlayer);
          return {
            item,
            image,
            score:
              Number(Boolean(image)) +
              Number(nameMatch) * 5 +
              Number(clubMatches) * 3 +
              Number(countryMatches) * 2 +
              Number(contextLooksRight(player, context))
          };
        })
        .sort((a, b) => b.score - a.score);

      // Umbral reducido: score >= 5 (antes era 7) y el nombre debe coincidir
      const match = scored.find(({ image, score }) => image && score >= 5);
      if (match) {
        const url = match.item.strThumb || match.item.strCutout || match.item.strRender;
        const dataUrl = await fetchImageAsDataUrl(url);
        if (dataUrl) return dataUrl;
      }
    } catch {
      continue;
    }
  }
  return "";
}

async function fetchFromWikipedia(player) {
  const searchNames = getSearchNames(player);
  const countryTerms = countryAliases[player.country] || [];
  const countryEn = countryTerms[0] || "";

  // Varias estrategias de búsqueda
  const queries = [];
  for (const name of searchNames.slice(0, 2)) {
    queries.push(`${name} footballer`);
    queries.push(`${name} ${countryEn} footballer`);
    queries.push(`${name} ${player.club}`);
  }

  for (const query of queries) {
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=5&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=400&exintro=1&explaintext=1&format=json`;
      const response = await fetchWithTimeout(url);
      if (!response.ok) continue;

      const data = await response.json();
      const pages = Object.values(data.query?.pages || {});

      for (const name of searchNames) {
        const match = pages.find((page) => {
          const context = [page.title, page.extract].filter(Boolean).join(" ");
          return page.thumbnail?.source && nameLooksRight(name, page.title) && contextLooksRight(player, context);
        });
        if (match) {
          const dataUrl = await fetchImageAsDataUrl(match.thumbnail.source);
          if (dataUrl) return dataUrl;
        }
      }
    } catch {
      continue;
    }
  }

  // Último recurso: Wikipedia en español
  for (const name of searchNames.slice(0, 1)) {
    try {
      const url = `https://es.wikipedia.org/w/api.php?action=query&origin=*&generator=search&gsrsearch=${encodeURIComponent(name + " futbolista")}&gsrlimit=5&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=400&exintro=1&explaintext=1&format=json`;
      const response = await fetch(url);
      if (!response.ok) continue;
      const data = await response.json();
      const pages = Object.values(data.query?.pages || {});
      const match = pages.find((page) => page.thumbnail?.source && nameLooksRight(name, page.title));
      if (match) {
        const dataUrl = await fetchImageAsDataUrl(match.thumbnail.source);
        if (dataUrl) return dataUrl;
      }
    } catch {
      continue;
    }
  }

  return "";
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
  const key = `player-photo:v4:${player.name}:${player.club}`;
  if (memoryCache.has(key)) return memoryCache.get(key);

  const stored = localStorage.getItem(key);
  if (stored) {
    memoryCache.set(key, stored);
    return stored;
  }

  const dataUrl =
    (await fetchFromBdfutbol(player)) ||
    (await fetchFromSportsDb(player)) ||
    (await fetchFromWikipedia(player)) ||
    player.photo;

  try {
    localStorage.setItem(key, dataUrl);
  } catch {
    // localStorage lleno — solo usamos cache en memoria
  }
  memoryCache.set(key, dataUrl);
  return dataUrl;
}

export default function PlayerImage({ player, className = "" }) {
  const [src, setSrc] = useState(player.photo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setSrc(player.photo);
    setLoading(true);
    fetchRealPhoto(player)
      .then((photo) => {
        if (active) {
          setSrc(photo || player.photo);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setSrc(player.photo);
          setLoading(false);
        }
      });
    return () => { active = false; };
  }, [player.name, player.club]);

  return (
    <img
      className={`${className} ${loading ? "photo-loading" : ""}`}
      src={src}
      alt={player.name}
      crossOrigin="anonymous"
      loading="lazy"
    />
  );
}
