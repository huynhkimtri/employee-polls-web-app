import { getInitData } from "../utils/API";
import { fetchPolls } from "./poll";
import { receiveUsers } from "./user";

export const handleInitialData = (currentUserId) => {
    return async (dispatch) => {
        const { polls, users } = await getInitData();
        dispatch(fetchPolls(polls, currentUserId));
        dispatch(receiveUsers(users));
    };
}