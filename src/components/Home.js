import { connect } from "react-redux";
import { useState } from "react";
import { Avatar, Button, List, Switch, Tooltip } from "antd";
import { formatDate } from "../utils/helper";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [showAnswered, setShowAnswered] = useState(false);
  const unansweredPolls = props.polls.filter(
    (poll) =>
      ![...poll.optionOne.votes, ...poll.optionTwo.votes].includes(
        props.curentUserId
      )
  );

  const answeredPolls = props.polls.filter((poll) =>
    [...poll.optionOne.votes, ...poll.optionTwo.votes].includes(
      props.curentUserId
    )
  );

  return (
    <div>
      <Tooltip
        title="Toggle between your answered and unanswered polls"
        placement="right"
      >
        <Switch
          checkedChildren="Answered"
          unCheckedChildren="Unanswered"
          checked={showAnswered}
          onChange={() => setShowAnswered(!showAnswered)}
          style={{ marginBottom: "10px" }}
        />
      </Tooltip>
      <List
        itemLayout="horizontal"
        dataSource={showAnswered ? answeredPolls : unansweredPolls}
        renderItem={(poll) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
                  style={{ backgroundColor: "#1677ff" }}
                />
              }
              title={`Would you rather ${poll.optionOne.text} vs ${poll.optionTwo.text}`}
              description={`@${poll.author} creates on ${formatDate(
                poll.timestamp
              )}`}
            />
            <Button type="default">
              <Link to={`/questions/${poll.id}`}>Show more</Link>
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  polls: Object.keys(state.polls.polls || {})
    .map((qId) => state.polls.polls[qId])
    .sort((a, b) => b.timestamp - a.timestamp),
  curentUserId: state.auth.currentUser.id,
});

export default connect(mapStateToProps)(Home);
