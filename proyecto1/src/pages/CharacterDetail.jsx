import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => setCharacter(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!character) {
    return <div className="container" style={{ textAlign: 'center' }}>Cargando personaje...</div>;
  }

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <div className="card" style={{ margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1rem' }}>{character.name}</h1>

        <img
          src={character.image}
          alt={character.name}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
        />

        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Type:</strong> {character.type || 'N/A'}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Origin:</strong> {character.origin?.name}</p>

        <Link to="/" style={{ display: 'inline-block', marginTop: '1rem' }}>
          <button>Regresar al Inicio</button>
        </Link>
      </div>
    </div>
  );
}

export default CharacterDetail;
