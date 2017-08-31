import {PIECE_MOVED} from "../constants/actionTypes";

export const turn = (state = 'W', action) => {
  switch (action.type) {
    case PIECE_MOVED:
      if (state === 'W') {
        return 'B'
      } else {
        return 'W'
      }
    default:
      return state
  }
};
