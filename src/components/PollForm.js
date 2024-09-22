import { useDispatch, useSelector } from "react-redux";
import { addPoll } from "../actions/poll";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { _saveQuestion } from "../utils/_DATA";
import { useNavigate } from "react-router-dom";

const PollForm = () => {
  let naviagate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const newPoll = {
        optionOneText: values.optionOne,
        optionTwoText: values.optionTwo,
        author: currentUser.id,
      };
      const data = await _saveQuestion(newPoll);
      dispatch(addPoll(data));
      message.success("Poll created successfully!");
      naviagate("/");
    } catch (error) {
      message.error("Failed to create poll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ padding: " 20px" }}
    >
      <h2>Would you rather...</h2>
      <Form.Item
        name="optionOne"
        label="Option 1"
        rules={[{ required: true, message: "Please enter option 1" }]}
      >
        <Input placeholder="Option 1" />
      </Form.Item>
      <Form.Item
        name="optionTwo"
        label="Option 2"
        rules={[{ required: true, message: "Please enter option 2" }]}
      >
        <Input placeholder="Option 2" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Poll
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PollForm;
