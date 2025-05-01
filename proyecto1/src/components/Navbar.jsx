import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: 'rgb(60, 54, 146)', color: 'rgb(75, 235, 142)' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Index</Link>
      <Link to="/static" style={{ marginRight: '1rem' }}>Estática</Link>
      <Link to="/search" style={{ marginRight: '1rem' }}>Búsqueda de Personaje</Link>
    </nav>
  );
}

export default Navbar;
