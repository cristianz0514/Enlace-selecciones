import { Search } from "lucide-react";
import React from "react";
import PlayerCard from "./PlayerCard.jsx";
import PlayerImage from "./PlayerImage.jsx";
import { positionGroups } from "../data/formations.js";

export default function SquadBuilder({ team, squad, setSquad }) {
  const selectedIds = new Set(squad.map((p) => p.id));
  const positions = ["Todos", ...Object.keys(positionGroups)];
  const [query, setQuery] = React.useState("");
  const [group, setGroup] = React.useState("Todos");

  const filtered = team.players.filter((player) => {
    const matchQuery = player.name.toLowerCase().includes(query.toLowerCase());
    const matchGroup = group === "Todos" || positionGroups[group].includes(player.position);
    return matchQuery && matchGroup;
  });

  function togglePlayer(player) {
    if (selectedIds.has(player.id)) {
      setSquad(squad.filter((p) => p.id !== player.id));
      return;
    }
    if (squad.length < 23) setSquad([...squad, player]);
  }

  const counts = Object.fromEntries(
    Object.entries(positionGroups).map(([name, values]) => [name, squad.filter((p) => values.includes(p.position)).length])
  );
  const valid = squad.length === 23 && counts.Porteros >= 3 && counts.Defensas >= 6 && counts.Mediocampistas >= 5 && counts.Delanteros >= 4;
  const groupedSquad = Object.fromEntries(
    Object.entries(positionGroups).map(([name, values]) => [name, squad.filter((player) => values.includes(player.position))])
  );
  const missing = {
    Porteros: Math.max(0, 3 - counts.Porteros),
    Defensas: Math.max(0, 6 - counts.Defensas),
    Mediocampistas: Math.max(0, 5 - counts.Mediocampistas),
    Delanteros: Math.max(0, 4 - counts.Delanteros),
    Cupos: Math.max(0, 23 - squad.length)
  };

  return (
    <section className="screen">
      <div className="section-title">
        <span> paso 2 </span>
        <h2>Convocatoria oficial</h2>
      </div>
      <div className="squad-toolbar">
        <label className="searchbox">
          <Search size={18} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar jugador" />
        </label>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {positions.map((pos) => (
            <option key={pos}>{pos}</option>
          ))}
        </select>
        <div className={`counter ${valid ? "ok" : ""}`}>{squad.length}/23</div>
      </div>
      <div className="squad-workbench">
        <div className="live-pitch-card">
          <div className="selected-squad-title">
            <strong>Cancha de convocatoria</strong>
            <small>Organiza los 23 por zonas antes de elegir formacion</small>
          </div>
          <div className="squad-group-pitch">
            {[
              ["Delanteros", "attack"],
              ["Mediocampistas", "midfield"],
              ["Defensas", "defense"],
              ["Porteros", "keepers"]
            ].map(([groupName, className]) => (
              <div key={groupName} className={`squad-zone ${className}`}>
                <div className="zone-title">
                  <strong>{groupName}</strong>
                  <span>{groupedSquad[groupName].length}</span>
                </div>
                <div className="zone-players">
                  {groupedSquad[groupName].map((player) => (
                    <button type="button" key={player.id} onClick={() => togglePlayer(player)} className="zone-player">
                      <PlayerImage player={player} />
                      <span>{player.rating}</span>
                      <strong>{player.name.split(" ").slice(-1)[0]}</strong>
                      <small>{player.position}</small>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="available-panel">
          <div className="available-panel-head">
            <div>
              <strong>Jugadores disponibles</strong>
              <small>Selecciona desde aqui; click de nuevo para quitar</small>
            </div>
            <div className={`counter ${valid ? "ok" : ""}`}>{squad.length}/23</div>
          </div>
          <div className="need-board">
            <span className={missing.Cupos === 0 ? "ok" : ""}>{missing.Cupos} cupos restantes</span>
            <span className={missing.Porteros === 0 ? "ok" : ""}>{missing.Porteros} arqueros faltan</span>
            <span className={missing.Defensas === 0 ? "ok" : ""}>{missing.Defensas} defensas faltan</span>
            <span className={missing.Mediocampistas === 0 ? "ok" : ""}>{missing.Mediocampistas} medios faltan</span>
            <span className={missing.Delanteros === 0 ? "ok" : ""}>{missing.Delanteros} delanteros faltan</span>
          </div>
          <div className="available-grid">
            {filtered.map((player) => (
              <PlayerCard key={player.id} player={player} selected={selectedIds.has(player.id)} onClick={() => togglePlayer(player)} />
            ))}
          </div>
        </div>
      </div>
      <div className="rules">
        <span className={counts.Porteros >= 3 ? "ok" : ""}>3 arqueros</span>
        <span className={counts.Defensas >= 6 ? "ok" : ""}>6 defensas</span>
        <span className={counts.Mediocampistas >= 5 ? "ok" : ""}>5 medios</span>
        <span className={counts.Delanteros >= 4 ? "ok" : ""}>4 delanteros</span>
      </div>
    </section>
  );
}
