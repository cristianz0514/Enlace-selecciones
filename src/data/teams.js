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
    // Porteros
    ["Alisson", 33, "GK", ["GK"], "Liverpool", 1, 89, "Der.", "1.93 m"],
    ["Ederson", 32, "GK", ["GK"], "Manchester City", 23, 88, "Izq.", "1.88 m"],
    ["Bento", 26, "GK", ["GK"], "Al-Nassr", 12, 82, "Der.", "1.90 m"],
    ["Weverton", 37, "GK", ["GK"], "Palmeiras", 24, 80, "Der.", "1.87 m"],
    ["Lucas Perri", 27, "GK", ["GK"], "Lyon", 25, 77, "Der.", "1.88 m"],
    // Defensas
    ["Danilo", 34, "RB", ["CB"], "Flamengo", 2, 81, "Der.", "1.84 m"],
    ["Marquinhos", 32, "CB", ["CDM"], "Paris Saint-Germain", 4, 86, "Der.", "1.83 m"],
    ["Gabriel Magalhaes", 28, "CB", ["LB"], "Arsenal", 14, 86, "Izq.", "1.90 m"],
    ["Eder Militao", 28, "CB", ["RB"], "Real Madrid", 3, 85, "Der.", "1.86 m"],
    ["Bremer", 29, "CB", ["CB"], "Juventus", 13, 84, "Der.", "1.88 m"],
    ["Murillo", 23, "CB", ["LB"], "Nottingham Forest", 15, 80, "Der.", "1.86 m"],
    ["Wendell", 32, "LB", ["LWB"], "Sao Paulo", 6, 79, "Izq.", "1.76 m"],
    ["Guilherme Arana", 29, "LB", ["LM"], "Atletico Mineiro", 16, 80, "Izq.", "1.76 m"],
    ["Yan Couto", 24, "RB", ["RM"], "Borussia Dortmund", 22, 80, "Der.", "1.68 m"],
    ["Alex Telles", 33, "LB", ["LWB"], "Botafogo", 17, 77, "Izq.", "1.81 m"],
    ["Emerson Royal", 26, "RB", ["RM"], "AC Milan", 26, 79, "Der.", "1.82 m"],
    ["Renan Lodi", 27, "LB", ["LWB"], "Nottingham Forest", 27, 78, "Izq.", "1.76 m"],
    ["Leo Ortiz", 29, "CB", ["CDM"], "Flamengo", 28, 80, "Der.", "1.87 m"],
    ["Nino", 28, "CB", ["CB"], "Fluminense", 29, 79, "Der.", "1.89 m"],
    ["Beraldo", 22, "CB", ["LB"], "Paris Saint-Germain", 30, 77, "Izq.", "1.88 m"],
    ["Alex Sandro", 34, "LB", ["LWB"], "Flamengo", 31, 76, "Izq.", "1.82 m"],
    ["Fabinho", 32, "CDM", ["CB", "RB"], "Al-Ittihad", 5, 83, "Der.", "1.88 m"],
    // Mediocampistas
    ["Casemiro", 34, "CDM", ["CM"], "Manchester United", 5, 84, "Der.", "1.85 m"],
    ["Bruno Guimaraes", 28, "CM", ["CDM"], "Newcastle United", 8, 85, "Der.", "1.82 m"],
    ["Lucas Paqueta", 28, "CAM", ["CM", "LW"], "West Ham United", 7, 84, "Izq.", "1.80 m"],
    ["Joao Gomes", 25, "CDM", ["CM"], "Wolverhampton", 18, 80, "Der.", "1.76 m"],
    ["Andre", 24, "CDM", ["CM"], "Wolverhampton", 17, 81, "Der.", "1.76 m"],
    ["Douglas Luiz", 28, "CM", ["CDM"], "Juventus", 20, 82, "Der.", "1.75 m"],
    ["Gerson", 28, "CM", ["CDM"], "Flamengo", 19, 81, "Izq.", "1.88 m"],
    ["Andreas Pereira", 30, "CAM", ["CM"], "Fulham", 21, 79, "Der.", "1.78 m"],
    ["Matheus Nunes", 27, "CM", ["CDM"], "Manchester City", 32, 81, "Der.", "1.82 m"],
    ["Andrey Santos", 21, "CDM", ["CM"], "Chelsea", 33, 77, "Der.", "1.80 m"],
    ["Everton Ribeiro", 36, "CAM", ["CM"], "Flamengo", 34, 78, "Der.", "1.69 m"],
    // Delanteros
    ["Vinicius Junior", 25, "LW", ["ST"], "Real Madrid", 11, 91, "Der.", "1.76 m"],
    ["Rodrygo", 25, "RW", ["LW", "ST"], "Real Madrid", 10, 87, "Der.", "1.74 m"],
    ["Raphinha", 29, "RW", ["LW"], "Barcelona", 9, 86, "Izq.", "1.76 m"],
    ["Neymar Jr", 34, "CAM", ["LW", "ST"], "Santos", 10, 86, "Der.", "1.75 m"],
    ["Endrick", 19, "ST", ["RW"], "Real Madrid", 21, 80, "Izq.", "1.73 m"],
    ["Richarlison", 29, "ST", ["LW"], "Tottenham", 9, 81, "Der.", "1.84 m"],
    ["Gabriel Martinelli", 24, "LW", ["RW"], "Arsenal", 24, 84, "Der.", "1.78 m"],
    ["Savinho", 22, "RW", ["LW"], "Manchester City", 26, 82, "Izq.", "1.76 m"],
    ["Estevao", 19, "RW", ["CAM"], "Chelsea", 27, 78, "Izq.", "1.76 m"],
    ["Matheus Cunha", 27, "ST", ["CAM"], "Manchester United", 25, 82, "Der.", "1.84 m"],
    ["Gabriel Jesus", 28, "ST", ["LW", "RW"], "Arsenal", 37, 82, "Der.", "1.75 m"],
    ["Igor Jesus", 24, "ST", ["CF"], "Botafogo", 38, 78, "Der.", "1.85 m"],
    ["Luiz Henrique", 24, "LW", ["RW"], "Botafogo", 39, 79, "Der.", "1.76 m"],
    ["Pedro", 28, "ST", ["CF"], "Flamengo", 40, 82, "Der.", "1.88 m"],
    ["Gabigol", 29, "ST", ["LW"], "Cruzeiro", 41, 80, "Der.", "1.73 m"],
    ["Antony", 26, "RW", ["LW"], "Real Betis", 42, 78, "Der.", "1.69 m"],
    ["Galeno", 28, "LW", ["RW"], "Porto", 43, 80, "Izq.", "1.71 m"],
    ["Michael", 28, "RW", ["LW"], "Al-Hilal", 44, 78, "Der.", "1.73 m"],
    ["Hulk", 39, "ST", ["CF"], "Atletico Mineiro", 45, 76, "Der.", "1.80 m"],
    ["Marcos Leonardo", 22, "ST", ["CF"], "Benfica", 46, 77, "Der.", "1.79 m"],
    // Porteros adicionales
    ["Marcos Felipe", 27, "GK", ["GK"], "Fluminense", 47, 75, "Der.", "1.90 m"],
    ["Fabio", 43, "GK", ["GK"], "Fluminense", 48, 74, "Der.", "1.87 m"],
    // Defensas adicionales
    ["Rodrigo Becao", 30, "CB", ["CB"], "Fenerbahce", 49, 80, "Der.", "1.87 m"],
    ["Lucas Verissimo", 30, "CB", ["CB"], "Benfica", 50, 79, "Der.", "1.86 m"],
    ["Felipe", 37, "CB", ["CB"], "Atletico Madrid", 51, 77, "Der.", "1.89 m"],
    ["Thiago Silva", 41, "CB", ["CB"], "Fluminense", 52, 80, "Izq.", "1.83 m"],
    ["Vanderson", 24, "RB", ["RM"], "Monaco", 53, 79, "Der.", "1.70 m"],
    ["Dodo", 27, "RB", ["RM"], "Fiorentina", 54, 80, "Der.", "1.73 m"],
    ["Caio Henrique", 27, "LB", ["LWB"], "Monaco", 55, 79, "Izq.", "1.77 m"],
    ["Abner", 25, "LB", ["LWB"], "Lyon", 56, 76, "Izq.", "1.75 m"],
    ["Igor", 27, "LB", ["CB"], "Brighton", 57, 78, "Izq.", "1.83 m"],
    // Mediocampistas adicionales
    ["Danilo Barbosa", 30, "CDM", ["CM"], "Al-Gharafa", 58, 77, "Der.", "1.85 m"],
    ["Matheus Henrique", 28, "CM", ["CDM"], "Genoa", 59, 77, "Der.", "1.79 m"],
    ["Pepe", 28, "RW", ["RM"], "Porto", 60, 80, "Der.", "1.76 m"],
    // Delanteros adicionales
    ["Evanilson", 25, "ST", ["CF"], "Bournemouth", 61, 79, "Der.", "1.82 m"],
    ["Yuri Alberto", 24, "ST", ["CF"], "Corinthians", 62, 78, "Der.", "1.82 m"],
    ["Arthur Cabral", 28, "ST", ["CF"], "Benfica", 63, 78, "Der.", "1.86 m"],
    ["Brenner", 25, "ST", ["CF"], "Nottingham Forest", 64, 77, "Der.", "1.78 m"],
    ["Dudu", 34, "LW", ["RW"], "Cruzeiro", 65, 77, "Der.", "1.73 m"],
    // Más jugadores adicionales para completar ~100
    ["Joao Pedro", 23, "ST", ["CF"], "Brighton", 66, 79, "Der.", "1.87 m"],
    ["Wesley", 22, "RW", ["LW"], "Flamengo", 67, 77, "Der.", "1.83 m"],
    ["Guilherme", 23, "LW", ["RW"], "Bayer Leverkusen", 68, 78, "Izq.", "1.76 m"],
    ["Rayan", 20, "LW", ["RW"], "Fluminense", 70, 75, "Der.", "1.76 m"],
    ["Pedrinho", 27, "RW", ["LW"], "Corinthians", 71, 76, "Der.", "1.74 m"],
    ["Danilo Pereira", 33, "CDM", ["CB"], "Paris Saint-Germain", 72, 79, "Der.", "1.88 m"],
    ["Renan", 26, "CB", ["LB"], "Internazionale", 73, 78, "Izq.", "1.85 m"],
    ["Kayky", 22, "RW", ["LW"], "Fluminense", 74, 74, "Der.", "1.72 m"],
    ["Malcom", 28, "RW", ["LW"], "Zenit", 75, 80, "Der.", "1.71 m"],
    ["Willian", 37, "RW", ["LW"], "Fluminense", 76, 76, "Der.", "1.75 m"],
    ["Fernando", 37, "CDM", ["CM"], "Besiktas", 77, 77, "Der.", "1.83 m"],
    ["Vitinho", 29, "RW", ["LW"], "Flamengo", 78, 77, "Der.", "1.71 m"],
    ["Hugo Souza", 25, "GK", ["GK"], "Corinthians", 79, 76, "Der.", "1.89 m"],
    ["Arana", 29, "LB", ["LWB"], "Atletico Mineiro", 82, 79, "Izq.", "1.76 m"],
    ["Mayke", 33, "RB", ["RM"], "Palmeiras", 83, 77, "Der.", "1.77 m"],
    ["Lucas Lima", 35, "CM", ["CAM"], "Palmeiras", 84, 75, "Izq.", "1.74 m"],
    ["Felipe Anderson", 32, "LW", ["RW"], "Palmeiras", 85, 79, "Der.", "1.74 m"],
    ["David Neres", 29, "RW", ["LW"], "Napoli", 86, 81, "Der.", "1.69 m"],
    ["Kenedy", 29, "LW", ["RB"], "Fluminense", 87, 76, "Izq.", "1.82 m"],
    ["Claudinho", 29, "CAM", ["LW"], "Bayer Leverkusen", 88, 78, "Der.", "1.71 m"],
    ["Igor Gomes", 26, "CM", ["CAM"], "Sao Paulo", 90, 74, "Der.", "1.75 m"],
    ["Hugo Moura", 28, "CDM", ["CM"], "Fluminense", 91, 74, "Der.", "1.83 m"]
  ],
  argentina: [
    // Porteros
    ["Emiliano Martinez", 33, "GK", ["GK"], "Aston Villa", 23, 88, "Der.", "1.95 m"],
    ["Franco Armani", 38, "GK", ["GK"], "River Plate", 1, 82, "Der.", "1.86 m"],
    ["Geronimo Rulli", 34, "GK", ["GK"], "Marseille", 12, 81, "Der.", "1.89 m"],
    ["Walter Benitez", 33, "GK", ["GK"], "PSV", 24, 80, "Der.", "1.91 m"],
    ["Juan Musso", 32, "GK", ["GK"], "Atletico Madrid", 13, 79, "Der.", "1.92 m"],
    ["Nahuel Guzman", 38, "GK", ["GK"], "Tigres", 25, 77, "Der.", "1.89 m"],
    ["Augusto Batalla", 25, "GK", ["GK"], "Lanus", 26, 74, "Der.", "1.84 m"],
    // Defensas centrales
    ["Cristian Romero", 28, "CB", ["RB"], "Tottenham", 13, 86, "Der.", "1.85 m"],
    ["Lisandro Martinez", 28, "CB", ["LB"], "Manchester United", 25, 84, "Izq.", "1.75 m"],
    ["Nicolas Otamendi", 38, "CB", ["CB"], "Benfica", 19, 82, "Der.", "1.83 m"],
    ["German Pezzella", 34, "CB", ["CB"], "Real Betis", 6, 79, "Der.", "1.87 m"],
    ["Facundo Medina", 26, "CB", ["LB"], "Lens", 27, 79, "Izq.", "1.84 m"],
    ["Nehuén Pérez", 25, "CB", ["RB"], "Udinese", 28, 77, "Der.", "1.89 m"],
    ["Marcos Senesi", 28, "CB", ["LB"], "Bournemouth", 29, 78, "Izq.", "1.86 m"],
    ["Emanuel Mammana", 30, "CB", ["LB"], "Internacional", 30, 77, "Izq.", "1.87 m"],
    ["Nicolas Figal", 30, "CB", ["RB"], "Inter Miami", 31, 76, "Der.", "1.83 m"],
    ["Lautaro Giannetti", 28, "CB", ["LB"], "Flamengo", 32, 75, "Der.", "1.84 m"],
    ["Gaston Avila", 24, "CB", ["LB"], "Boca Juniors", 33, 74, "Izq.", "1.87 m"],
    // Laterales derechos
    ["Nahuel Molina", 28, "RB", ["RM"], "Atletico Madrid", 26, 82, "Der.", "1.75 m"],
    ["Gonzalo Montiel", 29, "RB", ["CB"], "Sevilla", 4, 79, "Der.", "1.76 m"],
    ["Juan Foyth", 28, "RB", ["CB"], "Villarreal", 34, 80, "Der.", "1.83 m"],
    ["Renzo Saravia", 33, "RB", ["RM"], "Racing Club", 35, 75, "Der.", "1.76 m"],
    ["Hernan De La Fuente", 30, "RB", ["RM"], "Independiente", 36, 74, "Der.", "1.75 m"],
    // Laterales izquierdos
    ["Nicolas Tagliafico", 33, "LB", ["LWB"], "Lyon", 3, 81, "Izq.", "1.72 m"],
    ["Marcos Acuna", 34, "LB", ["LM"], "River Plate", 8, 80, "Izq.", "1.72 m"],
    ["Valentin Barco", 21, "LB", ["LWB"], "Brighton", 37, 77, "Izq.", "1.76 m"],
    ["Lautaro Blanco", 25, "LB", ["LWB"], "Boca Juniors", 38, 76, "Izq.", "1.78 m"],
    // Mediocampistas defensivos y centrales
    ["Enzo Fernandez", 25, "CM", ["CDM"], "Chelsea", 24, 85, "Der.", "1.78 m"],
    ["Rodrigo De Paul", 32, "CM", ["RM"], "Atletico Madrid", 7, 84, "Der.", "1.80 m"],
    ["Alexis Mac Allister", 27, "CM", ["CDM", "CAM"], "Liverpool", 20, 86, "Der.", "1.76 m"],
    ["Leandro Paredes", 31, "CDM", ["CM"], "Roma", 5, 81, "Der.", "1.80 m"],
    ["Exequiel Palacios", 27, "CM", ["CDM"], "Bayer Leverkusen", 14, 83, "Der.", "1.77 m"],
    ["Giovani Lo Celso", 30, "CAM", ["CM"], "Real Betis", 18, 81, "Izq.", "1.77 m"],
    ["Guido Rodriguez", 32, "CDM", ["CM"], "Real Betis", 16, 79, "Der.", "1.87 m"],
    ["Maximo Perrone", 22, "CDM", ["CM"], "Como", 40, 76, "Der.", "1.80 m"],
    ["Tomas Belmonte", 26, "CM", ["CDM"], "Real Betis", 41, 76, "Der.", "1.82 m"],
    ["Santiago Ascacibar", 28, "CDM", ["CM"], "Cruz Azul", 42, 76, "Der.", "1.74 m"],
    ["Andres Cubas", 29, "CDM", ["CM"], "Girona", 43, 76, "Der.", "1.82 m"],
    ["Matias Zaracho", 27, "CM", ["CAM"], "Racing Club", 44, 78, "Der.", "1.75 m"],
    ["Carlos Alcaraz", 23, "CM", ["CAM"], "Juventus", 45, 79, "Der.", "1.77 m"],
    ["Ezequiel Fernandez", 23, "CM", ["CAM"], "Boca Juniors", 46, 76, "Der.", "1.74 m"],
    ["Roberto Pereyra", 34, "RM", ["CM"], "Udinese", 47, 78, "Der.", "1.78 m"],
    ["Cristian Medina", 24, "CM", ["CAM"], "Fenerbahce", 48, 77, "Der.", "1.78 m"],
    // Mediocampistas ofensivos y extremos
    ["Franco Mastantuono", 18, "CAM", ["CM"], "River Plate", 49, 77, "Izq.", "1.78 m"],
    ["Matias Soule", 22, "RW", ["CAM"], "Roma", 50, 79, "Der.", "1.78 m"],
    ["Facundo Buonanotte", 21, "CAM", ["LW"], "Brighton", 51, 76, "Der.", "1.74 m"],
    ["Alejandro Zenon", 24, "LW", ["CAM"], "Palmeiras", 52, 77, "Der.", "1.75 m"],
    ["Facundo Colidio", 25, "RW", ["ST"], "Tigres", 53, 76, "Izq.", "1.79 m"],
    ["Emiliano Buendia", 28, "CAM", ["RW"], "Aston Villa", 54, 79, "Izq.", "1.72 m"],
    ["Giuliano Simeone", 25, "RW", ["LW"], "Atletico Madrid", 55, 78, "Der.", "1.76 m"],
    ["Claudio Echeverri", 19, "CAM", ["LW"], "Manchester City", 56, 76, "Der.", "1.74 m"],
    ["Facundo Torres", 25, "RW", ["LW"], "Orlando City", 57, 78, "Der.", "1.74 m"],
    ["Thiago Almada", 25, "CAM", ["LW"], "Lyon", 58, 81, "Der.", "1.71 m"],
    ["Valentin Carboni", 21, "LW", ["CAM"], "Marseille", 59, 77, "Izq.", "1.77 m"],
    ["Agustin Urzi", 26, "LW", ["RW"], "Parma", 60, 75, "Izq.", "1.67 m"],
    ["Luka Romero", 21, "CAM", ["LW"], "AC Milan", 61, 76, "Izq.", "1.69 m"],
    ["Papu Gomez", 37, "RW", ["CAM"], "San Lorenzo", 62, 76, "Der.", "1.74 m"],
    // Delanteros
    ["Lionel Messi", 38, "RW", ["CAM", "CF"], "Inter Miami", 10, 90, "Izq.", "1.70 m"],
    ["Julian Alvarez", 26, "ST", ["CF", "RW"], "Atletico Madrid", 9, 86, "Der.", "1.70 m"],
    ["Lautaro Martinez", 28, "ST", ["CF"], "Inter", 22, 88, "Der.", "1.74 m"],
    ["Angel Di Maria", 38, "RW", ["CAM"], "Rosario Central", 11, 83, "Izq.", "1.80 m"],
    ["Nicolas Gonzalez", 28, "LW", ["RW"], "Juventus", 15, 82, "Izq.", "1.80 m"],
    ["Alejandro Garnacho", 21, "LW", ["RW"], "Manchester United", 17, 82, "Der.", "1.80 m"],
    ["Paulo Dybala", 32, "CF", ["CAM"], "Roma", 21, 84, "Izq.", "1.77 m"],
    ["Santiago Gimenez", 24, "ST", ["CF"], "AC Milan", 63, 83, "Der.", "1.84 m"],
    ["Mauro Icardi", 32, "ST", ["CF"], "Galatasaray", 64, 80, "Der.", "1.81 m"],
    ["Giovanni Simeone", 30, "ST", ["CF"], "Napoli", 65, 80, "Der.", "1.79 m"],
    ["Valentin Castellanos", 27, "ST", ["LW"], "Lazio", 66, 79, "Izq.", "1.79 m"],
    ["Joaquin Correa", 31, "ST", ["LW"], "Inter", 67, 79, "Izq.", "1.87 m"],
    ["German Cano", 38, "ST", ["CF"], "Fluminense", 68, 77, "Izq.", "1.76 m"],
    ["Ezequiel Ponce", 30, "ST", ["CF"], "Fenerbahce", 69, 76, "Der.", "1.83 m"],
    ["Alejo Veliz", 21, "ST", ["CF"], "Tottenham", 70, 75, "Der.", "1.88 m"],
    ["Lucas Alario", 33, "ST", ["CF"], "Cruz Azul", 71, 76, "Der.", "1.83 m"],
    ["Adolfo Gaich", 26, "ST", ["CF"], "Sturm Graz", 72, 74, "Der.", "1.90 m"],
    // Más jugadores para completar ~100
    ["Jeremias Ledesma", 30, "GK", ["GK"], "Cadiz", 73, 76, "Der.", "1.90 m"],
    ["Marcos Diaz", 36, "GK", ["GK"], "Independiente", 74, 74, "Der.", "1.82 m"],
    ["Valentin Gomez", 23, "CB", ["LB"], "Velez Sarsfield", 75, 76, "Der.", "1.83 m"],
    ["Agustin Rogel", 28, "CB", ["CB"], "Hertha BSC", 76, 76, "Der.", "1.88 m"],
    ["Marcelo Weigandt", 27, "RB", ["RM"], "Boca Juniors", 77, 75, "Der.", "1.80 m"],
    ["Milton Casco", 38, "LB", ["LWB"], "River Plate", 78, 74, "Izq.", "1.72 m"],
    ["Nicolas Dominguez", 27, "CM", ["CDM"], "Nottingham Forest", 80, 78, "Der.", "1.79 m"],
    ["Santiago Colombatto", 28, "CDM", ["CM"], "Charlotte FC", 81, 75, "Der.", "1.86 m"],
    ["Alan Velasco", 23, "CAM", ["LW"], "FC Dallas", 82, 76, "Izq.", "1.74 m"],
    ["Facundo Farias", 23, "RW", ["LW"], "Inter Miami", 83, 77, "Izq.", "1.75 m"],
    ["Nahuel Bustos", 27, "ST", ["CF"], "Girona", 84, 77, "Der.", "1.79 m"],
    ["Adam Bareiro", 27, "ST", ["CF"], "San Lorenzo", 85, 76, "Der.", "1.75 m"],
    ["Luciano Gondou", 24, "ST", ["CF"], "Independiente", 86, 75, "Der.", "1.76 m"],
    ["Gaston Togni", 22, "LW", ["RW"], "Defensa y Justicia", 88, 73, "Izq.", "1.74 m"],
    ["Ramiro Funes Mori", 34, "CB", ["CB"], "Villarreal", 90, 75, "Der.", "1.87 m"],
    ["Fernando Tobio", 37, "CB", ["LB"], "Banfield", 91, 73, "Der.", "1.87 m"],
    ["Kevin Mac Allister", 25, "CM", ["CDM"], "Brighton", 93, 75, "Der.", "1.75 m"],
    ["Luca Langoni", 23, "RW", ["LW"], "Boca Juniors", 94, 74, "Der.", "1.78 m"],
    ["Ezequiel Cerutti", 33, "RW", ["LW"], "San Lorenzo", 95, 73, "Der.", "1.74 m"],
    ["Santiago Castro", 21, "ST", ["CF"], "Bologna", 97, 75, "Der.", "1.79 m"]
  ],
  colombia: [
    // Porteros
    ["Camilo Vargas", 34, "GK", ["GK"], "Atlas", 12, 81, "Der.", "1.85 m"],
    ["David Ospina", 37, "GK", ["GK"], "Atletico Nacional", 1, 79, "Der.", "1.83 m"],
    ["Alvaro Montero", 31, "GK", ["GK"], "Millonarios", 22, 76, "Der.", "1.96 m"],
    ["Aldair Quintana", 30, "GK", ["GK"], "Atletico Nacional", 23, 74, "Der.", "1.87 m"],
    ["Kevin Mier", 25, "GK", ["GK"], "Monterrey", 24, 74, "Der.", "1.84 m"],
    ["Eder Chaux", 29, "GK", ["GK"], "Atletico Tucuman", 25, 72, "Der.", "1.87 m"],
    // Defensas derechos
    ["Daniel Munoz", 30, "RB", ["RM"], "Crystal Palace", 21, 82, "Der.", "1.80 m"],
    ["Santiago Arias", 34, "RB", ["CB"], "Bayer Leverkusen", 4, 77, "Der.", "1.72 m"],
    ["Stefan Medina", 33, "RB", ["CB"], "Monterrey", 26, 77, "Der.", "1.78 m"],
    ["Helibelton Palacios", 31, "RB", ["RM"], "Orlando City", 27, 76, "Der.", "1.74 m"],
    ["Andres Felipe Roman", 27, "RB", ["RM"], "Independiente Medellin", 28, 74, "Der.", "1.73 m"],
    ["Freddy Hinestroza", 25, "RW", ["RB"], "Brighton", 29, 76, "Der.", "1.69 m"],
    // Centrales
    ["Davinson Sanchez", 29, "CB", ["CB"], "Galatasaray", 23, 82, "Der.", "1.87 m"],
    ["Jhon Lucumi", 28, "CB", ["LB"], "Bologna", 3, 81, "Izq.", "1.87 m"],
    ["Yerry Mina", 31, "CB", ["CB"], "Cagliari", 13, 79, "Der.", "1.95 m"],
    ["Carlos Cuesta", 27, "CB", ["RB"], "Galatasaray", 2, 78, "Der.", "1.79 m"],
    ["Jeison Murillo", 33, "CB", ["LB"], "Atletico Nacional", 30, 75, "Der.", "1.84 m"],
    ["Oscar Murillo", 31, "CB", ["RB"], "Pachuca", 31, 75, "Der.", "1.81 m"],
    ["Andres Llinas", 24, "CB", ["LB"], "Millonarios", 32, 74, "Der.", "1.85 m"],
    ["William Tesillo", 35, "CB", ["LB"], "Leon", 5, 75, "Der.", "1.81 m"],
    ["Dainer Mosquera", 23, "CB", ["LB"], "Fluminense", 33, 74, "Der.", "1.83 m"],
    ["Maicol Balanta", 31, "CB", ["CDM"], "Junior", 34, 73, "Der.", "1.81 m"],
    ["Juan Zapata", 25, "CB", ["CDM"], "Atletico Nacional", 35, 73, "Der.", "1.84 m"],
    // Laterales izquierdos
    ["Johan Mojica", 33, "LB", ["LWB"], "Mallorca", 17, 78, "Izq.", "1.85 m"],
    ["Deiver Machado", 32, "LB", ["LM"], "Lens", 6, 77, "Izq.", "1.72 m"],
    ["Frank Fabra", 33, "LB", ["LWB"], "Boca Juniors", 16, 76, "Izq.", "1.74 m"],
    ["Cristian Borja", 31, "LB", ["LWB"], "Santos", 36, 76, "Izq.", "1.74 m"],
    ["Juan David Cabal", 23, "LB", ["LWB"], "Juventus", 37, 78, "Izq.", "1.77 m"],
    ["Alvaro Angulo", 31, "LB", ["LWB"], "Independiente Medellin", 38, 73, "Izq.", "1.74 m"],
    // Mediocampistas defensivos y centrales
    ["Jefferson Lerma", 31, "CDM", ["CM", "CB"], "Crystal Palace", 16, 80, "Der.", "1.79 m"],
    ["Richard Rios", 25, "CM", ["CDM"], "Benfica", 8, 80, "Der.", "1.85 m"],
    ["Kevin Castano", 25, "CDM", ["CM"], "River Plate", 5, 77, "Der.", "1.77 m"],
    ["Mateus Uribe", 35, "CM", ["CDM"], "Al Sadd", 15, 78, "Der.", "1.82 m"],
    ["Wilmar Barrios", 32, "CDM", ["CM"], "Zenit", 18, 78, "Der.", "1.75 m"],
    ["Andres Andrade", 29, "CM", ["CDM"], "Independiente Medellin", 39, 75, "Der.", "1.79 m"],
    ["Jorman Campuzano", 28, "CDM", ["CM"], "Boca Juniors", 40, 76, "Der.", "1.76 m"],
    ["Victor Cantillo", 31, "CDM", ["CM"], "Junior", 41, 74, "Der.", "1.80 m"],
    ["Daniel Torres", 27, "CDM", ["CM"], "Atletico Nacional", 42, 75, "Der.", "1.78 m"],
    ["Sebastian Perez", 32, "CDM", ["CM"], "Athletico Paranaense", 43, 75, "Der.", "1.82 m"],
    ["Gustavo Cuellar", 33, "CDM", ["CM"], "Al-Hilal", 44, 76, "Der.", "1.83 m"],
    ["Stiven Mendoza", 29, "RM", ["RW"], "Independiente", 45, 74, "Der.", "1.71 m"],
    // Mediocampistas ofensivos y extremos
    ["James Rodriguez", 34, "CAM", ["RW"], "Rayo Vallecano", 10, 82, "Izq.", "1.80 m"],
    ["Juan Fernando Quintero", 33, "CAM", ["CM"], "America de Cali", 20, 79, "Izq.", "1.69 m"],
    ["Edwin Cardona", 33, "CAM", ["CM"], "Independiente Santa Fe", 19, 77, "Izq.", "1.70 m"],
    ["Jorge Carrascal", 27, "CAM", ["CM", "RW"], "Estrella Roja", 46, 78, "Izq.", "1.75 m"],
    ["Nicolas Benedetti", 28, "CAM", ["CM"], "Cruz Azul", 47, 75, "Izq.", "1.75 m"],
    ["Yimmi Chara", 32, "LM", ["LW"], "Portland Timbers", 48, 76, "Der.", "1.69 m"],
    ["Baldomero Perlaza", 24, "LM", ["LW"], "Junior", 49, 74, "Der.", "1.71 m"],
    ["Deison Mena", 27, "LW", ["CAM"], "Independiente", 50, 73, "Der.", "1.71 m"],
    ["Kelvin Osorio", 26, "RM", ["RW"], "Pittsburgh Riverhounds", 51, 72, "Der.", "1.78 m"],
    ["Edwuin Cetre", 26, "LW", ["RW"], "Junior", 52, 73, "Izq.", "1.74 m"],
    // Delanteros
    ["Luis Diaz", 29, "LW", ["RW"], "Liverpool", 7, 86, "Der.", "1.80 m"],
    ["Jhon Arias", 28, "RW", ["CAM"], "Wolverhampton", 11, 82, "Der.", "1.68 m"],
    ["Jhon Duran", 22, "ST", ["CF"], "Al-Nassr", 14, 82, "Izq.", "1.85 m"],
    ["Rafael Santos Borre", 30, "ST", ["CF"], "Internacional", 9, 78, "Der.", "1.74 m"],
    ["Luis Sinisterra", 26, "LW", ["RW"], "Bournemouth", 53, 80, "Der.", "1.72 m"],
    ["Yaser Asprilla", 22, "CAM", ["RW"], "Girona", 54, 78, "Izq.", "1.86 m"],
    ["Cucho Hernandez", 27, "ST", ["LW"], "Real Betis", 55, 80, "Der.", "1.76 m"],
    ["Oscar Cortes", 22, "LW", ["RW"], "Rangers", 56, 75, "Der.", "1.76 m"],
    ["Falcao Garcia", 39, "ST", ["CF"], "Rayo Vallecano", 57, 76, "Der.", "1.77 m"],
    ["Duvan Zapata", 34, "ST", ["CF"], "Roma", 58, 78, "Der.", "1.90 m"],
    ["Jhon Cordoba", 29, "ST", ["CF"], "Krasnodar", 59, 77, "Der.", "1.88 m"],
    ["Harold Preciado", 29, "ST", ["RW"], "Santos Laguna", 60, 76, "Der.", "1.79 m"],
    ["Oscar Estupinan", 27, "ST", ["CF"], "Brighton", 61, 77, "Der.", "1.80 m"],
    ["Alfredo Morelos", 29, "ST", ["CF"], "Atletico Nacional", 62, 76, "Der.", "1.76 m"],
    ["Sebastian Villa", 29, "LW", ["RW"], "Boca Juniors", 63, 76, "Izq.", "1.72 m"],
    ["Arley Rodriguez", 25, "RW", ["LW"], "Millonarios", 64, 73, "Der.", "1.71 m"],
    ["Tomas Angel", 22, "ST", ["CF"], "Fort Lauderdale CF", 65, 72, "Der.", "1.80 m"],
    ["Jhon Mosquera", 22, "LW", ["RW"], "Genk", 66, 74, "Der.", "1.73 m"],
    ["Darwin Andrade", 30, "LM", ["LB"], "Cali", 67, 73, "Izq.", "1.73 m"],
    ["Steeven Alzate", 27, "CM", ["CAM"], "Brighton", 68, 74, "Der.", "1.76 m"],
    // Jugadores adicionales
    ["Juan Guillermo Cuadrado", 36, "RB", ["RM"], "Inter Miami", 69, 78, "Der.", "1.76 m"],
    ["Bernardo Espinosa", 34, "CB", ["CB"], "Girona", 70, 76, "Der.", "1.87 m"],
    ["German Mera", 33, "CB", ["CB"], "Junior", 71, 74, "Der.", "1.81 m"],
    ["Sebastian Gomez", 27, "CDM", ["CM"], "Atletico Nacional", 72, 75, "Der.", "1.77 m"],
    ["Andres Ibarguen", 35, "LW", ["RW"], "Junior", 73, 74, "Der.", "1.71 m"],
    ["Dayro Moreno", 38, "ST", ["CF"], "Once Caldas", 74, 73, "Der.", "1.75 m"],
    ["Brayan Riascos", 34, "ST", ["CF"], "Deportivo Cali", 75, 72, "Der.", "1.83 m"],
    ["Teofilo Gutierrez", 40, "ST", ["CF"], "Junior", 76, 72, "Der.", "1.79 m"],
    ["Christian Marrugo", 28, "CAM", ["CM"], "Atletico Nacional", 77, 74, "Izq.", "1.71 m"],
    ["Jhon Vasquez", 24, "CAM", ["CM"], "Genoa", 78, 75, "Der.", "1.76 m"],
    ["Geovanny Caicedo", 28, "LB", ["LWB"], "Atletico Nacional", 79, 74, "Izq.", "1.75 m"],
    // Jugadores adicionales 2
    ["Luis Suarez", 29, "LW", ["RW"], "America de Cali", 81, 73, "Der.", "1.74 m"],
    ["Yeison Gordillo", 27, "LM", ["LW"], "Real Betis", 82, 77, "Izq.", "1.70 m"],
    ["Nicolas Munoz", 22, "RW", ["LW"], "Lille", 83, 76, "Der.", "1.72 m"],
    ["Ivan Angulo", 27, "LW", ["RW"], "Porto", 84, 77, "Izq.", "1.74 m"],
    ["Angelo Rodriguez", 32, "ST", ["CF"], "Millonarios", 85, 75, "Der.", "1.80 m"],
    ["Juan Camilo Portilla", 24, "RW", ["LW"], "Independiente Medellin", 86, 73, "Der.", "1.73 m"],
    ["Carlos Bacca", 38, "ST", ["CF"], "Junior", 87, 74, "Der.", "1.76 m"],
    ["Sherman Cardenas", 28, "CAM", ["CM"], "Atletico Nacional", 88, 74, "Izq.", "1.72 m"],
    ["Gustavo Torres", 26, "ST", ["CF"], "Cruz Azul", 89, 75, "Der.", "1.80 m"],
    ["Marco Perez", 28, "ST", ["CF"], "Udinese", 90, 76, "Der.", "1.82 m"],
    // Completar hasta ~100
    ["Carlos Carbonero", 34, "RW", ["LW"], "Junior", 95, 73, "Der.", "1.74 m"],
    ["Michael Barrios", 34, "RW", ["LW"], "Cruz Azul", 96, 75, "Der.", "1.71 m"],
    ["Nicolas Morales", 26, "RW", ["LW"], "Nacional", 97, 73, "Der.", "1.73 m"],
    ["Jose Enamorado", 27, "RW", ["LW", "CAM"], "Gremio", 98, 76, "Der.", "1.74 m"]
  ],
  france: [
    // Porteros
    ["Mike Maignan", 30, "GK", ["GK"], "AC Milan", 16, 87, "Der.", "1.91 m"],
    ["Brice Samba", 32, "GK", ["GK"], "Rennes", 1, 81, "Der.", "1.87 m"],
    ["Alphonse Areola", 33, "GK", ["GK"], "West Ham United", 23, 80, "Der.", "1.95 m"],
    ["Guillaume Restes", 21, "GK", ["GK"], "Toulouse", 16, 75, "Der.", "1.90 m"],
    ["Illan Meslier", 25, "GK", ["GK"], "Leeds United", 25, 77, "Izq.", "1.96 m"],
    // Defensas
    ["William Saliba", 25, "CB", ["RB"], "Arsenal", 17, 88, "Der.", "1.92 m"],
    ["Ibrahima Konate", 27, "CB", ["CB"], "Liverpool", 13, 85, "Der.", "1.94 m"],
    ["Dayot Upamecano", 27, "CB", ["CB"], "Bayern Munich", 4, 84, "Der.", "1.86 m"],
    ["Jules Kounde", 27, "RB", ["CB"], "Barcelona", 5, 85, "Der.", "1.80 m"],
    ["Theo Hernandez", 28, "LB", ["LWB"], "AC Milan", 22, 86, "Izq.", "1.84 m"],
    ["Ferland Mendy", 30, "LB", ["CB"], "Real Madrid", 3, 82, "Izq.", "1.80 m"],
    ["Wesley Fofana", 27, "CB", ["RB"], "Chelsea", 15, 82, "Der.", "1.87 m"],
    ["Benoit Badiashile", 24, "CB", ["LB"], "Chelsea", 6, 80, "Izq.", "1.90 m"],
    ["Jonathan Clauss", 33, "RB", ["RM"], "Nice", 18, 80, "Der.", "1.81 m"],
    ["Lucas Hernandez", 29, "LB", ["CB"], "Paris Saint-Germain", 21, 82, "Izq.", "1.83 m"],
    ["Nordi Mukiele", 28, "RB", ["CB"], "Paris Saint-Germain", 26, 79, "Der.", "1.86 m"],
    ["Castello Lukeba", 22, "CB", ["LB"], "RB Leipzig", 28, 79, "Izq.", "1.83 m"],
    ["Axel Disasi", 27, "CB", ["RB"], "Chelsea", 29, 79, "Der.", "1.87 m"],
    ["Loic Bade", 25, "CB", ["LB"], "Sevilla", 30, 78, "Der.", "1.89 m"],
    ["Theo Zidane", 23, "CB", ["LB"], "Racing Club de Lens", 31, 74, "Der.", "1.86 m"],
    // Mediocampistas
    ["Aurelien Tchouameni", 26, "CDM", ["CM", "CB"], "Real Madrid", 8, 86, "Der.", "1.87 m"],
    ["Eduardo Camavinga", 23, "CM", ["LB", "CDM"], "Real Madrid", 6, 84, "Izq.", "1.82 m"],
    ["Adrien Rabiot", 31, "CM", ["LM"], "AC Milan", 14, 83, "Izq.", "1.88 m"],
    ["Warren Zaire-Emery", 20, "CM", ["CDM"], "Paris Saint-Germain", 19, 83, "Der.", "1.78 m"],
    ["N'Golo Kante", 35, "CDM", ["CM"], "Al-Ittihad", 13, 83, "Der.", "1.68 m"],
    ["Matteo Guendouzi", 26, "CM", ["CDM"], "Lazio", 32, 81, "Der.", "1.87 m"],
    ["Youssouf Fofana", 26, "CDM", ["CM"], "AC Milan", 33, 81, "Der.", "1.85 m"],
    ["Khephren Thuram", 24, "CM", ["CDM"], "Juventus", 34, 80, "Der.", "1.95 m"],
    ["Lesley Ugochukwu", 21, "CDM", ["CM"], "Chelsea", 35, 77, "Der.", "1.82 m"],
    ["Adrien Truffert", 24, "LB", ["LM"], "Rennes", 36, 78, "Izq.", "1.77 m"],
    // Delanteros
    ["Antoine Griezmann", 35, "CAM", ["CF", "ST"], "Atletico Madrid", 7, 86, "Izq.", "1.76 m"],
    ["Kylian Mbappe", 27, "ST", ["LW"], "Real Madrid", 10, 91, "Der.", "1.78 m"],
    ["Ousmane Dembele", 29, "RW", ["LW"], "Paris Saint-Germain", 11, 86, "Amb.", "1.78 m"],
    ["Kingsley Coman", 29, "LW", ["RW"], "Bayern Munich", 20, 84, "Der.", "1.79 m"],
    ["Marcus Thuram", 28, "ST", ["LW"], "Inter", 15, 84, "Der.", "1.92 m"],
    ["Randal Kolo Muani", 27, "ST", ["RW"], "Juventus", 12, 82, "Der.", "1.87 m"],
    ["Bradley Barcola", 23, "LW", ["RW"], "Paris Saint-Germain", 37, 82, "Der.", "1.86 m"],
    ["Michael Olise", 24, "RW", ["CAM"], "Bayern Munich", 38, 84, "Izq.", "1.84 m"],
    ["Desire Doue", 20, "RW", ["LW", "CAM"], "Paris Saint-Germain", 39, 80, "Der.", "1.79 m"],
    ["Christopher Nkunku", 28, "CAM", ["ST", "LW"], "Chelsea", 40, 83, "Der.", "1.75 m"],
    ["Wissam Ben Yedder", 35, "ST", ["CAM"], "Monaco", 41, 80, "Izq.", "1.70 m"],
    ["Mathys Tel", 20, "RW", ["ST"], "Bayern Munich", 43, 78, "Der.", "1.83 m"],
    ["Amine Gouiri", 25, "ST", ["RW"], "Stade Rennais", 44, 78, "Izq.", "1.77 m"],
    ["Hugo Ekitike", 23, "ST", ["LW"], "Eintracht Frankfurt", 45, 79, "Der.", "1.88 m"],
    ["Hicham Boudaoui", 26, "CM", ["CDM"], "Nice", 46, 76, "Der.", "1.76 m"],
    // Jugadores adicionales
    ["Lucas Chevalier", 24, "GK", ["GK"], "Lille", 47, 78, "Der.", "1.90 m"],
    ["Leny Yoro", 19, "CB", ["CB"], "Manchester United", 48, 79, "Der.", "1.90 m"],
    ["Pierre Kalulu", 25, "CB", ["RB"], "Juventus", 49, 80, "Der.", "1.80 m"],
    ["Theo Ndicka", 25, "CB", ["LB"], "Roma", 50, 79, "Izq.", "1.91 m"],
    ["Presnel Kimpembe", 30, "CB", ["LB"], "Paris Saint-Germain", 51, 80, "Izq.", "1.83 m"],
    ["Enzo Millot", 23, "CM", ["CAM"], "Stuttgart", 52, 78, "Der.", "1.79 m"],
    ["Maxence Caqueret", 25, "CM", ["CDM"], "Lyon", 53, 79, "Der.", "1.74 m"],
    ["Rayan Cherki", 21, "CAM", ["LW"], "Lyon", 54, 80, "Izq.", "1.74 m"],
    ["Moussa Diaby", 26, "LW", ["RW"], "Aston Villa", 55, 83, "Der.", "1.71 m"],
    ["Arnaud Kalimuendo", 23, "ST", ["CF"], "Rennes", 56, 77, "Der.", "1.77 m"],
    ["Alexandre Lacazette", 34, "ST", ["CF"], "Lyon", 57, 79, "Der.", "1.75 m"],
    ["Paul Pogba", 32, "CDM", ["CM"], "Juventus", 59, 82, "Der.", "1.91 m"],
    // Nuevos jugadores para completar ~100
    ["Gautier Larsonneur", 30, "GK", ["GK"], "Brest", 60, 76, "Der.", "1.87 m"],
    ["Tanguy Ndombele", 28, "CM", ["CDM"], "Napoli", 61, 80, "Der.", "1.82 m"],
    ["Boubacar Kamara", 25, "CDM", ["CM"], "Aston Villa", 62, 81, "Der.", "1.80 m"],
    ["Corentin Tolisso", 31, "CM", ["CDM"], "Lyon", 63, 79, "Der.", "1.80 m"],
    ["Lucas Tousart", 28, "CDM", ["CM"], "Udinese", 64, 77, "Der.", "1.83 m"],
    ["Sofiane Diop", 24, "LW", ["CAM"], "Nice", 65, 78, "Izq.", "1.80 m"],
    ["Jonathan Ikone", 27, "RW", ["LW"], "Fiorentina", 66, 78, "Der.", "1.75 m"],
    ["Odsonne Edouard", 27, "ST", ["CF"], "Crystal Palace", 67, 78, "Der.", "1.86 m"],
    ["Malang Sarr", 26, "CB", ["LB"], "Monaco", 68, 77, "Izq.", "1.86 m"],
    ["Lucas Digne", 32, "LB", ["LWB"], "Aston Villa", 69, 80, "Izq.", "1.78 m"],
    ["Marcus Coco", 27, "LW", ["RW"], "Rennes", 70, 75, "Der.", "1.73 m"],
    ["Amine Harit", 27, "CAM", ["CM"], "Marseille", 71, 78, "Der.", "1.78 m"],
    ["Isaac Lihadji", 23, "LW", ["RW"], "Lille", 72, 75, "Izq.", "1.76 m"],
    ["Timothee Pembele", 23, "RB", ["CB"], "Juventus", 73, 76, "Der.", "1.82 m"],
    ["Hamari Traore", 33, "RB", ["RM"], "Rennes", 74, 77, "Der.", "1.77 m"],
    ["Moussa Niakhate", 28, "CB", ["LB"], "Nottingham Forest", 75, 78, "Izq.", "1.86 m"],
    ["Maxime Esteve", 23, "CB", ["LB"], "Burnley", 76, 76, "Der.", "1.92 m"],
    ["Myziane Maolida", 26, "LW", ["RW"], "Nice", 78, 75, "Der.", "1.81 m"],
    ["Romain Faivre", 27, "RW", ["LW"], "Lyon", 79, 77, "Der.", "1.77 m"],
    ["Adil Aouchiche", 23, "CAM", ["CM"], "Saint-Etienne", 80, 75, "Izq.", "1.79 m"],
    ["Manu Kone", 24, "CM", ["CDM"], "Roma", 81, 79, "Der.", "1.83 m"],
    ["Theo Bernard", 22, "CM", ["CDM"], "Rennes", 82, 75, "Der.", "1.79 m"],
    ["Noah Mbamba", 20, "CDM", ["CM"], "Bayern Munich", 83, 75, "Der.", "1.77 m"],
    ["Nathanael Mbuku", 23, "LW", ["RW"], "Augsburg", 84, 75, "Der.", "1.71 m"],
    ["Chrislain Matsima", 23, "CB", ["LB"], "Monaco", 85, 76, "Der.", "1.83 m"],
    ["Maxime Lopez", 27, "CM", ["CDM"], "Sassuolo", 86, 76, "Der.", "1.67 m"],
    ["Yann Gboho", 22, "RW", ["LW"], "Rennes", 87, 75, "Der.", "1.73 m"],
    ["Jonathan Bamba", 29, "LW", ["RW"], "Celta Vigo", 88, 78, "Der.", "1.76 m"],
    ["Loic Mbe Soh", 23, "CB", ["LB"], "Nottingham Forest", 89, 75, "Der.", "1.89 m"],
    ["Dylan Chambost", 28, "CAM", ["LW"], "Stade de Reims", 90, 74, "Izq.", "1.73 m"],
    ["Kenny Lala", 35, "RB", ["RM"], "Strasbourg", 91, 74, "Der.", "1.72 m"],
    ["Florian Sotoca", 32, "RW", ["ST"], "RC Lens", 92, 76, "Der.", "1.80 m"],
    ["Clement Michelin", 27, "RB", ["CB"], "RC Lens", 93, 75, "Der.", "1.79 m"],
    ["Elye Wahi", 22, "ST", ["LW"], "Eintracht Frankfurt", 94, 78, "Der.", "1.80 m"],
    ["Ethan Mbappe", 18, "LB", ["LWB"], "Paris Saint-Germain", 95, 74, "Izq.", "1.80 m"],
    ["Eliesse Ben Seghir", 20, "CAM", ["LW"], "Monaco", 96, 76, "Izq.", "1.75 m"],
    ["Joris Chotard", 24, "CDM", ["CM"], "Montpellier", 97, 76, "Der.", "1.84 m"],
    ["Arnaud Nordin", 28, "RW", ["LW"], "Montpellier", 98, 75, "Der.", "1.73 m"],
    ["Flavien Tait", 30, "CAM", ["RW"], "Stade Brestois", 99, 75, "Der.", "1.73 m"]
  ],
  england: [
    // Porteros
    ["Jordan Pickford", 32, "GK", ["GK"], "Everton", 1, 83, "Izq.", "1.85 m"],
    ["Aaron Ramsdale", 28, "GK", ["GK"], "Southampton", 13, 80, "Der.", "1.88 m"],
    ["Dean Henderson", 29, "GK", ["GK"], "Crystal Palace", 23, 80, "Der.", "1.88 m"],
    ["Nick Pope", 33, "GK", ["GK"], "Newcastle United", 22, 81, "Der.", "1.96 m"],
    ["Sam Johnstone", 32, "GK", ["GK"], "Crystal Palace", 25, 78, "Der.", "1.93 m"],
    // Defensas
    ["Kyle Walker", 35, "RB", ["CB"], "Burnley", 2, 82, "Der.", "1.78 m"],
    ["John Stones", 32, "CB", ["CDM"], "Manchester City", 5, 85, "Der.", "1.88 m"],
    ["Marc Guehi", 25, "CB", ["CB"], "Crystal Palace", 6, 82, "Der.", "1.82 m"],
    ["Ezri Konsa", 28, "CB", ["RB"], "Aston Villa", 14, 81, "Der.", "1.83 m"],
    ["Levi Colwill", 23, "CB", ["LB"], "Chelsea", 15, 80, "Izq.", "1.87 m"],
    ["Luke Shaw", 30, "LB", ["LWB"], "Manchester United", 3, 81, "Izq.", "1.85 m"],
    ["Trent Alexander-Arnold", 27, "RB", ["CM"], "Real Madrid", 18, 86, "Der.", "1.80 m"],
    ["Joe Gomez", 28, "CB", ["RB", "LB"], "Liverpool", 12, 80, "Der.", "1.85 m"],
    ["Lewis Dunk", 34, "CB", ["CB"], "Brighton", 16, 79, "Der.", "1.90 m"],
    ["Reece James", 26, "RB", ["RM"], "Chelsea", 24, 84, "Der.", "1.80 m"],
    ["Ben White", 28, "RB", ["CB"], "Arsenal", 26, 82, "Der.", "1.83 m"],
    ["Harry Maguire", 32, "CB", ["CDM"], "Manchester United", 4, 80, "Der.", "1.94 m"],
    ["Tyrone Mings", 32, "CB", ["LB"], "Aston Villa", 27, 79, "Izq.", "1.94 m"],
    ["Fikayo Tomori", 28, "CB", ["RB"], "AC Milan", 28, 82, "Der.", "1.82 m"],
    ["Jarrad Branthwaite", 23, "CB", ["LB"], "Everton", 29, 79, "Der.", "1.96 m"],
    ["Kieran Trippier", 35, "RB", ["LB"], "Newcastle United", 30, 82, "Der.", "1.78 m"],
    ["Rico Lewis", 21, "RB", ["CM"], "Manchester City", 31, 78, "Der.", "1.71 m"],
    ["Jarell Quansah", 22, "CB", ["LB"], "Liverpool", 32, 76, "Der.", "1.87 m"],
    // Mediocampistas
    ["Declan Rice", 27, "CDM", ["CM"], "Arsenal", 4, 87, "Der.", "1.85 m"],
    ["Jude Bellingham", 22, "CAM", ["CM"], "Real Madrid", 10, 90, "Der.", "1.86 m"],
    ["Phil Foden", 26, "CAM", ["RW", "LW"], "Manchester City", 11, 88, "Izq.", "1.71 m"],
    ["Bukayo Saka", 24, "RW", ["RM"], "Arsenal", 7, 88, "Izq.", "1.78 m"],
    ["Cole Palmer", 24, "CAM", ["RW"], "Chelsea", 20, 87, "Izq.", "1.89 m"],
    ["Kobbie Mainoo", 21, "CM", ["CDM"], "Manchester United", 33, 80, "Der.", "1.75 m"],
    ["Conor Gallagher", 26, "CM", ["CAM"], "Atletico Madrid", 34, 81, "Der.", "1.82 m"],
    ["Adam Wharton", 21, "CDM", ["CM"], "Crystal Palace", 35, 79, "Der.", "1.87 m"],
    ["Morgan Gibbs-White", 25, "CAM", ["CM"], "Nottingham Forest", 36, 81, "Der.", "1.75 m"],
    ["Kalvin Phillips", 30, "CDM", ["CM"], "Ipswich Town", 37, 78, "Der.", "1.78 m"],
    ["James Maddison", 29, "CAM", ["CM"], "Tottenham", 38, 83, "Der.", "1.75 m"],
    ["Jordan Henderson", 35, "CM", ["CDM"], "Ajax", 39, 78, "Der.", "1.82 m"],
    ["Curtis Jones", 25, "CM", ["CAM"], "Liverpool", 40, 79, "Der.", "1.82 m"],
    ["Tino Livramento", 23, "RB", ["RM"], "Newcastle United", 41, 78, "Der.", "1.72 m"],
    // Delanteros
    ["Harry Kane", 32, "ST", ["CF"], "Bayern Munich", 9, 90, "Der.", "1.88 m"],
    ["Ollie Watkins", 30, "ST", ["LW"], "Aston Villa", 19, 84, "Der.", "1.80 m"],
    ["Marcus Rashford", 28, "LW", ["ST"], "Barcelona", 17, 83, "Der.", "1.86 m"],
    ["Anthony Gordon", 25, "LW", ["RW"], "Newcastle United", 21, 82, "Der.", "1.83 m"],
    ["Jarrod Bowen", 29, "RW", ["ST"], "West Ham United", 43, 82, "Izq.", "1.75 m"],
    ["Eberechi Eze", 27, "CAM", ["LW"], "Arsenal", 44, 83, "Der.", "1.78 m"],
    ["Noni Madueke", 24, "RW", ["LW"], "Chelsea", 45, 81, "Der.", "1.77 m"],
    ["Liam Delap", 22, "ST", ["CF"], "Ipswich Town", 46, 78, "Der.", "1.88 m"],
    ["Morgan Rogers", 23, "CAM", ["LW"], "Aston Villa", 47, 79, "Der.", "1.85 m"],
    ["Ivan Toney", 30, "ST", ["CF"], "Al-Ahli", 48, 82, "Der.", "1.83 m"],
    ["Callum Wilson", 34, "ST", ["CF"], "Newcastle United", 49, 79, "Der.", "1.82 m"],
    ["Dominic Solanke", 28, "ST", ["CF"], "Tottenham", 50, 81, "Der.", "1.83 m"],
    ["Angel Gomes", 25, "CAM", ["CM"], "Lille", 51, 79, "Der.", "1.67 m"],
    ["Trevoh Chalobah", 26, "CM", ["CDM"], "Crystal Palace", 52, 77, "Der.", "1.87 m"],
    ["Taylor Harwood-Bellis", 24, "CB", ["LB"], "Southampton", 53, 76, "Der.", "1.87 m"],
    // Jugadores adicionales
    ["James Trafford", 23, "GK", ["GK"], "Burnley", 54, 76, "Der.", "1.94 m"],
    ["Ben Chilwell", 29, "LB", ["LWB"], "Chelsea", 55, 81, "Izq.", "1.78 m"],
    ["James Ward-Prowse", 30, "CM", ["CAM"], "Nottingham Forest", 56, 80, "Der.", "1.76 m"],
    ["Harvey Elliott", 22, "CM", ["CAM"], "Liverpool", 57, 79, "Der.", "1.70 m"],
    ["Jack Grealish", 30, "LW", ["CAM"], "Manchester City", 58, 82, "Izq.", "1.80 m"],
    ["Emile Smith Rowe", 25, "CAM", ["LW"], "Arsenal", 59, 80, "Izq.", "1.80 m"],
    ["Raheem Sterling", 30, "LW", ["RW"], "Arsenal", 60, 81, "Der.", "1.70 m"],
    ["Jadon Sancho", 25, "RW", ["LW"], "Chelsea", 61, 82, "Der.", "1.80 m"],
    ["Tammy Abraham", 27, "ST", ["CF"], "Roma", 62, 80, "Der.", "1.90 m"],
    ["Ben Godfrey", 28, "CB", ["LB"], "Everton", 63, 77, "Der.", "1.83 m"],
    ["Michael Keane", 32, "CB", ["CB"], "Everton", 64, 77, "Der.", "1.89 m"],
    ["Max Aarons", 26, "RB", ["RM"], "Bournemouth", 65, 78, "Der.", "1.75 m"],
    // Jugadores adicionales 2
    ["Lewis Hall", 21, "LB", ["LWB"], "Newcastle United", 66, 77, "Izq.", "1.77 m"],
    ["James Justin", 27, "RB", ["RM"], "Leicester City", 67, 78, "Der.", "1.80 m"],
    ["Lloyd Kelly", 27, "CB", ["LB"], "Newcastle United", 68, 79, "Izq.", "1.88 m"],
    ["Callum Doyle", 22, "CB", ["LB"], "Leicester City", 69, 75, "Izq.", "1.86 m"],
    ["Kieran Dewsbury-Hall", 26, "CM", ["CAM"], "Chelsea", 70, 79, "Der.", "1.76 m"],
    ["Jacob Ramsey", 24, "CAM", ["CM"], "Aston Villa", 71, 80, "Der.", "1.80 m"],
    ["James Garner", 24, "CM", ["CDM"], "Everton", 72, 77, "Der.", "1.80 m"],
    ["Oliver Skipp", 25, "CDM", ["CM"], "Tottenham", 73, 77, "Der.", "1.78 m"],
    ["Ross Barkley", 31, "CM", ["CAM"], "Aston Villa", 74, 78, "Der.", "1.89 m"],
    ["Carney Chukwuemeka", 22, "CM", ["CAM"], "Chelsea", 75, 77, "Der.", "1.83 m"],
    ["Will Hughes", 30, "CM", ["RM"], "Crystal Palace", 76, 76, "Der.", "1.82 m"],
    ["Harvey Barnes", 27, "LW", ["RW"], "Newcastle United", 77, 80, "Der.", "1.78 m"],
    ["Omari Hutchinson", 21, "RW", ["LW"], "Ipswich Town", 78, 77, "Der.", "1.78 m"],
    ["Tyler Dibling", 20, "LW", ["RW"], "Southampton", 79, 75, "Izq.", "1.77 m"],
    ["Dominic Calvert-Lewin", 28, "ST", ["CF"], "Everton", 80, 79, "Der.", "1.87 m"],
    ["Demarai Gray", 29, "LW", ["RW"], "Everton", 81, 77, "Der.", "1.77 m"],
    // Completar hasta ~100
    ["Ryan Sessegnon", 25, "LB", ["LWB"], "Tottenham", 82, 76, "Izq.", "1.78 m"],
    ["Myles Lewis-Skelly", 19, "LB", ["CM"], "Arsenal", 83, 76, "Izq.", "1.82 m"],
    ["Ethan Nwaneri", 18, "CAM", ["RW"], "Arsenal", 84, 75, "Der.", "1.77 m"],
    ["Liam Gibbs", 22, "CM", ["CDM"], "Ipswich Town", 85, 75, "Der.", "1.83 m"],
    ["James McAtee", 23, "CM", ["CAM"], "Manchester City", 86, 76, "Der.", "1.77 m"],
    ["Lewis Dobbin", 22, "RW", ["LW"], "Aston Villa", 87, 75, "Der.", "1.76 m"],
    ["Ben Sheaf", 27, "CM", ["CDM"], "Coventry City", 88, 75, "Der.", "1.79 m"],
    ["Nathan Collins", 24, "CB", ["LB"], "Brentford", 89, 78, "Der.", "1.90 m"],
    ["Charlie Cresswell", 23, "CB", ["LB"], "Millwall", 90, 74, "Izq.", "1.85 m"],
    ["Tommy Doyle", 23, "CM", ["CDM"], "Wolverhampton", 91, 75, "Der.", "1.79 m"],
    ["Max Kilman", 28, "CB", ["LB"], "West Ham United", 92, 79, "Der.", "1.90 m"],
    ["Sam Edozie", 22, "LW", ["RW"], "Southampton", 93, 75, "Izq.", "1.75 m"],
    ["Tom Cannon", 22, "ST", ["CF"], "Leicester City", 94, 75, "Der.", "1.79 m"],
    ["Iyenoma Udogie", 22, "LB", ["LWB"], "Tottenham", 95, 79, "Izq.", "1.80 m"],
    ["Hamza Choudhury", 27, "CDM", ["CM"], "Leicester City", 96, 75, "Der.", "1.77 m"],
    ["Folarin Balogun", 24, "ST", ["CF"], "Monaco", 97, 79, "Der.", "1.78 m"],
    ["Will Smallbone", 25, "CM", ["CAM"], "Southampton", 99, 76, "Der.", "1.79 m"],
    ["Liam Cooper", 33, "CB", ["CDM"], "Leeds United", 100, 76, "Der.", "1.88 m"]
  ],
  spain: [
    // Porteros
    ["Unai Simon", 28, "GK", ["GK"], "Athletic Club", 23, 84, "Der.", "1.90 m"],
    ["David Raya", 30, "GK", ["GK"], "Arsenal", 1, 84, "Der.", "1.83 m"],
    ["Alex Remiro", 30, "GK", ["GK"], "Real Sociedad", 13, 82, "Der.", "1.91 m"],
    ["Robert Sanchez", 28, "GK", ["GK"], "Chelsea", 22, 80, "Der.", "1.97 m"],
    ["Inaki Pena", 27, "GK", ["GK"], "Barcelona", 25, 78, "Der.", "1.90 m"],
    // Defensas
    ["Dani Carvajal", 34, "RB", ["RWB"], "Real Madrid", 2, 85, "Der.", "1.73 m"],
    ["Pedro Porro", 26, "RB", ["RM"], "Tottenham", 24, 83, "Der.", "1.73 m"],
    ["Robin Le Normand", 29, "CB", ["CB"], "Atletico Madrid", 3, 84, "Der.", "1.87 m"],
    ["Aymeric Laporte", 31, "CB", ["CB"], "Al-Nassr", 14, 83, "Izq.", "1.91 m"],
    ["Pau Torres", 29, "CB", ["LB"], "Aston Villa", 4, 83, "Izq.", "1.91 m"],
    ["Dani Vivian", 26, "CB", ["CB"], "Athletic Club", 5, 81, "Der.", "1.83 m"],
    ["Marc Cucurella", 27, "LB", ["LWB"], "Chelsea", 22, 82, "Izq.", "1.73 m"],
    ["Alejandro Grimaldo", 30, "LB", ["LM"], "Bayer Leverkusen", 12, 84, "Izq.", "1.71 m"],
    ["Cesar Azpilicueta", 36, "RB", ["CB"], "Como", 15, 78, "Der.", "1.78 m"],
    ["Eric Garcia", 24, "CB", ["CDM"], "Girona", 16, 80, "Der.", "1.82 m"],
    ["Hugo Guillamón", 26, "CDM", ["CB"], "Valencia", 17, 79, "Der.", "1.81 m"],
    ["Ivan Fresneda", 22, "RB", ["RM"], "Real Valladolid", 27, 75, "Der.", "1.78 m"],
    ["Sergio Gomez", 24, "LB", ["LM"], "Real Sociedad", 28, 77, "Izq.", "1.71 m"],
    ["Arnau Martinez", 22, "RB", ["RM"], "Girona", 29, 75, "Der.", "1.72 m"],
    ["David Garcia", 30, "CB", ["CDM"], "Osasuna", 30, 78, "Der.", "1.84 m"],
    ["Oscar Mingueza", 26, "RB", ["CB"], "Celta Vigo", 31, 76, "Der.", "1.80 m"],
    // Mediocampistas
    ["Rodri", 29, "CDM", ["CM"], "Manchester City", 16, 91, "Der.", "1.91 m"],
    ["Martin Zubimendi", 26, "CDM", ["CM"], "Arsenal", 18, 84, "Der.", "1.81 m"],
    ["Fabian Ruiz", 29, "CM", ["CAM"], "Paris Saint-Germain", 8, 84, "Izq.", "1.89 m"],
    ["Pedri", 23, "CM", ["CAM", "LW"], "Barcelona", 20, 87, "Der.", "1.74 m"],
    ["Gavi", 21, "CM", ["CAM"], "Barcelona", 9, 84, "Der.", "1.73 m"],
    ["Mikel Merino", 29, "CM", ["CDM"], "Arsenal", 6, 84, "Izq.", "1.89 m"],
    ["Dani Olmo", 27, "CAM", ["LW", "RW"], "Barcelona", 10, 85, "Der.", "1.79 m"],
    ["Alex Baena", 24, "CAM", ["LW"], "Atletico Madrid", 32, 82, "Der.", "1.74 m"],
    ["Fermin Lopez", 22, "CAM", ["CM"], "Barcelona", 33, 81, "Der.", "1.74 m"],
    ["Marcos Llorente", 31, "CM", ["RB"], "Atletico Madrid", 34, 82, "Der.", "1.83 m"],
    ["Mikel Oyarzabal", 28, "ST", ["LW"], "Real Sociedad", 35, 83, "Izq.", "1.81 m"],
    ["Pablo Barrios", 22, "CM", ["CDM"], "Atletico Madrid", 36, 78, "Der.", "1.79 m"],
    ["Aleix Garcia", 28, "CDM", ["CM"], "Bayer Leverkusen", 37, 80, "Der.", "1.74 m"],
    ["Isco", 33, "CAM", ["CM"], "Real Betis", 38, 79, "Izq.", "1.76 m"],
    ["Marcos Asensio", 30, "CAM", ["RW"], "Aston Villa", 40, 80, "Izq.", "1.82 m"],
    // Delanteros
    ["Lamine Yamal", 18, "RW", ["LW"], "Barcelona", 19, 88, "Izq.", "1.80 m"],
    ["Nico Williams", 23, "LW", ["RW"], "Athletic Club", 17, 85, "Der.", "1.81 m"],
    ["Ferran Torres", 25, "RW", ["ST", "LW"], "Barcelona", 11, 82, "Der.", "1.84 m"],
    ["Alvaro Morata", 33, "ST", ["CF"], "Galatasaray", 7, 82, "Der.", "1.90 m"],
    ["Joselu", 35, "ST", ["CF"], "Al-Gharafa", 26, 81, "Der.", "1.91 m"],
    ["Bryan Gil", 24, "LW", ["RW"], "Girona", 41, 79, "Izq.", "1.74 m"],
    ["Yeremy Pino", 23, "RW", ["LW"], "Villarreal", 42, 80, "Der.", "1.76 m"],
    ["Samu Omorodion", 21, "ST", ["CF"], "Atletico Madrid", 43, 77, "Der.", "1.87 m"],
    ["Abel Ruiz", 25, "ST", ["CF"], "Braga", 44, 79, "Der.", "1.80 m"],
    ["Ansu Fati", 23, "LW", ["RW"], "Brighton", 45, 80, "Izq.", "1.77 m"],
    ["Adama Traore", 30, "RW", ["RB"], "Fulham", 46, 78, "Der.", "1.78 m"],
    ["Borja Iglesias", 32, "ST", ["CF"], "Bayer Leverkusen", 47, 79, "Der.", "1.88 m"],
    ["Rodrigo Moreno", 34, "ST", ["RW"], "Leeds United", 49, 78, "Izq.", "1.79 m"],
    ["Brahim Diaz", 26, "CAM", ["RW", "LW"], "Real Madrid", 50, 80, "Der.", "1.72 m"],
    ["Yeray Alvarez", 31, "CB", ["CDM"], "Athletic Club", 51, 79, "Der.", "1.83 m"],
    ["Alejandro Baena", 24, "CAM", ["LW"], "Atletico Madrid", 52, 79, "Der.", "1.74 m"],
    ["Juanmi", 32, "ST", ["CAM"], "Real Betis", 53, 77, "Der.", "1.73 m"],
    // Jugadores adicionales
    ["Kepa Arrizabalaga", 30, "GK", ["GK"], "Bournemouth", 54, 80, "Der.", "1.86 m"],
    ["Inigo Martinez", 34, "CB", ["LB"], "Barcelona", 55, 81, "Izq.", "1.82 m"],
    ["Jose Gaya", 30, "LB", ["LWB"], "Valencia", 56, 80, "Izq.", "1.72 m"],
    ["Juan Bernat", 32, "LB", ["LWB"], "Benfica", 57, 78, "Izq.", "1.71 m"],
    ["Dani Parejo", 36, "CDM", ["CM"], "Villarreal", 58, 79, "Der.", "1.81 m"],
    ["Carlos Soler", 28, "CM", ["CDM"], "Paris Saint-Germain", 59, 80, "Der.", "1.81 m"],
    ["Unai Vencedor", 25, "CDM", ["CM"], "Marseille", 60, 77, "Der.", "1.79 m"],
    ["Gerard Moreno", 33, "ST", ["CF"], "Atletico Madrid", 61, 80, "Der.", "1.78 m"],
    ["Borja Mayoral", 28, "ST", ["CF"], "Getafe", 62, 78, "Der.", "1.79 m"],
    ["Asier Villalibre", 28, "ST", ["CF"], "Athletic Club", 63, 77, "Der.", "1.88 m"],
    ["Nico Gonzalez", 24, "LW", ["RW"], "Porto", 64, 79, "Izq.", "1.75 m"],
    // Completar hasta ~100
    ["Joan Jordan", 30, "CDM", ["CM"], "Sevilla", 65, 77, "Der.", "1.82 m"],
    ["Brais Mendez", 28, "CM", ["RW"], "Real Sociedad", 66, 79, "Der.", "1.75 m"],
    ["Mikel Vesga", 31, "CDM", ["CM"], "Athletic Club", 67, 76, "Der.", "1.83 m"],
    ["Oriol Romeu", 33, "CDM", ["CM"], "Girona", 68, 77, "Der.", "1.83 m"],
    ["Manu Trigueros", 33, "CM", ["CAM"], "Villarreal", 69, 76, "Der.", "1.78 m"],
    ["Oier Zarraga", 24, "CM", ["CDM"], "Villarreal", 70, 75, "Der.", "1.84 m"],
    ["Alex Collado", 26, "CAM", ["CM"], "Girona", 71, 76, "Izq.", "1.71 m"],
    ["Raul de Tomas", 31, "ST", ["CF"], "Rayo Vallecano", 72, 78, "Der.", "1.79 m"],
    ["Jorge Cuenca", 26, "CB", ["LB"], "Villarreal", 73, 76, "Der.", "1.87 m"],
    ["Sergio Herrera", 32, "GK", ["GK"], "Osasuna", 74, 76, "Der.", "1.85 m"],
    ["Aitor Fernandez", 35, "GK", ["GK"], "Levante", 75, 75, "Der.", "1.86 m"],
    ["Alvaro Odriozola", 29, "RB", ["RM"], "Real Sociedad", 76, 76, "Der.", "1.79 m"],
    ["Unai Garcia", 30, "CB", ["CDM"], "Osasuna", 77, 76, "Der.", "1.85 m"],
    ["Inigo Ruiz de Galarreta", 28, "CDM", ["CM"], "Real Sociedad", 78, 76, "Der.", "1.80 m"],
    ["Mikel Balenziaga", 35, "LB", ["LWB"], "Athletic Club", 79, 74, "Izq.", "1.73 m"],
    ["Raul Albiol", 39, "CB", ["CDM"], "Villarreal", 80, 77, "Der.", "1.88 m"],
    ["Kike Garcia", 34, "ST", ["CF"], "Osasuna", 81, 75, "Der.", "1.86 m"],
    ["Jon Moncayola", 27, "CM", ["CDM"], "Osasuna", 82, 76, "Der.", "1.83 m"],
    ["Javi Galan", 30, "LB", ["LWB"], "Atletico Madrid", 83, 78, "Izq.", "1.73 m"],
    ["Cesar Tarrega", 21, "CB", ["LB"], "Valencia", 84, 75, "Der.", "1.84 m"],
    ["Pau Cubarsi", 18, "CB", ["LB"], "Barcelona", 85, 78, "Izq.", "1.82 m"],
    ["Fran Garcia", 25, "LB", ["LWB"], "Real Madrid", 86, 77, "Izq.", "1.73 m"],
    ["Lucas Vazquez", 33, "RB", ["RM"], "Real Madrid", 87, 77, "Der.", "1.73 m"],
    ["Marc Casado", 22, "CDM", ["CM"], "Barcelona", 88, 79, "Der.", "1.79 m"],
    ["Victor Gomez", 26, "RB", ["CB"], "Deportivo Alaves", 89, 74, "Der.", "1.82 m"],
    ["Ivan Morante", 24, "LW", ["CAM"], "Levante", 90, 73, "Izq.", "1.79 m"],
    ["Alejandro Frances", 23, "LB", ["LWB"], "Udinese", 91, 75, "Izq.", "1.79 m"],
    ["Javi Puado", 27, "RW", ["LW"], "Espanyol", 92, 75, "Der.", "1.75 m"],
    ["Ruben Pardo", 32, "CM", ["CDM"], "Real Sociedad", 93, 74, "Der.", "1.72 m"],
    ["Gorka Guruzeta", 29, "ST", ["CF"], "Athletic Club", 94, 77, "Der.", "1.87 m"],
    ["Ander Barrenetxea", 24, "LW", ["RW"], "Real Sociedad", 95, 78, "Izq.", "1.74 m"],
    ["Jon Aramburu", 27, "RB", ["CB"], "Real Sociedad", 97, 75, "Der.", "1.80 m"]
  ]
};

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

export const teams = Object.values(teamMeta).map((meta) => ({
  ...meta,
  flag: flag(meta.code),
  players: normalizeCore(meta.id, cores[meta.id])
}));
