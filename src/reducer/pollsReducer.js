import {
  ADD_POLL,
  FETCH_POLLS,
  OPT_ONE,
  OPT_TWO,
  VOTE_POLL,
} from "../utils/constants";

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
      };
    case ADD_POLL:
      state.polls[action.payload.id] = action.payload;
      return {
        ...state,
        polls: state.polls,
      };
    case VOTE_POLL:
      const { pollId, selectedOption, userId } = action.payload;
      const votedPoll = state.polls[pollId];
      if (selectedOption === OPT_ONE) {
        votedPoll.optionOne.votes.push(userId);
      }
      if (selectedOption === OPT_TWO) {
        votedPoll.optionTwo.votes.push(userId);
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default pollsReducer;
