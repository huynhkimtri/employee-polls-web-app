import { Avatar, Button, Card } from "antd";
import { Link } from "react-router-dom";

const Poll = ({ poll }) => {
  const dateTimeFormated = new Date(poll.timestamp).toString();
  return (
    <Card title="Would You Rather">
      <Card.Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
        }
      />
      <Link to={`/questions/${poll.id}`}>
        @{poll.author} creates on {dateTimeFormated}
      </Link>
      <Button>{poll.optionOne.text}</Button>
      <Button style={{ marginLeft: "10px" }}>{poll.optionTwo.text}</Button>
    </Card>
  );
};

export default Poll;
