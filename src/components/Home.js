import { useDispatch, useSelector } from "react-redux";
import Poll from "./Poll";
import { useEffect, useState } from "react";
import { fetchPolls } from "../actions/poll";
import { _getQuestions } from "../utils/_DATA";
import { Card, List, Row, Switch } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const [showAnswered, setShowAnswered] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const answeredPolls = useSelector((state) => state.polls?.answered || []);
  const unansweredPolls = useSelector((state) => state.polls?.unanswered || []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await _getQuestions();
      const polls = Object.keys(data)
        .map((k) => {
          const p = data[k];
          return {
            ...p,
            currentUser,
            answeredBy: [...p.optionOne.votes, ...p.optionTwo.votes],
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp);
      dispatch(fetchPolls(polls, currentUser.id));
    };

    fetchData();
  }, [currentUser, dispatch]);

  return (
    <Row>
      <Card title="Polls">
        <Switch
          checkedChildren="Answered"
          unCheckedChildren="Unanswered"
          checked={showAnswered}
          onChange={() => setShowAnswered(!showAnswered)}
        />
        <List
          itemLayout="horizontal"
          dataSource={showAnswered ? answeredPolls : unansweredPolls}
          renderItem={(poll) => (
            <List.Item>
              <Poll key={poll.id} poll={poll} />
            </List.Item>
          )}
        />
      </Card>
    </Row>
  );
};

export default Home;
