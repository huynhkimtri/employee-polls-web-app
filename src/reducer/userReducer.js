import {
  ADD_USER,
  RECEIVE_USERS,
  UPDATE_USER_ANSWERS,
  UPDATE_USER_POLLS,
} from "../utils/constants";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        users: action.users,
      };
    case ADD_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.user.id]: action.user,
        },
      };
    case UPDATE_USER_POLLS:
      const { userId, questionId } = action.payload;
      const user = state.users[userId];
      console.log("🚀 ~ userReducer ~ user:", user);
      user.questions.push(questionId);
      return {
        ...state,
      };
    case UPDATE_USER_ANSWERS:
      const currentUser = state.users[action.payload.userId];
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: {
            ...currentUser,
            answers: {
              ...currentUser.answers,
              [action.payload.questionId]: action.payload.answer,
            },
          },
        },
      };
    default:
      return state;
  }
};

export default userReducer;
