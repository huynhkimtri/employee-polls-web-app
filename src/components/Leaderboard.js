import { Avatar, Table } from "antd";
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

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={record.avatarURL}
            style={{ backgroundColor: "#1677ff" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "8px",
            }}
          >
            <span>
              <b>{text}</b>
            </span>
            <span>@{record.id}</span>
          </div>
        </span>
      ),
    },
    {
      title: "Questions Asked",
      dataIndex: "pollsCreated",
      key: "pollsCreated",
      render: (text, record) => <span>{record.questions.length}</span>,
    },
    {
      title: "Questions Answered",
      key: "pollsAnswered",
      render: (text, record) => (
        <span>{Object.keys(record.answers).length}</span>
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (text, record) => (
        <span>
          {record.questions.length + Object.keys(record.answers).length}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={false}
    />
  );
};

export default Leaderboard;
