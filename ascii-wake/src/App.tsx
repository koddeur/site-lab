import { AsciiWake } from "./AsciiWake";
import "./AsciiWake.css";

function App() {
  return (
    <main>
      <AsciiWake glyphs="Classic" size={10} reach={60} trail={1.2} pull={40} />
      <p>Survole le cube, clique pour lancer une onde.</p>
    </main>
  );
}

export default App;
