import { NEW_GAME, MOVE, KEEP_PLAYING } from "../constants/action-types";


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
