import { useEffect, useState } from 'react';

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

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Buscar Personajes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={filters.name}
          onChange={handleChange}
          style={{ marginRight: '0.5rem' }}
        />

        <select name="status" value={filters.status} onChange={handleChange} style={{ marginRight: '0.5rem' }}>
          <option value="">Estado</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <input
          type="text"
          name="species"
          placeholder="Especie"
          value={filters.species}
          onChange={handleChange}
          style={{ marginRight: '0.5rem' }}
        />

        <input
          type="text"
          name="type"
          placeholder="Tipo"
          value={filters.type}
          onChange={handleChange}
          style={{ marginRight: '0.5rem' }}
        />

        <select name="gender" value={filters.gender} onChange={handleChange} style={{ marginRight: '0.5rem' }}>
          <option value="">Género</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <button type="submit">Buscar</button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {characters.map(character => (
          <div key={character.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
            <img src={character.image} alt={character.name} style={{ width: '100%' }} />
            <h4>{character.name}</h4>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterSearch;
