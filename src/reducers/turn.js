import {TURN_ENDED} from "../constants/actionTypes";
import {BLACK, WHITE} from "../constants/index";

export const turn = (state = WHITE, action) => {
  switch (action.type) {
      case TURN_ENDED:
          if(action.selected){
            return state === WHITE ? BLACK : WHITE;
          }
          else{
              return state
          }
    default:
      return state
  }
};
