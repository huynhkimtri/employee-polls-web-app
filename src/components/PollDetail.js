import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { votePoll } from "../actions/poll";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Flex, message, Row } from "antd";
import { OPT_ONE, OPT_TWO } from "../utils/constants";
import { formatPercentVoteOption } from "../utils/helper";
import { updateUserAnswers } from "../actions/user";

const PollDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [poll, setPoll] = useState({});
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const polls = useSelector((state) => state.polls.polls);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    const fetchPollDetail = async () => {
      const poll = polls[id];
      if (poll) {
        const userVote = poll.optionOne.votes.includes(currentUser.id)
          ? OPT_ONE
          : poll.optionTwo.votes.includes(currentUser.id)
          ? OPT_TWO
          : undefined;

        const pollDetail = {
          ...poll,
          authorAvatarUrl: users[poll.author].avatarURL,
          authorName: users[poll.author].name,
        };

        // if current voted -> show the info
        if (userVote) {
          const { percentageOptionOne, percentageOptionTwo } =
            formatPercentVoteOption(poll);

          setPoll({
            ...pollDetail,
            percentageOptionOne,
            percentageOptionTwo,
            userVote,
          });
        } else {
          setPoll(pollDetail);
        }
      } else {
        message.error("Failed to load poll. Please try again.");
      }
    };

    fetchPollDetail();
  }, [currentUser.id, id, polls, users]);

  const handleVote = (selectedOption) => {
    setLoading(true);
    try {
      setPoll({ ...poll, userVote: selectedOption });
      dispatch(votePoll(id, selectedOption, currentUser.id));
      // Update the user question
      dispatch(updateUserAnswers(currentUser.id, id, selectedOption));
      message.success("Vote submitted successfully!");
    } catch (error) {
      console.log("🚀 ~ handleVote ~ error:", error);
      message.error("Failed to submit vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify={"center"}>
      <Col span={18}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <h3>Poll by {poll.authorName}</h3>
          <img
            src={poll.authorAvatarUrl}
            alt={poll.author}
            style={{
              borderRadius: "50%",
              border: "1px solid transparent",
              backgroundColor: "#1677ff30",
              width: "200px",
            }}
          />
          <h2>
            Would you rather {poll.optionOne?.text} or {poll.optionTwo?.text}?
          </h2>
        </div>
        <Flex
          justify={"space-evenly"}
          align={"center"}
          style={{ marginBottom: "24px" }}
        >
          <Button
            type="primary"
            onClick={() => handleVote(OPT_ONE)}
            loading={loading}
            disabled={!!poll.userVote}
            size="large"
            style={{ height: "50px", width: "300px", textWrap: "wrap" }}
          >
            {poll.optionOne?.text}
          </Button>
          <Button
            type="primary"
            onClick={() => handleVote(OPT_TWO)}
            loading={loading}
            disabled={!!poll.userVote}
            size="large"
            style={{ height: "50px", width: "300px", textWrap: "wrap" }}
          >
            {poll.optionTwo?.text}
          </Button>
        </Flex>
        <div>
          {poll.userVote && (
            <Alert
              message={`You have chosen "${
                poll.userVote === OPT_ONE
                  ? poll.optionOne?.text
                  : poll.optionTwo?.text
              }". Thanks for your opinion!`}
              description={
                <p>
                  {poll.optionOne?.votes.length} employee(s) choses option 1 (~
                  {formatPercentVoteOption(poll).percentageOptionOne?.toFixed(
                    2
                  )}
                  %), while {poll.optionTwo?.votes.length} employee(s) choses
                  option 2 (~
                  {formatPercentVoteOption(poll).percentageOptionTwo?.toFixed(
                    2
                  )}
                  %).
                </p>
              }
              type="info"
              showIcon
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default PollDetail;
