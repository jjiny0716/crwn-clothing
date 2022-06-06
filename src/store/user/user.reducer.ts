import { AnyAction } from "redux";
import { UserData } from "../../util/firebase/firebase";
import { signInSuccess, signOutSuccess, signOutFailed, signInFailed, signUpFailed } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// 초기 상태를 넣어줘야 함
export const userReducer = (state = INITIAL_STATE, action = {} as AnyAction): UserState => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  return state;
};
