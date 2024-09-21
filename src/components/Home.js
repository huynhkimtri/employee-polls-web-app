import { useSelector } from "react-redux";
import Poll from "./Poll";

const Home = () => {
  const { answeredPolls, unansweredPolls } = useSelector((state) => ({
    currentUser: state.auth.currentUser,
    answeredPolls: state.polls?.answered || [],
    unansweredPolls: state.polls?.unanswered || [],
  }));

  return (
    <div>
      <h1>Home page</h1>
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
    </div>
  );
};

export default Home;
