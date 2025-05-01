import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EpisodeDetail from "./pages/EpisodeDetail";
import CharacterSearch from "./pages/CharacterSearch";
import StaticPage from "./pages/StaticPage";
import CharacterDetail from "./pages/CharacterDetail"; // 👈 Importa CharacterDetail

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episode/:id" element={<EpisodeDetail />} />
        <Route path="/search" element={<CharacterSearch />} />
        <Route path="/static" element={<StaticPage />} />
        <Route path="/character/:id" element={<CharacterDetail />} /> {/* 👈 Nueva ruta */}
      </Routes>
    </div>
  );
}

export default App;
