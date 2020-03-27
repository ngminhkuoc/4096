import { NEW_GAME, MOVE, KEEP_PLAYING, LOAD_GAME } from "../constants/action-types";

export const loadGame = () => ({
  type: LOAD_GAME,
  payload: null
});

export const newGame = () => ({
  type: NEW_GAME,
  payload: null
});

export const move = (keyCode) => ({
  type: MOVE,
  payload: {
    keyCode: keyCode
  }
});

export const keepPlaying = () => ({
  type: KEEP_PLAYING,
  payload: null
});