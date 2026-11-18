"use client";

import { useMemo, useState } from "react";
import { EmptyState, Reader, ReaderFoot, ReaderHead, ReaderTop } from "@/components/reader-shell";
import { curvePoints, experiments, findExperiment, formatValue, recordObservation, SLIDER_MAX, SLIDER_MIN, type Observation } from "@/lib/science-bench";

// The Observation Bench on the Reader shell: pick an experiment, move one input, read the synthetic curve, and
// record an observation in the bench log (kept for this page view only).

const SOURCE = "https://github.com/bookchaowalit-website/education-science-bench-web";

export function BenchView() {
  const [experimentId, setExperimentId] = useState("light");
  const [value, setValue] = useState(8);
  const [notes, setNotes] = useState<Observation[]>([]);
  const experiment = findExperiment(experimentId);
  const curve = useMemo(() => curvePoints(value), [value]);
  const reading = formatValue(value, experiment.unit);
  const choose = (id: string) => { setExperimentId(id); setValue(findExperiment(id).baseline); };

  return (
    <Reader>
      <ReaderTop name="Observation Bench" tagline="Synthetic run, no sensor" links={[{ href: "#bench", label: "Bench" }, { href: "#log", label: "Log" }]} />
      <main id="main" className="rs-main">
        <ReaderHead
          eyebrow="Change one thing, look again"
          title="Make the variable visible."
          lede="A small experiment notebook for changing one input, reading a curve, and leaving an observation behind. Every curve is illustrative: no sensor is connected."
        />
        <section aria-labelledby="bench" className="rs-toolbar">
          <div className="rs-section-head"><h2 id="bench">Experiments</h2></div>
          <ul className="site-chips" aria-label="Choose an experiment">
            {experiments.map((item) => (
              <li key={item.id}>
                <button type="button" className="rs-chip" aria-pressed={item.id === experiment.id} onClick={() => choose(item.id)}>
                  {item.name}<small>{item.variable}</small>
                </button>
              </li>
            ))}
          </ul>
          <article className="bench-card" aria-labelledby="run">
            <h3 id="run">Run: {experiment.name}</h3>
            <div>
              <p className="bench-label">Readout, {experiment.variable}</p>
              <p className="bench-readout" role="status">{reading}</p>
            </div>
            <div className="bench-chart">
              <svg viewBox="0 0 100 130" preserveAspectRatio="none" role="img" aria-label={`Illustrative response curve for ${experiment.variable} at ${reading}`}>
                <line x1="0" y1="118" x2="100" y2="118" />
                <line x1="0" y1="59" x2="100" y2="59" />
                <polyline points={curve} />
              </svg>
              <p className="bench-axes" aria-hidden="true"><span>Response over time</span><span>Time →</span></p>
            </div>
            <p className="bench-note">{experiment.note}</p>
            <label className="bench-slider">
              Change the {experiment.variable} ({experiment.unit})
              <input type="range" min={SLIDER_MIN} max={SLIDER_MAX} value={value} onChange={(event) => setValue(Number(event.target.value))} />
              <span className="bench-ends" aria-hidden="true"><span>Low</span><span>High</span></span>
            </label>
            <div className="rs-actions">
              <button type="button" className="rs-button" onClick={() => setNotes((current) => recordObservation(current, experiment, value))}>Record observation</button>
            </div>
          </article>
        </section>
        <section aria-labelledby="log" className="bench-log-section">
          <div className="rs-section-head"><h2 id="log">Bench log</h2></div>
          {notes.length === 0 ? (
            <EmptyState title="No observations yet" headingLevel={3}>
              Move the slider, then press Record observation. The four newest stay here for this visit.
            </EmptyState>
          ) : (
            <ol className="bench-log" aria-label="Recorded observations, newest first">
              {notes.map((note) => <li key={note.id}>{note.text}</li>)}
            </ol>
          )}
        </section>
      </main>
      <ReaderFoot source={SOURCE} note="Illustrative, synthetic measurements for learning. Not lab validation, and no sensor or dataset is involved." />
    </Reader>
  );
}
