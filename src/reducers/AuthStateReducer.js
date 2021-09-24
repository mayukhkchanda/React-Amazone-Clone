import { SIGNIN, SIGNOUT } from "../actions/type";

const INIT_STATE =  false;

export const authStateReducer = (state = INIT_STATE, action) =>{
    switch (action.type) {
      case SIGNIN:  return true;
      case SIGNOUT: return false;
      default: return state;
    }
};