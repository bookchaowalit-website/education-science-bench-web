// Experiment set and pure logic for the Observation Bench.
// Every curve is synthetic and illustrative: no sensor, dataset or lab measurement is involved.

export type Experiment = { id: string; name: string; variable: string; unit: string; baseline: number; color: string; note: string };
export type Observation = { id: number; text: string };

export const experiments: Experiment[] = [
  { id: "light", name: "Light / leaf", variable: "exposure", unit: "hours", baseline: 8, color: "#c8e96a", note: "Observe how the curve changes when the same leaf receives a longer window of light." },
  { id: "water", name: "Water / soil", variable: "moisture", unit: "%", baseline: 54, color: "#76c8d8", note: "Observe the point where additional water stops changing the synthetic response." },
  { id: "heat", name: "Heat / reaction", variable: "temperature", unit: "°C", baseline: 31, color: "#f49b62", note: "Observe the rise, plateau, and fall in a deliberately simplified reaction curve." },
];

export const LOG_LIMIT = 4;
export const SLIDER_MIN = 1;
export const SLIDER_MAX = 100;

export function findExperiment(id: string): Experiment {
  return experiments.find((item) => item.id === id) ?? experiments[0];
}

/** SVG polyline points (viewBox 0 0 100 130) for the synthetic response at this input value. */
export function curvePoints(value: number): string {
  return Array.from({ length: 8 }, (_, index) => {
    const response = Math.sin((index + value / 12) * 0.9) * 42 + value * 1.3;
    // Keep the response between the baseline (y=118) and the top of the chart (y=4).
    return index * 14 + "," + (118 - Math.min(114, Math.max(4, response)));
  }).join(" ");
}

export function observationText(experiment: Experiment, value: number): string {
  return experiment.name + " / " + value + experiment.unit;
}

/** Newest observation first, keeping at most LOG_LIMIT entries. */
export function recordObservation(log: Observation[], experiment: Experiment, value: number): Observation[] {
  const id = log.reduce((max, item) => Math.max(max, item.id), -1) + 1;
  return [{ id, text: observationText(experiment, value) }, ...log].slice(0, LOG_LIMIT);
}
