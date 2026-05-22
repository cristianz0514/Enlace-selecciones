import { motion } from "framer-motion";
import PlayerImage from "./PlayerImage.jsx";

export default function PlayerCard({ player, selected, compact = false, onClick, draggable, onDragStart }) {
  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -3 }}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      className={`player-card ${selected ? "is-selected" : ""} ${compact ? "is-compact" : ""}`}
    >
      <span className="rating">{player.rating}</span>
      <span className="pos">{player.position}</span>
      <PlayerImage player={player} />
      <strong>{player.name}</strong>
      {!compact && (
        <>
          <small>{player.club}</small>
          <div className="meta-row">
            <span>{player.age} años</span>
            <span>{player.foot}</span>
            <span>{player.height}</span>
          </div>
        </>
      )}
    </motion.button>
  );
}
