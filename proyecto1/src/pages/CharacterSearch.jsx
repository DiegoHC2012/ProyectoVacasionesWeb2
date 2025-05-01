import { useState } from 'react';
import { Link } from 'react-router-dom';

function CharacterSearch() {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });
  const [characters, setCharacters] = useState([]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = Object.keys(filters)
      .filter(key => filters[key])
      .map(key => `${key}=${filters[key]}`)
      .join('&');

    fetch(`https://rickandmortyapi.com/api/character/?${query}`)
      .then(res => res.json())
      .then(data => setCharacters(data.results || []))
      .catch(err => console.error(err));
  };

  const getStatusIcon = (status, species) => {
    let icon;
    switch (status.toLowerCase()) {
      case 'alive': icon = '🟢 Alive'; break;
      case 'dead': icon = '🔴 Dead'; break;
      default: icon = '⚪ Unknown';
    }
    return `${icon} - ${species}`;
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Buscar Personajes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="text" name="name" placeholder="Nombre" value={filters.name} onChange={handleChange} style={{ marginRight: '0.5rem' }} />
        <select name="status" value={filters.status} onChange={handleChange} style={{ marginRight: '0.5rem' }}>
          <option value="">Estado</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <input type="text" name="species" placeholder="Especie" value={filters.species} onChange={handleChange} style={{ marginRight: '0.5rem' }} />
        <input type="text" name="type" placeholder="Tipo" value={filters.type} onChange={handleChange} style={{ marginRight: '0.5rem' }} />
        <select name="gender" value={filters.gender} onChange={handleChange} style={{ marginRight: '0.5rem' }}>
          <option value="">Género</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <button type="submit">Buscar</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {characters.map(character => (
          <div key={character.id} style={{ display: 'flex', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px', alignItems: 'center' }}>
            <img src={character.image} alt={character.name} style={{ width: '120px', borderRadius: '8px', marginRight: '1rem' }} />
            <div style={{ flex: 1 }}>
              <h4>{character.name}</h4>
              <p>{getStatusIcon(character.status, character.species)}</p>
              <p><strong>Location:</strong><br />{character.location?.name}</p>
              <Link to={`/character/${character.id}`}>
                <button style={{ marginTop: '0.5rem' }}>Ver Detalles</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterSearch;
