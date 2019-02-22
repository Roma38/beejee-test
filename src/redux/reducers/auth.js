import { LOG_IN } from "../actions/auth";

const initialState = {
  loggedIn: true
};

export const authReducer = (state = initialState, { type }) => {
  switch (type) {
    case LOG_IN:
      return { ...state, loggedIn: true };

    default:
      return state;
  }
};
