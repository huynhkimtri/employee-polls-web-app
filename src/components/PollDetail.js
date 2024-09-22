import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { votePoll } from "../actions/poll";
import { useEffect, useState } from "react";
import { Button, Card, message, Progress } from "antd";
import { OPT_ONE, OPT_TWO } from "../utils/constants";

const PollDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [poll, setPoll] = useState({});
  const [loading, setLoading] = useState(false);
  const polls = useSelector((state) => state.polls?.polls || []);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const fetchPollDetail = async () => {
      const poll = polls.find((p) => p.id === id);
      if (poll) {
        const voteOptionOne = poll.optionOne.votes.length || 0;
        const voteOptionTwo = poll.optionTwo.votes.length || 0;

        const totalVotes = voteOptionOne + voteOptionTwo;
        const percentageOptionOne = totalVotes
          ? (voteOptionOne / totalVotes) * 100
          : 0;
        const percentageOptionTwo = totalVotes
          ? (voteOptionTwo / totalVotes) * 100
          : 0;
        const userVote = poll.optionOne.votes[currentUser.id]
          ? OPT_ONE
          : poll.optionTwo.votes[currentUser.id]
          ? OPT_TWO
          : undefined;

        const pollDetail = {
          ...poll,
          percentageOptionOne,
          percentageOptionTwo,
          userVote,
        };
        console.log("🚀 ~ fetchPollDetail ~ pollDetail:", pollDetail);

        setPoll(pollDetail);
      } else {
        message.error("Failed to load poll. Please try again.");
      }
    };

    fetchPollDetail();
  }, [currentUser.id, id, polls]);

  const handleVote = (selectedOption) => {
    setLoading(true);
    try {
      dispatch(votePoll(id, selectedOption));
      message.success("Vote submitted successfully!");
    } catch (error) {
      message.error("Failed to submit vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Would You Rather">
      <Button
        type={poll.userVote === OPT_ONE ? "primary" : "default"}
        onClick={() => handleVote(OPT_ONE)}
        loading={loading}
        disabled={!!poll.userVote}
      >
        {poll.optionOne?.text}
      </Button>
      <div>
        <p>
          {poll.optionOne?.votes.join(", ")} votes (
          {poll.percentageOptionOne?.toFixed(2)}%)
        </p>
      </div>
      <Button
        type={poll.userVote === OPT_TWO ? "primary" : "default"}
        onClick={() => handleVote(OPT_TWO)}
        loading={loading}
        disabled={!!poll.userVote}
        style={{ marginLeft: "10px" }}
      >
        {poll.optionTwo?.text}
      </Button>
      <div>
        <p>
          {poll.optionTwo?.votes.join(", ")} votes (
          {poll.percentageOptionTwo?.toFixed(2)}%)
        </p>
      </div>
    </Card>
  );
};

export default PollDetail;
