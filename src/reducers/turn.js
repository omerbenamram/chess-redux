import {SWITCH_TURN} from "../constants/actionTypes";
import {BLACK, WHITE} from "../constants/index";

export const turn = (state = WHITE, action) => {
  switch (action.type) {
      case SWITCH_TURN:
        if(action.isSelected){
          return state === WHITE ? state : BLACK;
          }
          else return state;
    default:
      return state
  }
};
