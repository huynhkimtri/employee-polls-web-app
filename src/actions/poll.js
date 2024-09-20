import { ADD_POLL, FETCH_POLLS, VOTE_POLL } from "../utils/constants";

// Action to fetch polls
export const fetchPolls = (polls) => {
  return {
    type: FETCH_POLLS,
    payload: polls,
  };
};

// Action to add a new poll
export const addPoll = (poll) => {
  return {
    type: ADD_POLL,
    payload: poll,
  };
};

// Action to vote on a poll
export const votePoll = (pollId, selectedOption) => {
  return {
    type: VOTE_POLL,
    payload: { pollId, selectedOption },
  };
};
