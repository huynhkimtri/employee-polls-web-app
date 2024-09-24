import {
  ADD_USER,
  RECEIVE_USERS,
  UPDATE_USER_ANSWERS,
  UPDATE_USER_POLLS,
} from "../utils/constants";

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const updateUserPolls = (userId, questionId) => ({
  type: UPDATE_USER_POLLS,
  payload: { userId, questionId },
});

export const updateUserAnswers = (userId, questionId, answer) => ({
  type: UPDATE_USER_ANSWERS,
  payload: {
    userId,
    questionId,
    answer
  },
});
