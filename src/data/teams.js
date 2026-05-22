const svgData = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const flag = (code) => {
  const flags = {
    br: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 104">
        <rect width="160" height="104" fill="#009b3a"/>
        <path d="M80 10 150 52 80 94 10 52z" fill="#ffdf00"/>
        <circle cx="80" cy="52" r="25" fill="#002776"/>
        <path d="M55 46c18-5 39-3 56 8" fill="none" stroke="#fff" stroke-width="5"/>
      </svg>
    `,
    ar: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 104">
        <rect width="160" height="104" fill="#74acdf"/>
        <rect y="34.66" width="160" height="34.66" fill="#fff"/>
        <circle cx="80" cy="52" r="10" fill="#f6b40e"/>
        <g stroke="#f6b40e" stroke-width="2">
          <path d="M80 35v8M80 61v8M63 52h8M89 52h8M68 40l6 6M86 58l6 6M92 40l-6 6M74 58l-6 6"/>
        </g>
      </svg>
    `,
    co: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 104">
        <rect width="160" height="52" fill="#fcd116"/>
        <rect y="52" width="160" height="26" fill="#003893"/>
        <rect y="78" width="160" height="26" fill="#ce1126"/>
      </svg>
    `,
    fr: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 104">
        <rect width="53.33" height="104" fill="#002654"/>
        <rect x="53.33" width="53.34" height="104" fill="#fff"/>
        <rect x="106.67" width="53.33" height="104" fill="#ed2939"/>
      </svg>
    `,
    "gb-eng": `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 104">
        <rect width="160" height="104" fill="#fff"/>
        <rect x="66" width="28" height="104" fill="#cf142b"/>
        <rect y="38" width="160" height="28" fill="#cf142b"/>
      </svg>
    `,
    es: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 104">
        <rect width="160" height="104" fill="#aa151b"/>
        <rect y="26" width="160" height="52" fill="#f1bf00"/>
        <rect x="32" y="39" width="18" height="26" rx="2" fill="#c60b1e"/>
        <rect x="36" y="44" width="10" height="16" fill="#f6d04d"/>
      </svg>
    `
  };
  return svgData(flags[code]);
};

const avatar = (name, colors = "111827,dab251") => {
  const [background, accent] = colors.split(",");
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return svgData(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#${background}"/>
          <stop offset="1" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="128" fill="url(#g)"/>
      <circle cx="128" cy="86" r="42" fill="#${accent}" opacity=".94"/>
      <path d="M54 224c10-48 42-74 74-74s64 26 74 74" fill="#${accent}" opacity=".84"/>
      <text x="128" y="139" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#ffffff">${initials}</text>
    </svg>
  `);
};

const teamMeta = {
  brazil: { id: "brazil", name: "Brasil", code: "br", accent: "#f7d046", crest: "BR", colors: "0a3d2e,f7d046" },
  argentina: { id: "argentina", name: "Argentina", code: "ar", accent: "#7fd0ff", crest: "ARG", colors: "0e2f4f,ffffff" },
  colombia: { id: "colombia", name: "Colombia", code: "co", accent: "#ffd447", crest: "COL", colors: "151a3d,ffd447" },
  france: { id: "france", name: "Francia", code: "fr", accent: "#5ca8ff", crest: "FRA", colors: "111b4f,ffffff" },
  england: { id: "england", name: "Inglaterra", code: "gb-eng", accent: "#e8edf7", crest: "ENG", colors: "61122d,ffffff" },
  spain: { id: "spain", name: "Espana", code: "es", accent: "#f1bf00", crest: "ESP", colors: "7f1d1d,f1bf00" }
};

const cores = {
  brazil: [
    ["Alisson", 33, "GK", ["GK"], "Liverpool", 1, 89, "Der.", "1.93 m"],
    ["Ederson", 32, "GK", ["GK"], "Manchester City", 23, 88, "Izq.", "1.88 m"],
    ["Bento", 26, "GK", ["GK"], "Al-Nassr", 12, 82, "Der.", "1.90 m"],
    ["Danilo", 34, "RB", ["CB"], "Flamengo", 2, 81, "Der.", "1.84 m"],
    ["Marquinhos", 32, "CB", ["CDM"], "Paris Saint-Germain", 4, 86, "Der.", "1.83 m"],
    ["Gabriel Magalhaes", 28, "CB", ["LB"], "Arsenal", 14, 86, "Izq.", "1.90 m"],
    ["Eder Militao", 28, "CB", ["RB"], "Real Madrid", 3, 85, "Der.", "1.86 m"],
    ["Bremer", 29, "CB", ["CB"], "Juventus", 13, 84, "Der.", "1.88 m"],
    ["Gleison Bremer", 29, "CB", ["CB"], "Juventus", 15, 83, "Der.", "1.88 m"],
    ["Wendell", 32, "LB", ["LWB"], "Sao Paulo", 6, 79, "Izq.", "1.76 m"],
    ["Guilherme Arana", 29, "LB", ["LM"], "Atletico Mineiro", 16, 80, "Izq.", "1.76 m"],
    ["Yan Couto", 24, "RB", ["RM"], "Borussia Dortmund", 22, 80, "Der.", "1.68 m"],
    ["Casemiro", 34, "CDM", ["CM"], "Manchester United", 5, 84, "Der.", "1.85 m"],
    ["Bruno Guimaraes", 28, "CM", ["CDM"], "Newcastle United", 8, 85, "Der.", "1.82 m"],
    ["Lucas Paqueta", 28, "CAM", ["CM", "LW"], "West Ham United", 7, 84, "Izq.", "1.80 m"],
    ["Joao Gomes", 25, "CDM", ["CM"], "Wolverhampton", 18, 80, "Der.", "1.76 m"],
    ["Andre", 24, "CDM", ["CM"], "Wolverhampton", 17, 81, "Der.", "1.76 m"],
    ["Douglas Luiz", 28, "CM", ["CDM"], "Juventus", 20, 82, "Der.", "1.75 m"],
    ["Vinicius Junior", 25, "LW", ["ST"], "Real Madrid", 11, 91, "Der.", "1.76 m"],
    ["Rodrygo", 25, "RW", ["LW", "ST"], "Real Madrid", 10, 87, "Der.", "1.74 m"],
    ["Raphinha", 29, "RW", ["LW"], "Barcelona", 19, 86, "Izq.", "1.76 m"],
    ["Neymar Jr", 34, "CAM", ["LW", "ST"], "Santos", 10, 86, "Der.", "1.75 m"],
    ["Endrick", 19, "ST", ["RW"], "Real Madrid", 21, 80, "Izq.", "1.73 m"],
    ["Richarlison", 29, "ST", ["LW"], "Tottenham", 9, 81, "Der.", "1.84 m"],
    ["Gabriel Martinelli", 24, "LW", ["RW"], "Arsenal", 24, 84, "Der.", "1.78 m"],
    ["Savinho", 22, "RW", ["LW"], "Manchester City", 26, 82, "Izq.", "1.76 m"],
    ["Estevao", 19, "RW", ["CAM"], "Chelsea", 27, 78, "Izq.", "1.76 m"],
    ["Matheus Cunha", 27, "ST", ["CAM"], "Manchester United", 25, 82, "Der.", "1.84 m"]
  ],
  argentina: [
    ["Emiliano Martinez", 33, "GK", ["GK"], "Aston Villa", 23, 88, "Der.", "1.95 m"],
    ["Geronimo Rulli", 34, "GK", ["GK"], "Marseille", 12, 81, "Der.", "1.89 m"],
    ["Walter Benitez", 33, "GK", ["GK"], "PSV", 1, 80, "Der.", "1.91 m"],
    ["Cristian Romero", 28, "CB", ["RB"], "Tottenham", 13, 86, "Der.", "1.85 m"],
    ["Lisandro Martinez", 28, "CB", ["LB"], "Manchester United", 25, 84, "Izq.", "1.75 m"],
    ["Nicolas Otamendi", 38, "CB", ["CB"], "Benfica", 19, 82, "Der.", "1.83 m"],
    ["Nahuel Molina", 28, "RB", ["RM"], "Atletico Madrid", 26, 82, "Der.", "1.75 m"],
    ["Gonzalo Montiel", 29, "RB", ["CB"], "Sevilla", 4, 79, "Der.", "1.76 m"],
    ["Nicolas Tagliafico", 33, "LB", ["LWB"], "Lyon", 3, 81, "Izq.", "1.72 m"],
    ["Marcos Acuna", 34, "LB", ["LM"], "River Plate", 8, 80, "Izq.", "1.72 m"],
    ["Enzo Fernandez", 25, "CM", ["CDM"], "Chelsea", 24, 85, "Der.", "1.78 m"],
    ["Rodrigo De Paul", 32, "CM", ["RM"], "Atletico Madrid", 7, 84, "Der.", "1.80 m"],
    ["Alexis Mac Allister", 27, "CM", ["CDM", "CAM"], "Liverpool", 20, 86, "Der.", "1.76 m"],
    ["Leandro Paredes", 31, "CDM", ["CM"], "Roma", 5, 81, "Der.", "1.80 m"],
    ["Exequiel Palacios", 27, "CM", ["CDM"], "Bayer Leverkusen", 14, 83, "Der.", "1.77 m"],
    ["Giovani Lo Celso", 30, "CAM", ["CM"], "Real Betis", 18, 81, "Izq.", "1.77 m"],
    ["Lionel Messi", 38, "RW", ["CAM", "CF"], "Inter Miami", 10, 90, "Izq.", "1.70 m"],
    ["Julian Alvarez", 26, "ST", ["CF", "RW"], "Atletico Madrid", 9, 86, "Der.", "1.70 m"],
    ["Lautaro Martinez", 28, "ST", ["CF"], "Inter", 22, 88, "Der.", "1.74 m"],
    ["Angel Di Maria", 38, "RW", ["CAM"], "Rosario Central", 11, 83, "Izq.", "1.80 m"],
    ["Nicolas Gonzalez", 28, "LW", ["RW"], "Juventus", 15, 82, "Izq.", "1.80 m"],
    ["Alejandro Garnacho", 21, "LW", ["RW"], "Manchester United", 17, 82, "Der.", "1.80 m"],
    ["Paulo Dybala", 32, "CF", ["CAM"], "Roma", 21, 84, "Izq.", "1.77 m"],
    ["Thiago Almada", 25, "CAM", ["LW"], "Lyon", 16, 81, "Der.", "1.71 m"]
  ],
  colombia: [
    ["Camilo Vargas", 37, "GK", ["GK"], "Atlas", 12, 81, "Der.", "1.85 m"],
    ["David Ospina", 37, "GK", ["GK"], "Atletico Nacional", 1, 79, "Der.", "1.83 m"],
    ["Alvaro Montero", 31, "GK", ["GK"], "Millonarios", 22, 76, "Der.", "1.96 m"],
    ["Daniel Munoz", 30, "RB", ["RM"], "Crystal Palace", 21, 82, "Der.", "1.80 m"],
    ["Davinson Sanchez", 29, "CB", ["CB"], "Galatasaray", 23, 82, "Der.", "1.87 m"],
    ["Jhon Lucumi", 28, "CB", ["LB"], "Bologna", 3, 81, "Izq.", "1.87 m"],
    ["Yerry Mina", 31, "CB", ["CB"], "Cagliari", 13, 79, "Der.", "1.95 m"],
    ["Carlos Cuesta", 27, "CB", ["RB"], "Galatasaray", 2, 78, "Der.", "1.79 m"],
    ["Johan Mojica", 33, "LB", ["LWB"], "Mallorca", 17, 78, "Izq.", "1.85 m"],
    ["Deiver Machado", 32, "LB", ["LM"], "Lens", 6, 77, "Izq.", "1.72 m"],
    ["Jefferson Lerma", 31, "CDM", ["CM", "CB"], "Crystal Palace", 16, 80, "Der.", "1.79 m"],
    ["Richard Rios", 25, "CM", ["CDM"], "Benfica", 8, 80, "Der.", "1.85 m"],
    ["Kevin Castano", 25, "CDM", ["CM"], "River Plate", 5, 77, "Der.", "1.77 m"],
    ["Mateus Uribe", 35, "CM", ["CDM"], "Al Sadd", 15, 78, "Der.", "1.82 m"],
    ["James Rodriguez", 34, "CAM", ["RW"], "Leon", 10, 82, "Izq.", "1.80 m"],
    ["Juan Fernando Quintero", 33, "CAM", ["CM"], "America de Cali", 20, 79, "Izq.", "1.69 m"],
    ["Luis Diaz", 29, "LW", ["RW"], "Liverpool", 7, 86, "Der.", "1.80 m"],
    ["Jhon Arias", 28, "RW", ["CAM"], "Wolverhampton", 11, 82, "Der.", "1.68 m"],
    ["Jhon Duran", 22, "ST", ["CF"], "Al-Nassr", 14, 82, "Izq.", "1.85 m"],
    ["Rafael Santos Borre", 30, "ST", ["CF"], "Internacional", 19, 78, "Der.", "1.74 m"],
    ["Luis Sinisterra", 26, "LW", ["RW"], "Bournemouth", 18, 80, "Der.", "1.72 m"],
    ["Yaser Asprilla", 22, "CAM", ["RW"], "Girona", 24, 78, "Izq.", "1.86 m"],
    ["Cucho Hernandez", 27, "ST", ["LW"], "Real Betis", 9, 80, "Der.", "1.76 m"],
    ["Oscar Cortes", 22, "LW", ["RW"], "Rangers", 25, 75, "Der.", "1.76 m"]
  ],
  france: [
    ["Mike Maignan", 30, "GK", ["GK"], "AC Milan", 16, 87, "Der.", "1.91 m"],
    ["Brice Samba", 32, "GK", ["GK"], "Rennes", 1, 81, "Der.", "1.87 m"],
    ["Alphonse Areola", 33, "GK", ["GK"], "West Ham United", 23, 80, "Der.", "1.95 m"],
    ["William Saliba", 25, "CB", ["RB"], "Arsenal", 17, 88, "Der.", "1.92 m"],
    ["Ibrahima Konate", 27, "CB", ["CB"], "Liverpool", 13, 85, "Der.", "1.94 m"],
    ["Dayot Upamecano", 27, "CB", ["CB"], "Bayern Munich", 4, 84, "Der.", "1.86 m"],
    ["Jules Kounde", 27, "RB", ["CB"], "Barcelona", 5, 85, "Der.", "1.80 m"],
    ["Theo Hernandez", 28, "LB", ["LWB"], "AC Milan", 22, 86, "Izq.", "1.84 m"],
    ["Ferland Mendy", 30, "LB", ["CB"], "Real Madrid", 3, 82, "Izq.", "1.80 m"],
    ["Aurelien Tchouameni", 26, "CDM", ["CM", "CB"], "Real Madrid", 8, 86, "Der.", "1.87 m"],
    ["Eduardo Camavinga", 23, "CM", ["LB", "CDM"], "Real Madrid", 6, 84, "Izq.", "1.82 m"],
    ["Adrien Rabiot", 31, "CM", ["LM"], "AC Milan", 14, 83, "Izq.", "1.88 m"],
    ["Warren Zaire-Emery", 20, "CM", ["CDM"], "Paris Saint-Germain", 18, 83, "Der.", "1.78 m"],
    ["N'Golo Kante", 35, "CDM", ["CM"], "Al-Ittihad", 13, 83, "Der.", "1.68 m"],
    ["Antoine Griezmann", 35, "CAM", ["CF", "ST"], "Atletico Madrid", 7, 86, "Izq.", "1.76 m"],
    ["Kylian Mbappe", 27, "ST", ["LW"], "Real Madrid", 10, 91, "Der.", "1.78 m"],
    ["Ousmane Dembele", 29, "RW", ["LW"], "Paris Saint-Germain", 11, 86, "Amb.", "1.78 m"],
    ["Kingsley Coman", 29, "LW", ["RW"], "Bayern Munich", 20, 84, "Der.", "1.79 m"],
    ["Marcus Thuram", 28, "ST", ["LW"], "Inter", 15, 84, "Der.", "1.92 m"],
    ["Randal Kolo Muani", 27, "ST", ["RW"], "Juventus", 12, 82, "Der.", "1.87 m"],
    ["Bradley Barcola", 23, "LW", ["RW"], "Paris Saint-Germain", 25, 82, "Der.", "1.86 m"],
    ["Michael Olise", 24, "RW", ["CAM"], "Bayern Munich", 21, 84, "Izq.", "1.84 m"]
  ],
  england: [
    ["Jordan Pickford", 32, "GK", ["GK"], "Everton", 1, 83, "Izq.", "1.85 m"],
    ["Aaron Ramsdale", 28, "GK", ["GK"], "Southampton", 13, 80, "Der.", "1.88 m"],
    ["Dean Henderson", 29, "GK", ["GK"], "Crystal Palace", 23, 80, "Der.", "1.88 m"],
    ["Kyle Walker", 35, "RB", ["CB"], "Burnley", 2, 82, "Der.", "1.78 m"],
    ["John Stones", 32, "CB", ["CDM"], "Manchester City", 5, 85, "Der.", "1.88 m"],
    ["Marc Guehi", 25, "CB", ["CB"], "Crystal Palace", 6, 82, "Der.", "1.82 m"],
    ["Ezri Konsa", 28, "CB", ["RB"], "Aston Villa", 14, 81, "Der.", "1.83 m"],
    ["Levi Colwill", 23, "CB", ["LB"], "Chelsea", 15, 80, "Izq.", "1.87 m"],
    ["Luke Shaw", 30, "LB", ["LWB"], "Manchester United", 3, 81, "Izq.", "1.85 m"],
    ["Trent Alexander-Arnold", 27, "RB", ["CM"], "Real Madrid", 18, 86, "Der.", "1.80 m"],
    ["Declan Rice", 27, "CDM", ["CM"], "Arsenal", 4, 87, "Der.", "1.85 m"],
    ["Jude Bellingham", 22, "CAM", ["CM"], "Real Madrid", 10, 90, "Der.", "1.86 m"],
    ["Phil Foden", 26, "CAM", ["RW", "LW"], "Manchester City", 11, 88, "Izq.", "1.71 m"],
    ["Bukayo Saka", 24, "RW", ["RM"], "Arsenal", 7, 88, "Izq.", "1.78 m"],
    ["Cole Palmer", 24, "CAM", ["RW"], "Chelsea", 20, 87, "Izq.", "1.89 m"],
    ["Kobbie Mainoo", 21, "CM", ["CDM"], "Manchester United", 26, 80, "Der.", "1.75 m"],
    ["Conor Gallagher", 26, "CM", ["CAM"], "Atletico Madrid", 16, 81, "Der.", "1.82 m"],
    ["Harry Kane", 32, "ST", ["CF"], "Bayern Munich", 9, 90, "Der.", "1.88 m"],
    ["Ollie Watkins", 30, "ST", ["LW"], "Aston Villa", 19, 84, "Der.", "1.80 m"],
    ["Marcus Rashford", 28, "LW", ["ST"], "Barcelona", 17, 83, "Der.", "1.86 m"],
    ["Anthony Gordon", 25, "LW", ["RW"], "Newcastle United", 21, 82, "Der.", "1.83 m"],
    ["Jarrod Bowen", 29, "RW", ["ST"], "West Ham United", 24, 82, "Izq.", "1.75 m"],
    ["Eberechi Eze", 27, "CAM", ["LW"], "Arsenal", 22, 83, "Der.", "1.78 m"]
  ],
  spain: [
    ["Unai Simon", 28, "GK", ["GK"], "Athletic Club", 23, 84, "Der.", "1.90 m"],
    ["David Raya", 30, "GK", ["GK"], "Arsenal", 1, 84, "Der.", "1.83 m"],
    ["Alex Remiro", 30, "GK", ["GK"], "Real Sociedad", 13, 82, "Der.", "1.91 m"],
    ["Dani Carvajal", 34, "RB", ["RWB"], "Real Madrid", 2, 85, "Der.", "1.73 m"],
    ["Pedro Porro", 26, "RB", ["RM"], "Tottenham", 24, 83, "Der.", "1.73 m"],
    ["Robin Le Normand", 29, "CB", ["CB"], "Atletico Madrid", 3, 84, "Der.", "1.87 m"],
    ["Aymeric Laporte", 31, "CB", ["CB"], "Al-Nassr", 14, 83, "Izq.", "1.91 m"],
    ["Pau Torres", 29, "CB", ["LB"], "Aston Villa", 4, 83, "Izq.", "1.91 m"],
    ["Dani Vivian", 26, "CB", ["CB"], "Athletic Club", 5, 81, "Der.", "1.83 m"],
    ["Marc Cucurella", 27, "LB", ["LWB"], "Chelsea", 22, 82, "Izq.", "1.73 m"],
    ["Alejandro Grimaldo", 30, "LB", ["LM"], "Bayer Leverkusen", 12, 84, "Izq.", "1.71 m"],
    ["Rodri", 29, "CDM", ["CM"], "Manchester City", 16, 91, "Der.", "1.91 m"],
    ["Martin Zubimendi", 26, "CDM", ["CM"], "Arsenal", 18, 84, "Der.", "1.81 m"],
    ["Fabian Ruiz", 29, "CM", ["CAM"], "Paris Saint-Germain", 8, 84, "Izq.", "1.89 m"],
    ["Pedri", 23, "CM", ["CAM", "LW"], "Barcelona", 20, 87, "Der.", "1.74 m"],
    ["Gavi", 21, "CM", ["CAM"], "Barcelona", 9, 84, "Der.", "1.73 m"],
    ["Mikel Merino", 29, "CM", ["CDM"], "Arsenal", 6, 84, "Izq.", "1.89 m"],
    ["Dani Olmo", 27, "CAM", ["LW", "RW"], "Barcelona", 10, 85, "Der.", "1.79 m"],
    ["Lamine Yamal", 18, "RW", ["LW"], "Barcelona", 19, 88, "Izq.", "1.80 m"],
    ["Nico Williams", 23, "LW", ["RW"], "Athletic Club", 17, 85, "Der.", "1.81 m"],
    ["Ferran Torres", 25, "RW", ["ST", "LW"], "Barcelona", 11, 82, "Der.", "1.84 m"],
    ["Alvaro Morata", 33, "ST", ["CF"], "Galatasaray", 7, 82, "Der.", "1.90 m"],
    ["Mikel Oyarzabal", 28, "ST", ["LW"], "Real Sociedad", 21, 83, "Izq.", "1.81 m"],
    ["Joselu", 35, "ST", ["CF"], "Al-Gharafa", 26, 81, "Der.", "1.91 m"],
    ["Alex Baena", 24, "CAM", ["LW"], "Atletico Madrid", 15, 82, "Der.", "1.74 m"],
    ["Fermin Lopez", 22, "CAM", ["CM"], "Barcelona", 25, 81, "Der.", "1.74 m"]
  ]
};

const fillerFirst = ["Leo", "Mateo", "Rafael", "Thiago", "Lucas", "Nico", "Andre", "Felipe", "Samuel", "Tomas", "Hugo", "Dylan", "Oscar", "Ivan", "Martin", "Gabriel"];
const fillerLast = ["Silva", "Mendes", "Rojas", "Pereira", "Santos", "Ferreira", "Lopez", "Moreno", "Castro", "Molina", "Moreau", "Dubois", "Bennett", "Smith", "Taylor", "Wilson"];
const fillerClubs = ["Palmeiras", "Flamengo", "River Plate", "Boca Juniors", "Atletico Nacional", "Millonarios", "Lyon", "Monaco", "Aston Villa", "Brighton", "Porto", "Benfica"];
const cyclePositions = ["GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LW", "RW", "ST"];

function normalizeCore(teamId, raw) {
  const meta = teamMeta[teamId];
  return raw.map((p, index) => ({
    id: `${teamId}-${index + 1}`,
    name: p[0],
    age: p[1],
    position: p[2],
    secondaryPositions: p[3],
    club: p[4],
    nationalNumber: p[5],
    photo: avatar(p[0], meta.colors),
    flag: flag(meta.code),
    rating: p[6],
    foot: p[7],
    height: p[8],
    fitness: index % 6 === 0 ? "En observacion" : "Disponible",
    country: meta.name,
    source: "recognized"
  }));
}

function completeRoster(teamId, players) {
  const meta = teamMeta[teamId];
  const roster = [...players];
  let i = 0;
  while (roster.length < 70) {
    const position = cyclePositions[(roster.length + i) % cyclePositions.length];
    const name = `${fillerFirst[(i + teamId.length) % fillerFirst.length]} ${fillerLast[(i * 3 + teamId.length) % fillerLast.length]}`;
    roster.push({
      id: `${teamId}-${roster.length + 1}`,
      name: `${name} ${roster.length + 1}`,
      age: 19 + ((i * 7) % 14),
      position,
      secondaryPositions: position === "GK" ? ["GK"] : [cyclePositions[(i + 4) % cyclePositions.length]],
      club: fillerClubs[(i + teamId.length) % fillerClubs.length],
      nationalNumber: 30 + i,
      photo: avatar(name, meta.colors),
      flag: flag(meta.code),
      rating: 68 + ((i * 5) % 13),
      foot: i % 3 === 0 ? "Izq." : "Der.",
      height: `${1.69 + ((i * 3) % 24) / 100}`.slice(0, 4) + " m",
      fitness: i % 9 === 0 ? "Fatiga leve" : "Disponible",
      country: meta.name,
      source: "generated"
    });
    i += 1;
  }
  return roster;
}

export const teams = Object.values(teamMeta).map((meta) => ({
  ...meta,
  flag: flag(meta.code),
  players: completeRoster(meta.id, normalizeCore(meta.id, cores[meta.id]))
}));
