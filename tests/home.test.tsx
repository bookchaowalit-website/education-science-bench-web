import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { experiments } from "@/lib/science-bench";

describe("home page", () => {
  it("renders every experiment tab and the synthetic-data notices", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Make the");
    for (const e of experiments) expect(html).toContain(e.name);
    expect(html).toContain("NO SENSOR CONNECTED");
    expect(html).toContain("ILLUSTRATIVE MEASUREMENTS · NOT LAB VALIDATION");
  });
  it("starts on the light experiment at its baseline with an empty bench log", () => {
    const html = renderToString(<Home />);
    expect(html.replace(/<!-- -->/g, "")).toContain("<strong>8 hours</strong>");
    expect(html).toContain("No observations recorded.");
  });
});
