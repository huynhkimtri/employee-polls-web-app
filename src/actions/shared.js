import { getInitData } from "../utils/API";
import { fetchPolls } from "./poll";
import { receiveUsers } from "./user";

export const handleInitialData = (currentUserId) => {
  return async (dispatch) => {
    const { questions, users } = await getInitData();
    dispatch(fetchPolls(questions, currentUserId));
    dispatch(receiveUsers(users));
  };
};
