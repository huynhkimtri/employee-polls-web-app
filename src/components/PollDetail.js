import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { votePoll } from "../actions/poll";
import { useState } from "react";
import { Alert, Button, Col, Flex, message, Row } from "antd";
import { OPT_ONE, OPT_TWO } from "../utils/constants";
import { formatPercentVoteOption } from "../utils/helper";
import { updateUserAnswers } from "../actions/user";
import NotFoundPage from "../pages/NotFoundPage";

const PollDetail = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const currentUser = props.currentUser;
  const polls = props.polls.polls;
  const users = props.users.users;

  if (!polls[id]) {
    return <NotFoundPage />;
  }

  const poll = polls[id];
  const author = users[poll.author];
  const userVote = poll.optionOne.votes.includes(currentUser.id)
    ? OPT_ONE
    : poll.optionTwo.votes.includes(currentUser.id)
    ? OPT_TWO
    : undefined;

  const handleVote = async (selectedOption) => {
    setLoading(true);
    try {
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
          <h3>Poll by {author.name}</h3>
          <img
            src={author.avatarURL}
            alt={author.name}
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
            disabled={!!userVote}
            size="large"
            style={{
              height: "50px",
              width: "300px",
              textWrap: "wrap",
            }}
          >
            {poll.optionOne?.text}
          </Button>

          <Button
            type="primary"
            onClick={() => handleVote(OPT_TWO)}
            loading={loading}
            disabled={!!userVote}
            size="large"
            style={{ height: "50px", width: "300px", textWrap: "wrap" }}
          >
            {poll.optionTwo?.text}
          </Button>
        </Flex>
        <div>
          {userVote && (
            <Alert
              message={`You have chosen "${
                userVote === OPT_ONE
                  ? poll.optionOne?.text
                  : poll.optionTwo?.text
              }". Thanks for your opinion!`}
              description={
                <p>
                  {poll.optionOne?.votes.length} employee(s) choses option 1 (~
                  {formatPercentVoteOption(poll).percentageOptionOne?.toFixed(
                    0
                  )}
                  %), while {poll.optionTwo?.votes.length} employee(s) choses
                  option 2 (~
                  {formatPercentVoteOption(poll).percentageOptionTwo?.toFixed(
                    0
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

const mapStateToProps = ({ auth, polls, users }) => ({
  currentUser: auth.currentUser,
  polls,
  users,
});

export default connect(mapStateToProps)(PollDetail);
