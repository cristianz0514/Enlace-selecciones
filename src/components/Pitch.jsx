import { Shirt } from "lucide-react";
import { formations } from "../data/formations.js";

function scoreFit(player, slot) {
  if (!player) return "";
  if (player.position === slot) return "chem high";
  if (player.secondaryPositions?.includes(slot)) return "chem mid";
  const compatible =
    (slot.includes("B") && player.position.includes("B")) ||
    (slot.includes("M") && player.position.includes("M")) ||
    (["ST", "CF", "LW", "RW"].includes(slot) && ["ST", "CF", "LW", "RW"].includes(player.position));
  return compatible ? "chem mid" : "chem low";
}

export default function Pitch({ squad, formation, lineup, setLineup }) {
  const slots = formations[formation];
  const used = new Set(Object.values(lineup).filter(Boolean));
  const bench = squad.filter((p) => !used.has(p.id));

  function assign(slotIndex, playerId) {
    setLineup({ ...lineup, [slotIndex]: playerId });
  }

  return (
    <section className="screen">
      <div className="section-title">
        <span> paso 4 </span>
        <h2>Alineacion tactica</h2>
      </div>
      <div className="lineup-layout">
        <div className="pitch">
          {slots.map(([slot, x, y], index) => {
            const player = squad.find((p) => p.id === lineup[index]);
            return (
              <div
                key={`${slot}-${index}`}
                className="slot"
                style={{ left: `${x}%`, top: `${y}%` }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => assign(index, event.dataTransfer.getData("playerId"))}
              >
                <span className={scoreFit(player, slot)} />
                <button type="button" className="shirt-card">
                  <Shirt size={28} />
                  <strong>{player ? player.rating : slot}</strong>
                  <small>{player ? player.name.split(" ").slice(-1)[0] : "Libre"}</small>
                </button>
              </div>
            );
          })}
        </div>
        <aside className="bench">
          <h3>Suplentes</h3>
          <div>
            {bench.map((player) => (
              <button
                type="button"
                key={player.id}
                draggable
                onDragStart={(event) => event.dataTransfer.setData("playerId", player.id)}
                className="bench-player"
              >
                <span>{player.rating}</span>
                <strong>{player.name}</strong>
                <small>{player.position}</small>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
