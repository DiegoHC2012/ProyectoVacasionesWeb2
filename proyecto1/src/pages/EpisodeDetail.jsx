import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { VoteContext } from '../context/VoteContext';
import { Link } from 'react-router-dom';

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
          .then(results => setCharacters(results));
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleLikeCharacter = (id) => {
    dispatch({ type: 'LIKE_CHARACTER', payload: id });
  };
  
  const handleDislikeCharacter = (id) => {
    dispatch({ type: 'DISLIKE_CHARACTER', payload: id });
  };
  

  if (!episode) {
    return <div>Cargando episodio...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{episode.name}</h1>
      <p><strong>Fecha de emisión:</strong> {episode.air_date}</p>
      <p><strong>Episodio:</strong> {episode.episode}</p>

      <h2>Personajes destacados</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {characters.map(character => (
          <div key={character.id} className="card">
          <img src={character.image} alt={character.name} style={{ width: '100%' }} />
          <h4>{character.name}</h4>
          <p><strong>Status:</strong> {character.status}</p>
        
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={() => handleLikeCharacter(character.id)}>Like Personaje</button>
            <button onClick={() => handleDislikeCharacter(character.id)} style={{ marginLeft: '0.5rem' }}>No Like Personaje</button>
          </div>
        
          <p><strong>Votos:</strong> {state.characters[character.id] || 0}</p>
        
          <Link to={`/character/${character.id}`}>
            <button style={{ marginTop: '0.5rem' }}>Ver Personaje</button>
          </Link>
        </div>        
        ))}
      </div>
    </div>
  );
}

export default EpisodeDetail;
