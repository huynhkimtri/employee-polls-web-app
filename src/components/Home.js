import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPolls } from "../actions/poll";
import { _getQuestions } from "../utils/_DATA";
import { Avatar, Button, List, Switch, Tooltip } from "antd";
import { formatDate } from "../utils/helper";
import { Link } from "react-router-dom";

const Home = (props) => {
  const dispatch = useDispatch();
  const [showAnswered, setShowAnswered] = useState(false);
  console.log(props);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const answeredPolls = useSelector((state) => state.polls?.answered || []);
  const unansweredPolls = useSelector((state) => state.polls?.unanswered || []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await _getQuestions();
  //     const polls = Object.keys(data)
  //       .map((k) => {
  //         const p = data[k];
  //         return {
  //           ...p,
  //           currentUser,
  //           answeredBy: [...p.optionOne.votes, ...p.optionTwo.votes],
  //         };
  //       })
  //       .sort((a, b) => b.timestamp - a.timestamp);
  //     dispatch(fetchPolls(polls, currentUser.id));
  //   };

  //   fetchData();
  // }, [currentUser, dispatch]);

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
        dataSource={showAnswered ? props.polls.answeredPolls : props.polls.unansweredPolls}
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
  polls: state.polls.polls
});

export default connect(mapStateToProps)(Home);
