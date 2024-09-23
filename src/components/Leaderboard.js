import { Avatar, Table } from "antd";
import { connect } from "react-redux";

const Leaderboard = (props) => {
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
      dataSource={props.users}
      rowKey="id"
      pagination={false}
    />
  );
};

const mapStateToProps = (state) => ({
  users: Object.keys(state.users.users || {})
    .map((userId) => state.users.users[userId])
    .sort((userA, userB) => {
      // sort users by number of questions asked, and number of questions answered
      return (
        userB.questions.length +
        Object.keys(userB.answers).length -
        (userA.questions.length + Object.keys(userA.answers).length)
      );
    }),
});

export default connect(mapStateToProps)(Leaderboard);
