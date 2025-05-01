import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VoteContext } from '../context/VoteContext';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const { state, dispatch } = useContext(VoteContext);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => {
        setCharacter(data);
        Promise.all(data.episode.map(url => fetch(url).then(res => res.json())))
          .then(results => setEpisodes(results.map(ep => ep.name)));
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleLike = () => {
    dispatch({ type: 'LIKE_CHARACTER', payload: character.id });
  };

  const handleDislike = () => {
    dispatch({ type: 'DISLIKE_CHARACTER', payload: character.id });
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

  if (!character) return <div className="container">Cargando personaje...</div>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
        <img
          src={character.image}
          alt={character.name}
          style={{ width: '300px', borderRadius: '8px' }}
        />

        <div style={{ flex: 1 }}>
          <h1>{character.name}</h1>
          <p>{getStatusIcon(character.status, character.species)}</p>
          <p><strong>Last known location:</strong><br />{character.location?.name}</p>
          <p><strong>First seen in:</strong><br />{episodes[0]}</p>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDislike} style={{ marginLeft: '0.5rem' }}>No Like</button>
          </div>
          <p><strong>Votos:</strong> {state.characters[character.id] || 0}</p>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3>Aparece en los siguientes episodios:</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {episodes.map((ep, index) => (
            <div key={index} style={{
              padding: '1rem',
              backgroundColor: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              {ep}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/">
          <button>Regresar al Inicio</button>
        </Link>
      </div>
    </div>
  );
}

export default CharacterDetail;
