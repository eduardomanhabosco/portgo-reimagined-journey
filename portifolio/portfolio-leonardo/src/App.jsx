
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Habilidades from './pages/Habilidades';
import Projetos from './pages/Projetos';
import Contato from './pages/Contato';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-900 text-white font-poppins">
        <header className="flex justify-between items-center px-10 py-6 bg-neutral-800">
          <h1 className="text-2xl font-bold">Leonardo Becker</h1>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-gray-300">Sobre</Link>
            <Link to="/habilidades" className="hover:text-gray-300">Habilidades</Link>
            <Link to="/projetos" className="hover:text-gray-300">Projetos</Link>
            <Link to="/contato" className="hover:text-gray-300">Contato</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habilidades" element={<Habilidades />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>

        <footer className="bg-neutral-800 text-center py-4 text-sm text-gray-400">
          © 2025 Leonardo Daniel Becker
        </footer>
      </div>
    </Router>
  );
}

export default App;
