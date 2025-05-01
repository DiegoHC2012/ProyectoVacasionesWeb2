import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VoteContext } from '../context/VoteContext';
import "../styles/episodedetail.css";

function EpisodeDetail() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const { state, dispatch } = useContext(VoteContext);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then(res => res.json())
      .then(data => {
        setEpisode(data);

        const characterUrls = [
          ...data.characters.slice(0, 2),
          ...data.characters.slice(-2)
        ];

        Promise.all(characterUrls.map(url => fetch(url).then(res => res.json())))
          .then(results => {
            Promise.all(results.map(char => 
              fetch(char.episode[0])
                .then(res => res.json())
                .then(firstEp => ({ ...char, firstSeen: firstEp.name }))
            )).then(updated => setCharacters(updated));
          });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleLikeCharacter = (id) => {
    dispatch({ type: 'LIKE_CHARACTER', payload: id });
  };

  const handleDislikeCharacter = (id) => {
    dispatch({ type: 'DISLIKE_CHARACTER', payload: id });
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

  if (!episode) {
    return <div className="container">Cargando episodio...</div>;
  }

  return (
    <div className="container">
      <h1 className="episode-title">{episode.name}</h1>
      <p><strong>Fecha de emisión:</strong> {episode.air_date}</p>
      <p><strong>Episodio:</strong> {episode.episode}</p>

      <h2 className="section-title">Personajes destacados</h2>
      <div className="character-grid">
        {characters.map(character => (
          <div key={character.id} className="character-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ flex: 1 }}>
              <h3>{character.name}</h3>
              <p>{getStatusIcon(character.status, character.species)}</p>
              <div className="buttons" style={{ margin: '0.5rem 0' }}>
                <button onClick={() => handleLikeCharacter(character.id)}>Like</button>
                <button onClick={() => handleDislikeCharacter(character.id)} style={{ marginLeft: '0.5rem' }}>No Like</button>
              </div>
              <Link to={`/character/${character.id}`}>
                <button>Ver Personaje</button>
              </Link>
            </div>
            <img 
              src={character.image} 
              alt={character.name} 
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EpisodeDetail;
