import { useState } from "react";
import { Carousel } from "./Carousel";
import { COLLECTION } from "./collection";

const eur = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const pct = new Intl.NumberFormat("fr-FR", { style: "percent", maximumFractionDigits: 1, signDisplay: "exceptZero" });

const total = COLLECTION.reduce((s, c) => s + c.value * c.qty, 0);
const spent = COLLECTION.reduce((s, c) => s + c.paid * c.qty, 0);
const copies = COLLECTION.reduce((s, c) => s + c.qty, 0);

function Delta({ now, then }: { now: number; then: number }) {
  const d = now - then;
  return (
    <span className="delta" data-sign={d > 0 ? "up" : d < 0 ? "down" : "flat"}>
      {d > 0 ? "▲" : d < 0 ? "▼" : "■"} {eur.format(Math.abs(d))} ({pct.format(then ? d / then : 0)})
    </span>
  );
}

function App() {
  const [front, setFront] = useState(0);
  const c = COLLECTION[front];

  return (
    <main className="shelf">
      <header className="shelf-head">
        <div>
          <p className="eyebrow">Classeur · Set de base</p>
          <h1>Ma collection</h1>
        </div>
        <dl className="totals">
          <div>
            <dt>Valeur estimée</dt>
            <dd className="big">{eur.format(total)}</dd>
          </div>
          <div>
            <dt>Investi</dt>
            <dd>{eur.format(spent)}</dd>
          </div>
          <div>
            <dt>Plus-value</dt>
            <dd>
              <Delta now={total} then={spent} />
            </dd>
          </div>
          <div>
            <dt>Cartes</dt>
            <dd>
              {COLLECTION.length} uniques · {copies} ex.
            </dd>
          </div>
        </dl>
      </header>

      <div className="shelf-body">
        <div className="stage">
          <Carousel corner={12} onFront={setFront} />
        </div>

        <aside className="sheet" aria-live="polite">
          <p className="sheet-num">
            {c.number} · <span className="rarity">{c.rarity}</span>
          </p>
          <h2>{c.name}</h2>

          <p className="sheet-value">{eur.format(c.value)}</p>
          <p className="sheet-sub">
            cote unitaire · <Delta now={c.value} then={c.paid} />
          </p>

          <dl className="sheet-grid">
            <div>
              <dt>État</dt>
              <dd>{c.condition}</dd>
            </div>
            <div>
              <dt>Gradation</dt>
              <dd>{c.grade}</dd>
            </div>
            <div>
              <dt>Payé</dt>
              <dd>{eur.format(c.paid)}</dd>
            </div>
            <div>
              <dt>Exemplaires</dt>
              <dd>× {c.qty}</dd>
            </div>
            <div>
              <dt>Acquise</dt>
              <dd>{c.acquired}</dd>
            </div>
            <div>
              <dt>Total ligne</dt>
              <dd>{eur.format(c.value * c.qty)}</dd>
            </div>
          </dl>

          <p className="hint">Glisse l'anneau ou utilise ← → pour feuilleter.</p>
        </aside>
      </div>
    </main>
  );
}

export default App;
