"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { cn } from "../../lib/utils";

// Six-layer model (REFACTOR §5). SVG inline + React state, no library.
// Drawn bottom-up: layer 1 (data capture) at the base, layer 6 (agentic)
// at the top. Each band is an interactive role="button" with keyboard
// navigation. Detail panel is HTML below the SVG (better a11y/responsive
// than text inside SVG — rationale in REFACTOR-STRATEGY.md §8).

const CAL_URL = "https://cal.com/ruben-bolivar";

// Tenue, desaturated tints (work in light & dark via low alpha).
const TINTS: Record<number, string> = {
  1: "rgba(115,115,115,0.14)", // gray
  2: "rgba(45,125,110,0.16)", // teal
  3: "rgba(45,125,110,0.16)", // teal
  4: "rgba(70,110,160,0.16)", // blue
  5: "rgba(70,110,160,0.16)", // blue
  6: "rgba(120,90,160,0.16)", // purple
};

const LAYERS = [1, 2, 3, 4, 5, 6] as const;

const BAND_H = 56;
const GAP = 8;
const SVG_W = 720;
const SVG_H = LAYERS.length * BAND_H + (LAYERS.length - 1) * GAP;

export function ModelDiagram() {
  const t = useTranslations("model");
  const [active, setActive] = useState<number | null>(null);
  const bandRefs = useRef<Array<SVGGElement | null>>([]);

  function focusBand(i: number) {
    const clamped = Math.max(0, Math.min(LAYERS.length - 1, i));
    bandRefs.current[clamped]?.focus();
  }

  function onKey(e: React.KeyboardEvent, layer: number, idx: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive((cur) => (cur === layer ? null : layer));
    } else if (e.key === "ArrowUp") {
      // Visually layer 6 is on top → previous in render order.
      e.preventDefault();
      focusBand(idx - 1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      focusBand(idx + 1);
    } else if (e.key === "Escape") {
      setActive(null);
    }
  }

  // Render order top→bottom: layer 6 first (y=0) … layer 1 last.
  const ordered = [...LAYERS].reverse();

  return (
    <section id="modelo" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <h2 className="font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-muted sm:text-[17px]">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Diagram */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-labelledby="model-title model-desc"
        >
          <title id="model-title">{t("diagramLabel")}</title>
          <desc id="model-desc">{t("diagramDesc")}</desc>
          {ordered.map((layer, idx) => {
            const y = idx * (BAND_H + GAP);
            const isActive = active === layer;
            return (
              <g
                key={layer}
                ref={(el) => {
                  bandRefs.current[idx] = el;
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${t(`layer${layer}Name`)} — ${t(`layer${layer}Desc`)}`}
                onClick={() =>
                  setActive((cur) => (cur === layer ? null : layer))
                }
                onKeyDown={(e) => onKey(e, layer, idx)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={0.5}
                  y={y + 0.5}
                  width={SVG_W - 1}
                  height={BAND_H}
                  rx={2}
                  fill={TINTS[layer]}
                  stroke={isActive ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isActive ? 1 : 0.5}
                />
                <text
                  x={20}
                  y={y + BAND_H / 2 + 1}
                  dominantBaseline="middle"
                  className="fill-foreground"
                  style={{
                    font: "500 15px var(--font-sans)",
                  }}
                >
                  {t(`layer${layer}Name`)}
                </text>
                <text
                  x={SVG_W - 20}
                  y={y + BAND_H / 2 + 1}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-subtle"
                  style={{ font: "500 11px var(--font-mono)" }}
                >
                  {String(layer).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Detail panel */}
        <div aria-live="polite" className="lg:sticky lg:top-24">
          {active === null ? (
            <p className="text-sm leading-relaxed text-subtle">
              {t("diagramDesc")}
            </p>
          ) : (
            <div className="border-hairline p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                {String(active).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-xl font-medium text-foreground">
                {t(`layer${active}Name`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`layer${active}Desc`)}
              </p>
              <div className="mt-5 flex flex-col gap-2 text-sm">
                <Link
                  href="/casos"
                  className="text-accent hover:underline underline-offset-4"
                >
                  {t("ctaCase")}
                </Link>
                <Link
                  href="/insights"
                  className="text-accent hover:underline underline-offset-4"
                >
                  {t("ctaArticle")}
                </Link>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline underline-offset-4"
                >
                  {t("ctaTalk")}
                </a>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle hover:text-foreground"
              >
                {t("collapse")}
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-12 max-w-2xl text-[15px] leading-[1.7] text-muted sm:text-base">
        {t("close")}
      </p>
    </section>
  );
}
