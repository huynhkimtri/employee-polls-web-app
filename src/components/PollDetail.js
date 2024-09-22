import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { votePoll } from "../actions/poll";
import { useEffect, useState } from "react";
import { Button, Card, message } from "antd";

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
        setPoll(poll);
      } else {
        message.error("Failed to load poll. Please try again.");
      }
    };

    fetchPollDetail();
  }, [id, polls]);

  const handleVote = (pollId, selectedOption) => {
    setLoading(true);
    try {
      dispatch(votePoll(pollId, selectedOption));
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
        type="primary"
        onClick={() => handleVote("A")}
        loading={loading}
        disabled={loading}
      >
        {poll.optionOne?.text}
      </Button>
      <Button
        type="primary"
        onClick={() => handleVote("B")}
        loading={loading}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        {poll.optionTwo?.text}
      </Button>
    </Card>
  );
};

export default PollDetail;
