import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import TeamSelect from "./components/TeamSelect.jsx";
import SquadBuilder from "./components/SquadBuilder.jsx";
import FormationPicker from "./components/FormationPicker.jsx";
import Pitch from "./components/Pitch.jsx";
import ExportPanel from "./components/ExportPanel.jsx";
import PhotoSourceSettings from "./components/PhotoSourceSettings.jsx";
import { teams } from "./data/teams.js";
import { formations, positionGroups } from "./data/formations.js";
import { exportNodeAsPng } from "./utils/exportImage.js";

const steps = ["Seleccion", "Convocatoria", "Formacion", "Cancha", "Exportar"];

function isSquadValid(squad) {
  const counts = Object.fromEntries(
    Object.entries(positionGroups).map(([name, values]) => [name, squad.filter((p) => values.includes(p.position)).length])
  );
  return squad.length === 23 && counts.Porteros >= 3 && counts.Defensas >= 6 && counts.Mediocampistas >= 5 && counts.Delanteros >= 4;
}

function autoLineup(squad, formation) {
  const chosen = new Set();
  const lineup = {};
  formations[formation].forEach(([slot], index) => {
    const exact = squad.find((p) => !chosen.has(p.id) && p.position === slot);
    const secondary = squad.find((p) => !chosen.has(p.id) && p.secondaryPositions?.includes(slot));
    const sameLine = squad.find((p) => !chosen.has(p.id) && p.position[0] === slot[0]);
    const player = exact || secondary || sameLine || squad.find((p) => !chosen.has(p.id));
    if (player) {
      chosen.add(player.id);
      lineup[index] = player.id;
    }
  });
  return lineup;
}

export default function App() {
  const [team, setTeam] = useState(teams[0]);
  const [squad, setSquad] = useState([]);
  const [formation, setFormation] = useState("4-3-3");
  const [lineup, setLineup] = useState({});
  const [coach, setCoach] = useState("Director Tecnico");
  const [currentStep, setCurrentStep] = useState(0);
  const exportSquadRef = useRef(null);
  const exportPitchRef = useRef(null);

  useEffect(() => {
    localStorage.removeItem("fc26-selector-state");
    // Limpiar cache de fotos de versiones anteriores (v3 y anteriores)
    Object.keys(localStorage)
      .filter((k) => k.startsWith("player-photo:") && !k.startsWith("player-photo:v4:"))
      .forEach((k) => localStorage.removeItem(k));
  }, []);

  useEffect(() => {
    if (squad.length >= 11) setLineup(autoLineup(squad, formation));
  }, [formation]);

  const validSquad = useMemo(() => isSquadValid(squad), [squad]);
  const lineupCount = Object.values(lineup).filter(Boolean).length;
  const completedSteps = [
    Boolean(team),
    validSquad,
    Boolean(formation),
    lineupCount >= 11,
    false
  ];
  const canGoNext = currentStep === 0 || completedSteps[currentStep];

  useEffect(() => {
    if (currentStep > 1 && !validSquad) setCurrentStep(1);
    if (currentStep > 3 && lineupCount < 11) setCurrentStep(3);
  }, [currentStep, validSquad, lineupCount]);

  function handleTeamSelect(nextTeam) {
    setTeam(nextTeam);
    setSquad([]);
    setLineup({});
    setCurrentStep(1);
  }

  function handleSquad(nextSquad) {
    setSquad(nextSquad);
    if (nextSquad.length >= 11) setLineup(autoLineup(nextSquad, formation));
    else setLineup({});
  }

  function goNext() {
    if (canGoNext) setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  const screens = [
    <TeamSelect teams={teams} selectedTeam={team} onSelect={handleTeamSelect} />,
    <SquadBuilder team={team} squad={squad} setSquad={handleSquad} />,
    <FormationPicker selected={formation} onSelect={setFormation} />,
    <Pitch squad={squad} formation={formation} lineup={lineup} setLineup={setLineup} />,
    <ExportPanel
      team={team}
      coach={coach}
      setCoach={setCoach}
      formation={formation}
      squad={squad}
      lineup={lineup}
      exportSquadRef={exportSquadRef}
      exportPitchRef={exportPitchRef}
      onExportSquad={() => exportNodeAsPng(exportSquadRef.current, `${team.name}-convocatoria.png`)}
      onExportPitch={() => exportNodeAsPng(exportPitchRef.current, `${team.name}-${formation}.png`)}
    />
  ];

  return (
    <main className="app-shell" style={{ "--team-accent": team.accent }}>
      <div className="bg-grid" />
      <header className="topbar">
        <div className="brand">
          <Shield size={28} />
          <div>
            <strong>FC26 Selecciones</strong>
            <span>Modo Director Tecnico</span>
          </div>
        </div>
        <nav>
          {steps.map((step, index) => (
            <button
              type="button"
              key={step}
              className={`${index === currentStep ? "active" : ""} ${completedSteps[index] || index < currentStep ? "done" : ""}`}
              disabled={index > currentStep && !completedSteps[index - 1]}
              onClick={() => setCurrentStep(index)}
            >
              {completedSteps[index] || index < currentStep ? <CheckCircle2 size={14} /> : index + 1}
              {step}
            </button>
          ))}
        </nav>
      </header>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="hero-strip">
        <img src={team.flag} alt={team.name} crossOrigin="anonymous" />
        <div>
          <span>{team.crest}</span>
          <h1>{team.name}</h1>
          <p>{squad.length} convocados | {formation} | DT {coach}</p>
        </div>
      </motion.div>

      <div className="process-panel">
        <div className="process-copy">
          <span>Proceso {currentStep + 1} de {steps.length}</span>
          <strong>{steps[currentStep]}</strong>
          <small>
            {currentStep === 1 && !validSquad ? "Completa 23 jugadores con los minimos por posicion para continuar." : "Avanza cuando este paso quede listo."}
          </small>
        </div>
        <div className="process-actions">
          <button type="button" onClick={goBack} disabled={currentStep === 0}>
            <ArrowLeft size={18} /> Volver
          </button>
          <button type="button" onClick={goNext} disabled={currentStep === steps.length - 1 || !canGoNext}>
            Siguiente <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {currentStep === 1 && <PhotoSourceSettings />}

      <motion.div key={currentStep} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
        {screens[currentStep]}
      </motion.div>
    </main>
  );
}
