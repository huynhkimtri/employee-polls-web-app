import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import Poll from "./Poll";

const Home = () => {
  const dispatch = useDispatch();
  const { currentUser, answeredPolls, unansweredPolls } = useSelector(
    (state) => ({
      currentUser: state.auth.currentUser,
      answeredPolls: state.polls?.answered || [],
      unansweredPolls: state.polls?.unanswered || [],
    })
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home page</h1>
      <h1>Welcome, {currentUser ? currentUser.name : "Guest"}</h1>
      <h2>Unanswered Polls</h2>
      <div>
        {unansweredPolls.map((poll) => (
          <Poll key={poll.id} poll={poll} />
        ))}
      </div>
      <h2>Answered Polls</h2>
      <div>
        {answeredPolls.map((poll) => (
          <Poll key={poll.id} poll={poll} />
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
