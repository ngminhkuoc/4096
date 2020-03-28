import { NEW_GAME, MOVE, KEEP_PLAYING, LOAD_GAME } from "../constants/action-types";

export const loadGame = () => ({
  type: LOAD_GAME,
  payload: null
});

export const newGame = () => ({
  type: NEW_GAME,
  payload: null
});

export const move = (direction) => ({
  type: MOVE,
  payload: {
    direction: direction
  }
});

export const keepPlaying = () => ({
  type: KEEP_PLAYING,
  payload: null
});