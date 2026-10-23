"use client";

import { useMemo, useState } from "react";
import { curvePoints, experiments, findExperiment, recordObservation, SLIDER_MAX, SLIDER_MIN, type Observation } from "@/lib/science-bench";

export default function Home() {
  const [experimentId, setExperimentId] = useState("light");
  const [value, setValue] = useState(8);
  const [notes, setNotes] = useState<Observation[]>([]);
  const experiment = findExperiment(experimentId);
  const curve = useMemo(() => curvePoints(value), [value]);
  const chooseExperiment = (id: string) => { const next = findExperiment(id); setExperimentId(id); setValue(next.baseline); };
  const record = () => setNotes((current) => recordObservation(current, experiment, value));
  return <main className="bench-page"><div className="bench-shell">
    <header className="bench-header"><div className="bench-brand"><span className="bench-mark">OB</span><span>OBSERVATION / BENCH</span></div><span>NOTEBOOK 01 · SYNTHETIC RUN</span><span className="bench-status">NO SENSOR CONNECTED</span></header>
    <section className="bench-hero"><div><p className="bench-kicker">change one thing / look again</p><h1>Make the<br /><em>variable visible.</em></h1><p className="bench-deck">A small experiment notebook for changing one input, reading a curve, and leaving an observation behind.</p></div><div className="bench-result"><span>READOUT</span><strong>{value} {experiment.unit}</strong><small>{experiment.variable}<br />illustrative response</small></div></section>
    <section className="experiment-tabs" aria-label="Experiments"><div className="section-label"><span>EXPERIMENT SET</span><span>{experiments.length} RUNS</span></div>{experiments.map((item) => <button key={item.id} type="button" className={item.id === experiment.id ? "experiment-tab is-active" : "experiment-tab"} onClick={() => chooseExperiment(item.id)}><i style={{ background: item.color }} /><span>{item.name}</span><small>{item.variable}</small></button>)}</section>
    <section className="bench-workspace"><div className="bench-panel"><div className="panel-top"><span>RUN / {experiment.name}</span><b>{experiment.variable}</b></div><div className="chart"><svg viewBox="0 0 100 130" role="img" aria-label="Synthetic experiment curve"><line x1="0" y1="118" x2="100" y2="118" /><line x1="0" y1="59" x2="100" y2="59" /><polyline points={curve} style={{ stroke: experiment.color }} /></svg><span className="axis-x">TIME →</span><span className="axis-y">RESPONSE</span></div><p className="bench-note">{experiment.note}</p></div><aside className="control-panel"><span>CHANGE THE INPUT</span><strong>{value} {experiment.unit}</strong><input type="range" min={SLIDER_MIN} max={SLIDER_MAX} value={value} onChange={(event) => setValue(Number(event.target.value))} style={{ accentColor: experiment.color }} /><div className="control-ends"><small>LOW</small><small>HIGH</small></div><button type="button" onClick={record}>Record observation →</button><div className="bench-log"><span>BENCH LOG</span>{notes.length === 0 ? <small>No observations recorded.</small> : notes.map((note) => <p key={note.id}>{note.text}</p>)}</div></aside></section>
    <footer className="bench-footer"><span>BOOKCHAOWALIT / OBSERVATION BENCH</span><span>ILLUSTRATIVE MEASUREMENTS · NOT LAB VALIDATION</span></footer>
  </div></main>;
}
