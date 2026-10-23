import { describe, expect, it } from "vitest";
import { curvePoints, experiments, findExperiment, LOG_LIMIT, observationText, recordObservation, SLIDER_MAX, SLIDER_MIN, type Observation } from "@/lib/science-bench";

const ys = (points: string) => points.split(" ").map((pair) => Number(pair.split(",")[1]));

describe("experiments", () => {
  it("have unique ids and baselines inside the slider range", () => {
    expect(new Set(experiments.map((e) => e.id)).size).toBe(experiments.length);
    for (const e of experiments) {
      expect(e.baseline).toBeGreaterThanOrEqual(SLIDER_MIN);
      expect(e.baseline).toBeLessThanOrEqual(SLIDER_MAX);
    }
  });
  it("falls back to the first experiment for an unknown id", () => {
    expect(findExperiment("heat").variable).toBe("temperature");
    expect(findExperiment("nope")).toBe(experiments[0]);
  });
});

describe("curvePoints", () => {
  it("draws 8 points left to right across the chart", () => {
    const points = curvePoints(8).split(" ");
    expect(points).toHaveLength(8);
    expect(points.map((p) => Number(p.split(",")[0]))).toEqual([0, 14, 28, 42, 56, 70, 84, 98]);
  });
  it("changes with the input value", () => {
    expect(curvePoints(8)).not.toBe(curvePoints(54));
  });
  it("stays inside the 0..130 viewBox for every slider value, so the line is never drawn off the chart", () => {
    for (let value = SLIDER_MIN; value <= SLIDER_MAX; value++) {
      for (const y of ys(curvePoints(value))) {
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(130);
      }
    }
  });
});

describe("bench log", () => {
  const light = experiments[0];
  it("writes the experiment, value and unit", () => {
    expect(observationText(light, 8)).toBe("Light / leaf / 8hours");
  });
  it("puts the newest observation first and keeps only the last four", () => {
    let log: Observation[] = [];
    for (let v = 1; v <= 6; v++) log = recordObservation(log, light, v);
    expect(log).toHaveLength(LOG_LIMIT);
    expect(log.map((o) => o.text)).toEqual(["Light / leaf / 6hours", "Light / leaf / 5hours", "Light / leaf / 4hours", "Light / leaf / 3hours"]);
  });
  it("gives each observation a unique id, also when the same value is recorded twice or the log is full", () => {
    let log: Observation[] = [];
    for (let i = 0; i < 7; i++) log = recordObservation(log, light, 8);
    expect(new Set(log.map((o) => o.id)).size).toBe(log.length);
  });
});
