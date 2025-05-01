export const initialState = JSON.parse(localStorage.getItem('votes')) || {
  episodes: {},
  characters: {}
};

export function voteReducer(state, action) {
  let newState;

  switch (action.type) {
    case 'LIKE_EPISODE':
      newState = {
        ...state,
        episodes: {
          ...state.episodes,
          [action.payload]: (state.episodes[action.payload] || 0) + 1
        }
      };
      break;

    case 'DISLIKE_EPISODE':
      newState = {
        ...state,
        episodes: {
          ...state.episodes,
          [action.payload]: (state.episodes[action.payload] || 0) - 1
        }
      };
      break;

    case 'LIKE_CHARACTER':
      newState = {
        ...state,
        characters: {
          ...state.characters,
          [action.payload]: (state.characters[action.payload] || 0) + 1
        }
      };
      break;

    case 'DISLIKE_CHARACTER': // 👈 AÑADIMOS ESTA ACCIÓN
      newState = {
        ...state,
        characters: {
          ...state.characters,
          [action.payload]: (state.characters[action.payload] || 0) - 1
        }
      };
      break;

    default:
      newState = state;
  }

  // Actualizar localStorage siempre
  localStorage.setItem('votes', JSON.stringify(newState));

  return newState;
}
