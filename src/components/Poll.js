import { Avatar, Button, Card } from "antd";

const Poll = ({ poll }) => {
  return (
    <Card title="Would You Rather">
      <Card.Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
        }
      />
      <Button>{poll.optionOne.text}</Button>
      <Button style={{ marginLeft: "10px" }}>{poll.optionTwo.text}</Button>
    </Card>
  );
};

export default Poll;
