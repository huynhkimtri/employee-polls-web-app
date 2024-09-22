import { ADD_POLL, FETCH_POLLS, VOTE_POLL } from "../utils/constants";

const initialState = {
  answered: [],
  unanswered: [],
};

const pollsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POLLS:
      return {
        ...state,
        polls: action.payload.polls,
        unanswered: action.payload.polls.filter(
          (poll) => !poll.answeredBy.includes(action.payload.currentUserId)
        ),
        answered: action.payload.polls.filter((poll) =>
          poll.answeredBy.includes(action.payload.currentUserId)
        ),
      };
    case ADD_POLL:
      return {
        ...state,
        unanswered: [action.payload, ...state.unanswered],
      };
    case VOTE_POLL:
      const { pollId, selectedOption } = action.payload;
      const updatedUnanswered = state.unanswered.filter(
        (poll) => poll.id !== pollId
      );
      const votedPoll = state.unanswered.find((poll) => poll.id === pollId);
      // Assuming answeredBy is an array of user IDs
      votedPoll.answeredBy.push(selectedOption);
      return {
        ...state,
        unanswered: updatedUnanswered,
        answered: [votedPoll, ...state.answered],
      };
    default:
      return state;
  }
};

export default pollsReducer;
