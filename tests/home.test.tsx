// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { experiments } from "@/lib/science-bench";
import nextConfig from "@/next.config";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
const text = (html: string) => html.replace(/<!-- -->/g, "");

describe("home page (server render)", () => {
  it("renders one h1, every experiment, the baseline readout, an empty log and the synthetic-data notices", () => {
    const html = text(renderToString(<Home />));
    expect(html.match(/<h1/g)).toHaveLength(1);
    for (const e of experiments) expect(html).toContain(e.name);
    expect(html).toContain(">8 hours</p>");
    expect(html).toContain("No observations yet");
    expect(html).toContain("no sensor is connected");
    expect(html).toContain("Not lab validation");
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });

  it("labels the slider with the experiment variable and unit", () => {
    expect(text(renderToString(<Home />))).toContain("Change the exposure (hours)");
  });
});

describe("home page (mounted)", () => {
  let root: Root;
  let host: HTMLDivElement;
  const button = (t: string) => [...host.querySelectorAll("button")].find((b) => b.textContent?.trim().startsWith(t)) as HTMLButtonElement;
  const press = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
  const slide = (value: number) => {
    const input = host.querySelector<HTMLInputElement>("input[type='range']")!;
    act(() => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, String(value));
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<Home />));
  });
  afterEach(() => { act(() => root.unmount()); host.remove(); });

  it("moves the input, records observations newest first with spaced units, and switches experiments", () => {
    slide(12);
    expect(host.querySelector("[role='status']")!.textContent).toBe("12 hours");
    press(button("Record observation"));
    press(button("Water / soil"));
    expect(button("Water / soil").getAttribute("aria-pressed")).toBe("true");
    expect(host.querySelector("[role='status']")!.textContent).toBe("54%");
    press(button("Record observation"));
    expect([...host.querySelectorAll(".bench-log li")].map((li) => li.textContent)).toEqual(["Water / soil / 54%", "Light / leaf / 12 hours"]);
  });
});

describe("site files", () => {
  it("points robots and the sitemap at science.bookchaowalit.com and redirects /more-projects", async () => {
    expect(robots().sitemap).toBe("https://science.bookchaowalit.com/sitemap.xml");
    expect(sitemap()[0].url).toBe("https://science.bookchaowalit.com/");
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
