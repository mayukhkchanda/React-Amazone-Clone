import { SIGNIN, SIGNOUT } from "../actions/type";
const INIT_STATE = {};

export const userMetaReducer = (state = INIT_STATE, action) => {

    switch (action.type) {
        case SIGNIN: return action.payload;
        case SIGNOUT: return INIT_STATE;
        default: return state;
    }
};
