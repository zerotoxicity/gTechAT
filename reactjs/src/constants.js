export const BACKEND_URL = 'http://localhost:8080/api/';
export const WEBSOCKET_URL = 'ws://localhost:8080/ws';

export const NEW_GAME_BODY = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({}),
};

export const GET_GAME_BODY = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({}),
};

export const JOIN_GAME_BODY = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({}),
};
export const errorAudio = new Audio('/error.mp3');

export const TEXT_COLOR = { color: 'green.200' };
