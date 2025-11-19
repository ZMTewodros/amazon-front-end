import { ADD_TO_BASKET, EMPTY_BASKET } from "./action.type";
import { SET_USER } from "../utility/action.type";


export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
     case  EMPTY_BASKET:
     return {
      ...state,
       basket:[]
     }

    case SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
