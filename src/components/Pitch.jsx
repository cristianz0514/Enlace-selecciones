import { Shirt, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { formations } from "../data/formations.js";
import PlayerImage from "./PlayerImage.jsx";

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

// Ghost element que sigue el dedo en arrastre táctil
let touchGhost = null;

export default function Pitch({ squad, formation, lineup, setLineup }) {
  const slots = formations[formation];
  const used = new Set(Object.values(lineup).filter(Boolean));
  const bench = squad.filter((p) => !used.has(p.id));

  // Estado para click-to-assign (móvil y escritorio)
  const [selected, setSelected] = useState(null); // { type: 'bench'|'slot', id?, slotIndex? }

  // Refs para arrastre táctil
  const dragPayload = useRef(null); // { type, id, slotIndex }
  const pitchRef = useRef(null);

  // Limpiar selección al cambiar formación
  useEffect(() => { setSelected(null); }, [formation]);

  function assign(slotIndex, playerId) {
    if (!playerId) return;
    setLineup((prev) => {
      const next = { ...prev };
      // Si el jugador ya estaba en otro slot, liberar ese slot
      const prevSlot = Object.entries(next).find(([, v]) => v === playerId)?.[0];
      if (prevSlot !== undefined) delete next[prevSlot];
      next[slotIndex] = playerId;
      return next;
    });
  }

  function swapSlots(slotA, slotB) {
    setLineup((prev) => {
      const next = { ...prev };
      const tmp = next[slotA];
      next[slotA] = next[slotB];
      next[slotB] = tmp;
      if (!next[slotA]) delete next[slotA];
      if (!next[slotB]) delete next[slotB];
      return next;
    });
  }

  function removeFromSlot(slotIndex) {
    setLineup((prev) => {
      const next = { ...prev };
      delete next[slotIndex];
      return next;
    });
  }

  // ── CLICK / TAP LOGIC ───────────────────────────────────────────────
  function handleBenchClick(player) {
    if (selected?.type === "slot") {
      // Hay un slot seleccionado → asignar este jugador de suplentes al slot
      assign(selected.slotIndex, player.id);
      setSelected(null);
    } else if (selected?.type === "bench" && selected.id === player.id) {
      // Deseleccionar
      setSelected(null);
    } else {
      // Seleccionar este jugador de suplentes
      setSelected({ type: "bench", id: player.id });
    }
  }

  function handleSlotClick(slotIndex, occupantId) {
    if (selected?.type === "bench") {
      // Jugador de suplentes seleccionado → colocarlo en este slot
      assign(slotIndex, selected.id);
      setSelected(null);
    } else if (selected?.type === "slot") {
      if (selected.slotIndex === slotIndex) {
        setSelected(null); // Deseleccionar
      } else {
        // Intercambiar dos slots
        swapSlots(selected.slotIndex, slotIndex);
        setSelected(null);
      }
    } else if (occupantId) {
      // Seleccionar jugador del slot para moverlo
      setSelected({ type: "slot", slotIndex, id: occupantId });
    }
  }

  // ── HTML5 DRAG (escritorio) ──────────────────────────────────────────
  function handleSlotDrop(event, slotIndex) {
    event.preventDefault();
    const payloadRaw = event.dataTransfer.getData("payload");
    if (!payloadRaw) return;
    try {
      const payload = JSON.parse(payloadRaw);
      if (payload.type === "bench") {
        assign(slotIndex, payload.id);
      } else if (payload.type === "slot") {
        swapSlots(payload.slotIndex, slotIndex);
      }
    } catch { /* ignore */ }
    setSelected(null);
  }

  // ── TOUCH DRAG (móvil) ───────────────────────────────────────────────
  function createGhost(label, x, y) {
    removeGhost();
    touchGhost = document.createElement("div");
    touchGhost.className = "touch-drag-ghost";
    touchGhost.textContent = label;
    touchGhost.style.cssText = `position:fixed;z-index:9999;pointer-events:none;
      background:rgba(30,41,59,.92);color:#fff;padding:6px 14px;border-radius:20px;
      font-size:13px;font-weight:700;border:2px solid var(--team-accent,#ffd447);
      transform:translate(-50%,-50%);transition:none;white-space:nowrap;`;
    touchGhost.style.left = x + "px";
    touchGhost.style.top = y + "px";
    document.body.appendChild(touchGhost);
  }

  function moveGhost(x, y) {
    if (touchGhost) {
      touchGhost.style.left = x + "px";
      touchGhost.style.top = y + "px";
    }
  }

  function removeGhost() {
    if (touchGhost) { touchGhost.remove(); touchGhost = null; }
  }

  function getElementAtPoint(x, y) {
    const els = document.elementsFromPoint(x, y);
    return els.find((el) => el.dataset.slotIndex !== undefined);
  }

  function handleTouchStart(event, payload, label) {
    // Solo activar arrastre táctil con un dedo
    if (event.touches.length !== 1) return;
    event.preventDefault();
    dragPayload.current = payload;
    const t = event.touches[0];
    createGhost(label, t.clientX, t.clientY);
  }

  function handleTouchMove(event) {
    if (!dragPayload.current) return;
    event.preventDefault();
    const t = event.touches[0];
    moveGhost(t.clientX, t.clientY);
  }

  function handleTouchEnd(event) {
    if (!dragPayload.current) return;
    event.preventDefault();
    const t = event.changedTouches[0];
    const target = getElementAtPoint(t.clientX, t.clientY);
    if (target) {
      const targetSlotIndex = Number(target.dataset.slotIndex);
      const p = dragPayload.current;
      if (p.type === "bench") {
        assign(targetSlotIndex, p.id);
      } else if (p.type === "slot") {
        swapSlots(p.slotIndex, targetSlotIndex);
      }
      setSelected(null);
    }
    dragPayload.current = null;
    removeGhost();
  }

  // Escuchar touchmove/touchend a nivel de document para no perder el gesto
  useEffect(() => {
    const onMove = (e) => handleTouchMove(e);
    const onEnd = (e) => handleTouchEnd(e);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd, { passive: false });
    return () => {
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      removeGhost();
    };
  }, [lineup]); // eslint-disable-line

  const isSelectedBench = (id) => selected?.type === "bench" && selected.id === id;
  const isSelectedSlot = (idx) => selected?.type === "slot" && selected.slotIndex === idx;

  return (
    <section className="screen">
      <div className="section-title">
        <span> paso 4 </span>
        <h2>Alineacion tactica</h2>
      </div>

      {selected && (
        <div className="pitch-hint">
          {selected.type === "bench"
            ? "Toca un puesto en la cancha para colocar al jugador"
            : "Toca otro puesto para intercambiar, o el mismo para cancelar"}
          <button type="button" onClick={() => setSelected(null)}><X size={14} /></button>
        </div>
      )}

      <div className="lineup-layout" ref={pitchRef}>
        <div className="pitch">
          {slots.map(([slot, x, y], index) => {
            const player = squad.find((p) => p.id === lineup[index]);
            const fit = scoreFit(player, slot);
            const selSlot = isSelectedSlot(index);
            return (
              <div
                key={`${slot}-${index}`}
                className={`slot ${selSlot ? "slot-selected" : ""}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                data-slot-index={index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleSlotDrop(e, index)}
                onClick={() => handleSlotClick(index, player?.id)}
              >
                <span className={fit} />
                <button
                  type="button"
                  className={`shirt-card ${selSlot ? "is-active" : ""}`}
                  draggable={Boolean(player)}
                  onDragStart={(e) => {
                    if (!player) return;
                    e.dataTransfer.setData("payload", JSON.stringify({ type: "slot", slotIndex: index }));
                  }}
                  onTouchStart={(e) => {
                    if (!player) return;
                    handleTouchStart(e, { type: "slot", slotIndex: index }, player.name.split(" ").slice(-1)[0]);
                  }}
                >
                  {player
                    ? <PlayerImage player={player} className="slot-photo" />
                    : <Shirt size={26} />}
                  <strong>{player ? player.rating : slot}</strong>
                  <small>{player ? player.name.split(" ").slice(-1)[0] : "Libre"}</small>
                  {player && (
                    <button
                      type="button"
                      className="slot-remove"
                      onClick={(e) => { e.stopPropagation(); removeFromSlot(index); setSelected(null); }}
                    >
                      <X size={10} />
                    </button>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <aside className="bench">
          <h3>Suplentes / Disponibles</h3>
          <div>
            {bench.map((player) => {
              const selB = isSelectedBench(player.id);
              return (
                <button
                  type="button"
                  key={player.id}
                  className={`bench-player ${selB ? "bench-selected" : ""}`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("payload", JSON.stringify({ type: "bench", id: player.id }));
                  }}
                  onTouchStart={(e) =>
                    handleTouchStart(e, { type: "bench", id: player.id }, player.name.split(" ").slice(-1)[0])
                  }
                  onClick={() => handleBenchClick(player)}
                >
                  <PlayerImage player={player} className="bench-photo" />
                  <span>{player.rating}</span>
                  <strong>{player.name}</strong>
                  <small>{player.position}</small>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
