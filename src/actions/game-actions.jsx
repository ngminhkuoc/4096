import { NEW_GAME, MOVE } from "../constants/action-types";


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
