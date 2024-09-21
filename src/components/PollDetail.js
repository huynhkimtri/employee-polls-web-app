import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { votePoll } from "../actions/poll";
import { useState } from "react";
import { Button, Card, message } from "antd";

const PollDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ PollDetail ~ id:", id);

  const poll = {
    question: "this is a sample question",
    id: "xj352vofupe1dqz9emx13r",
    author: "mtsamis",
    timestamp: 1493579767190,
    optionA: {
      votes: ["mtsamis", "zoshikanlu"],
      text: "deploy to production once every two weeks",
    },
    optionB: {
      votes: ["tylermcginnis"],
      text: "deploy to production once every month",
    },
  };

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
    <Card title={poll.question}>
      <Button
        type="primary"
        onClick={() => handleVote("A")}
        loading={loading}
        disabled={loading}
      >
        {poll.optionA}
      </Button>
      <Button
        type="primary"
        onClick={() => handleVote("B")}
        loading={loading}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        {poll.optionB}
      </Button>
    </Card>
  );
};

export default PollDetail;
