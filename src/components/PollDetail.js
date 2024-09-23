import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { votePoll } from "../actions/poll";
import { useEffect, useState } from "react";
import { Button, Card, message } from "antd";
import { OPT_ONE, OPT_TWO } from "../utils/constants";
import { formatPercentVoteOption } from "../utils/helper";

const PollDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [poll, setPoll] = useState({});
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const polls = useSelector((state) => state.polls.polls);

  useEffect(() => {
    const fetchPollDetail = async () => {
      const poll = polls[id];
      console.log("🚀 ~ fetchPollDetail ~ poll:", poll);
      if (poll) {
        const userVote = poll.optionOne.votes.includes(currentUser.id)
          ? OPT_ONE
          : poll.optionTwo.votes.includes(currentUser.id)
          ? OPT_TWO
          : undefined;

        // if current voted -> show the info
        if (userVote) {
          console.log("🚀 ~ fetchPollDetail ~ userVote:", userVote);
          const { percentageOptionOne, percentageOptionTwo } =
            formatPercentVoteOption(poll);

          setPoll({
            ...poll,
            percentageOptionOne,
            percentageOptionTwo,
            userVote,
          });
        } else {
          setPoll(poll);
        }
      } else {
        message.error("Failed to load poll. Please try again.");
      }
    };

    fetchPollDetail();
  }, [currentUser.id, id, polls]);

  const handleVote = (selectedOption) => {
    setLoading(true);
    try {
      setPoll({ ...poll, userVote: selectedOption });
      dispatch(votePoll(id, selectedOption, currentUser.id));
      message.success("Vote submitted successfully!");
    } catch (error) {
      console.log("🚀 ~ handleVote ~ error:", error);
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
        {poll.userVote && (
          <p>
            {poll.optionOne?.votes.join(", ")} votes (
            {formatPercentVoteOption(poll).percentageOptionOne?.toFixed(2)}%)
          </p>
        )}
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
        {poll.userVote && (
          <p>
            {poll.optionTwo?.votes.join(", ")} votes (
            {formatPercentVoteOption(poll).percentageOptionTwo?.toFixed(2)}%)
          </p>
        )}
      </div>
    </Card>
  );
};

export default PollDetail;
