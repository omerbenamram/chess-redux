import * as actionTypes from "../constants/actionTypes";
import {keys} from 'lodash'
export const selected = (state, action) => {
  switch (action.type) {
    case actionTypes.SELECTED_PIECE:
      if(action.placement in state) {
        return {[action.placement]: {...state[action.placement], selected: true}};
      }
      else{
          //only way i know how to accsess the keys dynamically right now is withs keys and then the first place.
          let piece = {...state[keys(state)[0]], selected:false};
          let nextState =  {[keys(state)[0]]: piece};
          return nextState;
      }
      case actionTypes.PIECE_TRY_EAT:
      case actionTypes.PIECE_MOVED:
          //modifies state to just a piece with no placement
          let nextState =  {...state[keys(state)[0]], selected:false};
          return nextState;

    default:
      return state
  }
};