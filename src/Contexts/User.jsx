import { createContext, useEffect, useReducer } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../util/firebase/firebase";

import { createAction } from "../util/reducer/reducer.util";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = Object.freeze({
  SET_CURRENT_USER: Symbol("setCurrentUser"),
});

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type of action ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currnetUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
