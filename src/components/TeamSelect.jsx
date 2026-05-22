import { motion } from "framer-motion";

export default function TeamSelect({ teams, selectedTeam, onSelect }) {
  return (
    <section className="screen">
      <div className="section-title">
        <span> paso 1 </span>
        <h1>Elige seleccion</h1>
      </div>
      <div className="team-grid">
        {teams.map((team) => (
          <motion.button
            type="button"
            key={team.id}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => onSelect(team)}
            className={`team-tile ${selectedTeam?.id === team.id ? "active" : ""}`}
            style={{ "--accent": team.accent }}
          >
            <img src={team.flag} alt={team.name} crossOrigin="anonymous" />
            <div className="crest">{team.crest}</div>
            <strong>{team.name}</strong>
            <small>{team.players.length} elegibles</small>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
