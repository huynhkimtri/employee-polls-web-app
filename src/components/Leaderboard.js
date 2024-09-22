import { Avatar, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { _getUsers } from "../utils/_DATA";
import { useEffect } from "react";
import { receiveUsers } from "../actions/user";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await _getUsers();
      const users = Object.keys(data)
        .map((userId) => Object.assign({}, data[userId], { password: null }))
        .sort((userA, userB) => {
          // sort users by number of questions asked, and number of questions answered
          return (
            userB.questions.length +
            Object.keys(userB.answers).length -
            (userA.questions.length + Object.keys(userA.answers).length)
          );
        });
      dispatch(receiveUsers(users));
    };
    fetchUsers();
  }, [dispatch]);

  return (
    <List
      style={{ padding: "10px" }}
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item key={user.id}>
          <List.Item.Meta
            avatar={<Avatar src={user.avatarURL} />}
            title={user.name}
            description={`Questions asked: ${
              user.questions.length
            }, Questions answered: ${Object.keys(user.answers).length}`}
          />
          <div>
            Total: {user.questions.length + Object.keys(user.answers).length}
          </div>
        </List.Item>
      )}
    />
  );
};

export default Leaderboard;
