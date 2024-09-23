import { _getQuestions, _getUsers, _saveQuestion } from "./_DATA";

export const getInitData = async () => {
  const questions = await _getQuestions();
  const users = await _getUsers();
  return {
    polls: Object.keys(questions).map((qId) => questions[qId]).map((p) => {
      return { ...p, answeredBy: [...p.optionOne.votes, ...p.optionTwo.votes] }
    }).sort((a, b) => b.timestamp - a.timestamp),
    users: Object.keys(users).map((userId) => users[userId]).map(({ password, ...rest }) => rest),
  };
  // const [questions, users] = await Promise.all([_getQuestions, _getUsers]);
  // console.log(questions);
  // console.log(users);
  // return {
  //   questions: Object.keys(questions).map((qId) => questions[qId]),
  //   users: Object.keys(users).map((userId) => users[userId]).map(({ password, ...rest }) => rest),
  // };
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
