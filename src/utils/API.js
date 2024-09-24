import { _getQuestions, _getUsers, _saveQuestion } from "./_DATA";

export const getInitData = async () => {
  const questions = await _getQuestions();
  const users = await _getUsers();
  return {
    questions,
    users
  };
};

export const saveQuestion = async (question) => _saveQuestion(question);

export const loginWithUsernamePassword = async (username, passsword) => {
  const users = await _getUsers();
  const user = users[username];

  if (user && user.password === passsword) {
    const { password, ...rest } = user;
    return rest;
  }

  return null;
};
