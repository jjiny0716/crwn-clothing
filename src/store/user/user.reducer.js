import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
  currnetUser: null,
};

// 초기 상태를 넣어줘야 함
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload,
      };
    default:
      // action이 해당 reducer에 해당하지 않는다면, 상태는 바뀌지 않는다.
      return state;
  }
};
