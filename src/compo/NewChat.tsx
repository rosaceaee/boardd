import React, { useState, useMemo } from "react";
import {
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Avatar, Form, Input, Button, Select } from "antd";
import Box from "./Box";

interface dataTypes {
  setOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  options: { label: string; value: string }[]; // 상위레벨에서 받아오ㅗㅁㅁ
}

const NewChat = ({ title, options, onClose, children }: dataTypes) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const closeThis = () => {
    setOpenDrawer((a) => !a);
  };
  const [selectedTarget, setSelectedTarget] = useState("");

  const [form] = Form.useForm();
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요!?", type: "received" },
  ]);

  const handleSend = (values: Record<string, any>) => {
    const text = values.user?.introduction;
    if (!text || !text.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: text,
      type: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);

    form.resetFields();
  };

  return (
    <>
      {!openDrawer && (
        <div className="chat-detail">
          <div className="usr-info">
            <div className="info-box">
              {/* <Avatar size={46} icon={<UserOutlined />} /> 
              <span style={{ fontWeight: "bold" }}>{title}</span>
              <br />*/}
              {children}
              <Select
                placeholder="대상 선택"
                style={{ width: "100%" }}
                options={options}
                onChange={(value) => setSelectedTarget(value)}
                showSearch
              />
            </div>
            <p className="back" onClick={closeThis}>
              BACK
            </p>
          </div>
          {/* // */}
          <div className="chat-wrap">
            <div className="usr-chat-box">
              <Avatar
                size={34}
                icon={<UserOutlined />}
                style={{ flexShrink: 0 }}
              />
              <Box
                radius={10}
                className="bg received"
                widthh={0}
                background={`#fff`}
              >
                <p>annyeong haseyong</p>
              </Box>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`usr-chat-box ${
                  msg.type === "sent" ? "reverse" : ""
                }`}
              >
                <Box
                  radius={10}
                  className={`bg ${msg.type === "sent" ? "sent" : ""}`}
                  widthh={0}
                  background={msg.type === "sent" ? "#fff" : "#f0f0f0"}
                >
                  <p>{msg.text}</p>
                </Box>
              </div>
            ))}

            {/* // */}
          </div>{" "}
          <div className="textarea">
            <Form form={form} onFinish={handleSend}>
              <Form.Item name={["user", "introduction"]}>
                <Input.TextArea placeholder="write here" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  send
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/* // */}
        </div>
      )}
    </>
  );
};

export default NewChat;
