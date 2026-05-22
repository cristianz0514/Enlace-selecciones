import { formations } from "../data/formations.js";

export default function FormationPicker({ selected, onSelect }) {
  return (
    <section className="screen">
      <div className="section-title">
        <span> paso 3 </span>
        <h2>Formacion tactica</h2>
      </div>
      <div className="formation-grid">
        {Object.keys(formations).map((name) => (
          <button
            type="button"
            className={`formation-card ${selected === name ? "active" : ""}`}
            key={name}
            onClick={() => onSelect(name)}
          >
            <strong>{name}</strong>
            <div className="mini-pitch">
              {formations[name].map(([pos, x, y], index) => (
                <i key={`${pos}-${index}`} style={{ left: `${x}%`, top: `${y}%` }} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
