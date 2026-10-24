import { useEffect, useRef, useState, type FormEvent } from "react";
import { Trash2 } from "lucide-react";
import { TodoTower } from "./TodoTower";

/* ── combien de briques tiennent ──────────────────────────
   La scène prend la hauteur qui reste à l'écran, donc le
   plafond suit : une brique fait 46px, et on garde l'élan d'une
   brique qu'on lâche (70px) plus la marge des murs. Jamais plus
   de 12, jamais moins de 3. */
const MAX = 12;
const BRICK = 46;
const HEADROOM = 90;
const capOf = (h: number) => Math.max(3, Math.min(MAX, Math.floor((h - HEADROOM) / BRICK)));
const KEY = "todo-tower:v1";

const SEED = ["Arroser les plantes", "Répondre à Nadia", "Renouveler le domaine"];

/* `at` : ajoutée le ; `doneAt` : terminée le (ms) */
type Task = { id: number; text: string; at: number };
type Done = Task & { doneAt: number };
type Saved = { todos: Task[]; done: Done[]; next: number };

/* le stockage peut être absent (navigation privée) : la page marche sans.
   Une sauvegarde d'avant le tableau n'a ni `done` ni `at` : on complète. */
function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw) as Partial<Saved>;
      if (Array.isArray(s.todos) && Number.isInteger(s.next)) {
        return {
          todos: s.todos.map((t) => ({ ...t, at: t.at ?? Date.now() })),
          done: Array.isArray(s.done) ? s.done : [],
          next: s.next!,
        };
      }
    }
  } catch {
    /* ignoré : on repart des exemples */
  }
  const now = Date.now();
  return { todos: SEED.map((text, id) => ({ id, text, at: now })), done: [], next: SEED.length };
}

const when = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default function App() {
  const [saved, setSaved] = useState(load);
  const [draft, setDraft] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const stage = useRef<HTMLElement>(null);
  const [cap, setCap] = useState(MAX);
  const [order, setOrder] = useState(0);
  const { todos, done } = saved;
  const full = todos.length >= cap;

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCap(capOf(el.clientHeight)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {
      /* ignoré */
    }
  }, [saved]);

  const add = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || full) return;
    setSaved((s) => ({ ...s, todos: [...s.todos, { id: s.next, text, at: Date.now() }], next: s.next + 1 }));
    setDraft("");
    input.current?.focus();
  };

  const finish = (id: number) =>
    setSaved((s) => {
      const t = s.todos.find((x) => x.id === id);
      if (!t) return s;
      return { ...s, todos: s.todos.filter((x) => x.id !== id), done: [{ ...t, doneAt: Date.now() }, ...s.done] };
    });

  /* une tâche à faire supprimée quitte aussi la pile ; une terminée, seulement le relevé */
  const drop = (id: number) =>
    setSaved((s) => ({ ...s, todos: s.todos.filter((x) => x.id !== id), done: s.done.filter((x) => x.id !== id) }));

  const del = (t: Task) => (
    <td className="log-del">
      <button type="button" className="del-btn" onClick={() => drop(t.id)} aria-label={`Supprimer : ${t.text}`} title="Supprimer">
        <Trash2 size={16} strokeWidth={1.75} />
      </button>
    </td>
  );

  return (
    <main>
      <div className="screen">
        <header className="top">
          <h1 className="title">
            {/* le favicon, en couleurs du thème : encre pour la pile, jaune pour la brique qu'on pose */}
            <svg className="logo" viewBox="0 0 32 32" aria-hidden="true">
              <rect x="6" y="20" width="20" height="8" rx="2" fill="currentColor" />
              <rect x="4" y="11" width="20" height="8" rx="2" fill="currentColor" transform="rotate(-4 14 15)" />
              <rect x="9" y="2" width="20" height="8" rx="2" fill="var(--hivis)" transform="rotate(6 19 6)" />
            </svg>
            TowerDo
          </h1>
          <p className="count" aria-live="polite">
            <span className="count-n">{todos.length}</span> / {cap} briques
          </p>
        </header>

        <form className="add" onSubmit={add}>
          <label className="sr-only" htmlFor="task">
            Nouvelle tâche
          </label>
          <input
            ref={input}
            id="task"
            className="add-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={full ? "La pile est pleine" : "Une tâche à ajouter…"}
            maxLength={48}
            autoComplete="off"
            disabled={full}
          />
          <button className="add-btn" type="submit" disabled={full || !draft.trim()}>
            Ajouter
          </button>
        </form>
        <section ref={stage} className="tower-stage" data-stroke="on" aria-label="Pile de tâches">
          <button
            type="button"
            className="restack"
            onClick={() => setOrder((n) => n + 1)}
            disabled={todos.length === 0}
          >
            Remettre en ordre
          </button>
          {todos.length === 0 && (
            <p className="empty">Rien sur le chantier. Ajoute une tâche pour poser la première brique.</p>
          )}
          <div className="tower-anchor">
            <TodoTower todos={todos} onDone={finish} order={order} />
          </div>
        </section>

        <p className="hint">
          {full
            ? "La pile touche le plafond. Termine une tâche pour en ajouter une."
            : "Coche une brique pour la terminer. Attrape-la pour la déplacer ou la lancer."}
        </p>
      </div>

      {/* ── le relevé ─────────────────────────────────────────
         Sous la tour, hors du premier écran : à faire d'abord,
         dans l'ordre de la pile, puis les terminées, la plus
         récente en haut. */}
      <section className="log" aria-labelledby="log-title">
        <h2 id="log-title" className="log-title">
          Relevé <span className="log-sum">{todos.length} à faire · {done.length} {done.length > 1 ? "terminées" : "terminée"}</span>
        </h2>
        {todos.length + done.length === 0 ? (
          <p className="log-empty">Aucune tâche pour l'instant.</p>
        ) : (
          <div className="log-wrap">
            <table className="log-table">
              <thead>
                <tr>
                  <th scope="col">Tâche</th>
                  <th scope="col">Statut</th>
                  <th scope="col">Date</th>
                  <th scope="col">
                    <span className="sr-only">Supprimer</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos.map((t) => (
                  <tr key={`t${t.id}`}>
                    <td>{t.text}</td>
                    <td>
                      <span className="tag" data-state="todo">À faire</span>
                    </td>
                    <td className="log-date">Ajoutée le {when.format(t.at)}</td>
                    {del(t)}
                  </tr>
                ))}
                {done.map((t) => (
                  <tr key={`d${t.id}`} data-done>
                    <td>{t.text}</td>
                    <td>
                      <span className="tag" data-state="done">Terminée</span>
                    </td>
                    <td className="log-date">Terminée le {when.format(t.doneAt)}</td>
                    {del(t)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
