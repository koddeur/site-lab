import { useEffect, useRef, useState, type FormEvent } from "react";
import { TodoTower, type Todo } from "./TodoTower";

/* la scène est dimensionnée pour ce nombre de briques (voir .tower-stage) */
const MAX = 12;
const KEY = "todo-tower:v1";

const SEED = ["Arroser les plantes", "Répondre à Nadia", "Renouveler le domaine"];

type Saved = { todos: Todo[]; next: number };

/* le stockage peut être absent (navigation privée) : la page marche sans */
function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw) as Saved;
      if (Array.isArray(s.todos) && Number.isInteger(s.next)) return s;
    }
  } catch {
    /* ignoré : on repart des exemples */
  }
  return { todos: SEED.map((text, id) => ({ id, text })), next: SEED.length };
}

export default function App() {
  const [saved, setSaved] = useState(load);
  const [draft, setDraft] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const { todos } = saved;
  const full = todos.length >= MAX;

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
    setSaved((s) => ({ todos: [...s.todos, { id: s.next, text }], next: s.next + 1 }));
    setDraft("");
    input.current?.focus();
  };

  const done = (id: number) => setSaved((s) => ({ ...s, todos: s.todos.filter((t) => t.id !== id) }));

  return (
    <main className="page">
      <header className="top">
        <h1 className="title">Todo tower</h1>
        <p className="count" aria-live="polite">
          <span className="count-n">{todos.length}</span> / {MAX} briques
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
          placeholder={full ? "La pile est pleine" : "Une tâche à empiler…"}
          maxLength={48}
          autoComplete="off"
          disabled={full}
        />
        <button className="add-btn" type="submit" disabled={full || !draft.trim()}>
          Empiler
        </button>
      </form>
      {full && <p className="note">Douze briques, c'est le plafond. Termine une tâche pour en ajouter une.</p>}

      <section className="tower-stage" data-stroke="on" aria-label="Pile de tâches">
        {todos.length === 0 && (
          <p className="empty">Rien sur le chantier. Ajoute une tâche pour poser la première brique.</p>
        )}
        <div className="tower-anchor">
          <TodoTower todos={todos} onDone={done} />
        </div>
      </section>

      <p className="hint">Coche une brique pour la terminer. Attrape-la pour la déplacer ou la lancer.</p>
    </main>
  );
}
