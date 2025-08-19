import React from "react";
import { Button, Form, Input, Row, Col, Modal, message } from "antd";
import { RegisterTheatre, UpdateTheatre } from "../../apicalls/theatres";
import { useSelector } from "react-redux";
//import { values } from "lodash";
const { TextArea } = Input;

const TheatreFormComponent = ({
  isModalOpen,
  setIsModalOpen,
  getTheatresData,
  selectedTheatre,
  setSelectedTheatre,
  formType,
}) => {
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (payload) => {
    try {
      let res = null;
      if (formType === "add") {
        res = await RegisterTheatre({ ...payload, owner: user._id }); ///sending form data with user id
      } else {
        //formType === "edit"
        payload.theatreId = selectedTheatre._id;
        console.log("edit values:", payload);
        res = await UpdateTheatre(payload);
      }
      console.log(res);
      if (res.success) {
        setIsModalOpen(false);
        message.success(res.message);
        getTheatresData();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
      <Form
        name="basic"
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={selectedTheatre}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the theatre name" },
              ]}
            >
              <Input placeholder="Enter your Theatre Name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Theatre Address"
              name="address"
              rules={[
                { required: true, message: "Please enter the theatre address" },
              ]}
            >
              <TextArea rows={4} placeholder="Enter the Address" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your Email" },
                  ]}
                >
                  <Input placeholder="Enter your Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    placeholder="1234567890"
                    inputMode="numeric"
                    maxLength={10}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ display: "flex" }}>
          <Form.Item>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default TheatreFormComponent;
