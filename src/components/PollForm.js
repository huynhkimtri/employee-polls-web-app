import { useDispatch, useSelector } from "react-redux";
import { addPoll } from "../actions/poll";
import { Button, Col, Form, Input, message, Row } from "antd";
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
    <Row justify={"center"}>
      <Col span={12}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ padding: " 20px" }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>Would you rather...</h2>
            <p>Create Your Own Poll</p>
          </div>
          <Form.Item
            name="optionOne"
            label="First Option"
            rules={[{ required: true, message: "Please enter option 1" }]}
          >
            <Input placeholder="Option 1" />
          </Form.Item>
          <Form.Item
            name="optionTwo"
            label="Second Option"
            rules={[{ required: true, message: "Please enter option 2" }]}
          >
            <Input placeholder="Option 2" />
          </Form.Item>
          <Form.Item style={{ alignItems: "center" }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Poll
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default PollForm;
