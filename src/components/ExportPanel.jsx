import { Download } from "lucide-react";
import PlayerImage from "./PlayerImage.jsx";
import { formations, positionGroups } from "../data/formations.js";

export default function ExportPanel({ team, coach, setCoach, formation, squad, lineup, exportSquadRef, exportPitchRef, onExportSquad, onExportPitch }) {
  const groupedSquad = Object.fromEntries(
    Object.entries(positionGroups).map(([name, values]) => [name, squad.filter((player) => values.includes(player.position))])
  );
  const starterSlots = formations[formation].map(([slot, x, y], index) => ({
    slot,
    x,
    y,
    player: squad.find((player) => player.id === lineup[index])
  }));
  const starterCount = starterSlots.filter((item) => item.player).length;

  return (
    <section className="screen">
      <div className="section-title">
        <span> paso 5 </span>
        <h2>Exportar resultado</h2>
      </div>
      <div className="export-actions">
        <label>
          Nombre del DT
          <input value={coach} onChange={(e) => setCoach(e.target.value)} />
        </label>
        <button type="button" onClick={onExportSquad}>
          <Download size={18} /> Convocatoria PNG
        </button>
        <button type="button" onClick={onExportPitch} disabled={starterCount < 11}>
          <Download size={18} /> Alineacion PNG
        </button>
      </div>
      <div className="exports">
        <article ref={exportSquadRef} className="export-card" style={{ "--accent": team.accent }}>
          <header>
            <img src={team.flag} alt={team.name} crossOrigin="anonymous" />
            <div>
              <span>{team.crest}</span>
              <h2>{team.name}</h2>
              <p>Convocatoria oficial 23 jugadores | DT {coach}</p>
            </div>
          </header>
          <div className="export-position-groups">
            {["Porteros", "Defensas", "Mediocampistas", "Delanteros"].map((groupName) => (
              <section key={groupName}>
                <h3>{groupName}</h3>
                <div className="export-squad-list">
                  {groupedSquad[groupName].map((player) => (
                    <div key={player.id}>
                      <b>{player.nationalNumber}</b>
                      <strong>{player.name}</strong>
                      <span>{player.position}</span>
                      <small>{player.club}</small>
                      <em>{player.rating}</em>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
        <article ref={exportPitchRef} className="export-card" style={{ "--accent": team.accent }}>
          <header>
            <img src={team.flag} alt={team.name} crossOrigin="anonymous" />
            <div>
              <span>{team.crest}</span>
              <h2>{team.name} {formation}</h2>
              <p>Alineacion titular | DT {coach}</p>
            </div>
          </header>
          <div className="export-formation-pitch">
            {starterSlots.map(({ slot, x, y, player }, index) => (
              <div key={`${slot}-${index}`} className={`export-slot ${player ? "filled" : ""}`} style={{ left: `${x}%`, top: `${y}%` }}>
                {player ? <PlayerImage player={player} /> : <i />}
                <strong>{player ? player.name.split(" ").slice(-1)[0] : slot}</strong>
                <span>{player ? `${player.rating} | ${player.position}` : "Pendiente"}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
