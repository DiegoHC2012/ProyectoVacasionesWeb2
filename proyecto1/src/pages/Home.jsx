import { useEffect, useState, useContext } from 'react';
import { VoteContext } from '../context/VoteContext';
import { Link } from 'react-router-dom';

function Home() {
  const [episodes, setEpisodes] = useState([]);
  const { state, dispatch } = useContext(VoteContext);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then(res => res.json())
      .then(data => setEpisodes(data.results))
      .catch(err => console.error(err));
  }, []);

  const handleLike = (id) => {
    dispatch({ type: 'LIKE_EPISODE', payload: id });
  };

  const handleDislike = (id) => {
    dispatch({ type: 'DISLIKE_EPISODE', payload: id });
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Capítulos de Rick and Morty</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {episodes.length > 0 ? (
          episodes.map(episode => (
            <div key={episode.id} className="card">
              <h3>{episode.name}</h3>
              <p><strong>Fecha:</strong> {episode.air_date}</p>
              <p><strong>Episodio:</strong> {episode.episode}</p>

              <div style={{ marginTop: '1rem' }}>
                <button onClick={() => handleLike(episode.id)}>Like</button>
                <button onClick={() => handleDislike(episode.id)} style={{ marginLeft: '0.5rem' }}>No Like</button>
              </div>

              <p style={{ marginTop: '0.5rem' }}>
                <strong>Votos:</strong> {state.episodes[episode.id] || 0}
              </p>

              <Link to={`/episode/${episode.id}`}>
                <button style={{ marginTop: '0.5rem' }}>Ver Detalle</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Cargando capítulos...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
