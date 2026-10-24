import type { Creature, Kind } from "./collection";

const NRG: Record<Kind, { bg: string; fg: string; d: string; label: string }> = {
  grass: { bg: "#3f9b3a", fg: "#e8f9d8", d: "M5 14c0-6 4-9 10-9 0 6-3 10-9 10l-1-1zm1 0 6-6", label: "Plante" },
  fire: { bg: "#e2462c", fg: "#ffe9c2", d: "M10 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-4 0-7z", label: "Feu" },
  water: { bg: "#2f7fd6", fg: "#e2f1ff", d: "M10 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z", label: "Eau" },
  electric: { bg: "#f2c418", fg: "#3a2d00", d: "M11 2 5 11h4l-1 7 6-9h-4z", label: "Électrique" },
  psy: { bg: "#8b4bb8", fg: "#f6e8ff", d: "M3 10c3-4.5 11-4.5 14 0-3 4.5-11 4.5-14 0zm7 2.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z", label: "Psy" },
  any: { bg: "#f4f4f1", fg: "#6b6b66", d: "m10 4 1.8 3.8 4.2.5-3.1 2.9.8 4.1L10 13.3l-3.7 2 .8-4.1L4 8.3l4.2-.5z", label: "Incolore" },
};

export function Energy({ kind }: { kind: Kind }) {
  const n = NRG[kind];
  return (
    <svg className="pk-nrg" viewBox="0 0 20 20" role="img" aria-label={n.label}>
      <circle cx="10" cy="10" r="10" fill={n.bg} stroke={kind === "any" ? "#b9b9b2" : "none"} />
      <path d={n.d} fill={n.fg} fillRule="evenodd" />
    </svg>
  );
}

/* le décor de chaque type : ciel haut, ciel bas, sol */
const SCENE: Record<Creature["type"], [string, string, string, string]> = {
  grass: ["#bfe8ff", "#f3fbe4", "#86efac", "#4ade80"],
  fire: ["#ffd6a8", "#fff3dc", "#d6a36b", "#b9844e"],
  water: ["#a7d8ff", "#e6f6ff", "#7cc7f0", "#3b9fdc"],
  electric: ["#fff1a6", "#fffbe6", "#c9e27a", "#a3c94f"],
  psy: ["#4c3a73", "#9b7fc4", "#6b4f9a", "#4a3575"],
};

/* yeux, joues et sourire : le même visage pour toute la famille */
function Face({ y, gap = 4.5 }: { y: number; gap?: number }) {
  return (
    <g>
      <circle cx={-gap} cy={y} r="3.2" fill="#1e1b4b" />
      <circle cx={gap} cy={y} r="3.2" fill="#1e1b4b" />
      <circle cx={-gap + 1} cy={y - 1.2} r="1.1" fill="#fff" />
      <circle cx={gap + 1} cy={y - 1.2} r="1.1" fill="#fff" />
      <circle cx={-gap - 3.5} cy={y + 6} r="2.2" fill="#f9a8d4" />
      <circle cx={gap + 3.5} cy={y + 6} r="2.2" fill="#f9a8d4" />
      <path d={`M-2.5 ${y + 6}q2.5 2.5 5 0`} stroke="#1e1b4b" strokeWidth="1.2" fill="none" />
    </g>
  );
}

function Creature({ id }: { id: string }) {
  switch (id) {
    case "papilume":
      return (
        <g>
          <g stroke="#701a75" strokeWidth="1.5">
            <path d="M-4 6c-20 4-34 18-30 30 6 10 24 2 32-20z" fill="url(#wingB)" />
            <path d="M4 6c20 4 34 18 30 30-6 10-24 2-32-20z" fill="url(#wingB)" />
            <path d="M-4 -2c-14-26-44-38-54-24-10 16 10 40 52 30z" fill="url(#wingA)" />
            <path d="M4 -2c14-26 44-38 54-24 10 16-10 40-52 30z" fill="url(#wingA)" />
          </g>
          <rect x="-6" y="-4" width="12" height="34" rx="6" fill="#a78bfa" stroke="#4c1d95" strokeWidth="1.5" />
          <g stroke="#4c1d95" strokeWidth="1.5" fill="none">
            <path d="M-4 -18c-4-10-10-14-16-14" />
            <path d="M4 -18c4-10 10-14 16-14" />
          </g>
          <circle cx="-20" cy="-32" r="3.5" fill="#fde047" stroke="#4c1d95" strokeWidth="1.2" />
          <circle cx="20" cy="-32" r="3.5" fill="#fde047" stroke="#4c1d95" strokeWidth="1.2" />
          <circle cx="0" cy="-10" r="12" fill="#c4b5fd" stroke="#4c1d95" strokeWidth="1.5" />
          <Face y={-11} />
        </g>
      );
    case "flameche":
      return (
        <g stroke="#7c2d12" strokeWidth="1.5">
          <path d="M18 18c16-2 24-16 18-34-2 8-8 10-10 6 2 10-4 16-8 12z" fill="#fde047" />
          <ellipse cx="0" cy="16" rx="22" ry="17" fill="#fb923c" />
          <ellipse cx="0" cy="20" rx="12" ry="10" fill="#ffedd5" stroke="none" />
          <path d="M-13 -20-18-38-3-26z" fill="#fb923c" />
          <path d="M13 -20 18-38 3-26z" fill="#fb923c" />
          <circle cx="0" cy="-12" r="15" fill="#fb923c" />
          <g stroke="none"><Face y={-13} gap={5} /></g>
        </g>
      );
    case "goutelot":
      return (
        <g>
          <ellipse cx="-14" cy="34" rx="7" ry="4" fill="#3b82f6" />
          <ellipse cx="14" cy="34" rx="7" ry="4" fill="#3b82f6" />
          <path d="M0 -38c16 22 26 34 26 46a26 26 0 0 1-52 0c0-12 10-24 26-46z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.5" />
          <ellipse cx="-11" cy="-4" rx="4" ry="8" fill="#fff" opacity="0.6" transform="rotate(25 -11 -4)" />
          <Face y={8} gap={6} />
        </g>
      );
    case "voltouille":
      return (
        <g stroke="#713f12" strokeWidth="1.5">
          <path d="M22 14 34 4 30 14 42 8 30 26z" fill="#facc15" />
          <path d="M-14 -16-24-44-12-30-8-42-4-20z" fill="#facc15" />
          <path d="M14 -16 24-44 12-30 8-42 4-20z" fill="#facc15" />
          <circle cx="0" cy="4" r="26" fill="#fde047" />
          <g stroke="none">
            <Face y={-2} gap={7} />
            <circle cx="-15" cy="6" r="4.5" fill="#ef4444" />
            <circle cx="15" cy="6" r="4.5" fill="#ef4444" />
          </g>
        </g>
      );
    default:
      return (
        <g>
          <circle cx="0" cy="0" r="40" fill="url(#glow)" />
          <path d="M-24 26V0a24 24 0 0 1 48 0v26l-8-6-8 6-8-6-8 6-8-6z" fill="#e9dcff" stroke="#3b2363" strokeWidth="1.5" opacity="0.95" />
          <path d="M-24 6c-10 0-14 8-12 12 4-4 8-4 12-2zM24 6c10 0 14 8 12 12-4-4-8-4-12-2z" fill="#e9dcff" stroke="#3b2363" strokeWidth="1.5" />
          <Face y={-2} gap={6} />
        </g>
      );
  }
}

function Art({ c }: { c: Creature }) {
  const [s1, s2, g1, g2] = SCENE[c.type];
  return (
    <svg viewBox="0 0 240 132" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${c.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s1} />
          <stop offset="1" stopColor={s2} />
        </linearGradient>
        <radialGradient id="wingA" cx="0.3" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#fff3fb" />
          <stop offset="0.5" stopColor="#f9a8d4" />
          <stop offset="1" stopColor="#c026d3" />
        </radialGradient>
        <radialGradient id="wingB" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ecfeff" />
          <stop offset="0.6" stopColor="#5eead4" />
          <stop offset="1" stopColor="#0d9488" />
        </radialGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#f0abfc" stopOpacity="0.7" />
          <stop offset="1" stopColor="#f0abfc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="240" height="132" fill={`url(#sky-${c.id})`} />
      <circle cx="200" cy="26" r="14" fill={c.type === "psy" ? "#f5f3ff" : "#fff7c2"} />
      <path d="M0 108c40-18 80-14 120-4s80 10 120-6v34H0z" fill={g1} />
      <path d="M0 120c50-12 90-6 130 0s80 4 110-6v18H0z" fill={g2} />
      <g transform="translate(120 64)">
        <Creature id={c.id} />
      </g>
    </svg>
  );
}

/* La carte, dessinée à 260 px de large. Le carrousel la réduit
   avec un scale plutôt que de redessiner chaque taille de texte. */
export function PokeCard({ c }: { c: Creature }) {
  return (
    <article className="pk" data-type={c.type} aria-label={`Carte ${c.name}`}>
      <div className="pk-face">
        <header className="pk-head">
          <span className="pk-stage">DE BASE</span>
          <h2 className="pk-name">{c.name}</h2>
          <span className="pk-hp">
            <small>PV</small>
            {c.hp}
          </span>
          <Energy kind={c.type} />
        </header>

        <div className="pk-art">
          <Art c={c} />
        </div>
        <p className="pk-dex">{c.dex}</p>

        <section className="pk-moves">
          {c.moves.map((m) => (
            <div className="pk-move" key={m.name}>
              <span className="pk-cost">
                {m.cost.map((k, i) => (
                  <Energy kind={k} key={i} />
                ))}
              </span>
              <strong>{m.name}</strong>
              <span className="pk-dmg">{m.dmg}</span>
              {m.text && <p>{m.text}</p>}
            </div>
          ))}
        </section>

        <footer className="pk-foot">
          <dl className="pk-stats">
            <div>
              <dt>faiblesse</dt>
              <dd>
                <Energy kind={c.weakness} /> ×2
              </dd>
            </div>
            <div>
              <dt>résistance</dt>
              <dd>—</dd>
            </div>
            <div>
              <dt>retraite</dt>
              <dd>
                {Array.from({ length: c.retreat }, (_, i) => (
                  <Energy kind="any" key={i} />
                ))}
              </dd>
            </div>
          </dl>
          <p className="pk-flavor">{c.flavor}</p>
          <p className="pk-meta">
            <span>Illus. Mael</span>
            <span>{c.number} ●</span>
          </p>
        </footer>
      </div>
    </article>
  );
}
