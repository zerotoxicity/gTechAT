export const BACKEND_URL = 'http://127.0.0.1:8080/api/';
export const FRONTEND_URL = 'http://localhost:3000/';

export const NEW_GAME_BODY = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({}),
};

export const JOIN_GAME_BODY = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({}),
};

export const TEXT_COLOR = { color: 'green.200' };
