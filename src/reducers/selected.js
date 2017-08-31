import * as actionTypes from "../constants/actionTypes";
import {combineReducers} from "redux";

const placement = (state = '', action) => {
  switch (action.type) {
    case actionTypes.CHANGED_SELECTED_PIECE:
      return action.placement;
    default:
      return state
  }
};

const pieceType = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CHANGED_SELECTED_PIECE:
      return action.pieceType;
    default:
      return state
  }
};

export const selected = combineReducers({placement, pieceType});
