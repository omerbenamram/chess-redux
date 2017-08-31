import * as actionTypes from "../constants/actionTypes";
import {combineReducers} from "redux";

const move = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CHANGED_SELECTED_PIECE:
      return state;
    default:
      return state
  }
};

const eat = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CHANGED_SELECTED_PIECE:
      return state;
    default:
      return state
  }
};

export const paths = combineReducers({move, eat});
