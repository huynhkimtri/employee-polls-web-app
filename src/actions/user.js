import {
  ADD_USER,
  RECEIVE_USERS,
  UPDATE_USER_ANSWERS,
} from "../utils/constants";

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const updateUserAnswers = (userId, questionId, answer) => ({
  type: UPDATE_USER_ANSWERS,
  userId,
  questionId,
  answer,
});
