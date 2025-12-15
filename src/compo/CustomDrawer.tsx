import React, { useState, useMemo } from "react";
import {
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Avatar, Form, Input, Button } from "antd";
import Box from "./Box";

interface dataTypes {
  setOpen: boolean;
  onClose: () => void;

  title: string;
  children: React.ReactNode;
}

const CustomDrawer = ({ title, children }: dataTypes) => {
  const [open, setOpen] = useState(false);
  const closeThis = () => {
    setOpen((a) => !a);
  };
  return (
    <>
      {!open && (
        <div className="chat-detail">
          <div className="usr-info">
            <div className="info-box">
              <Avatar size={46} icon={<UserOutlined />} />
              {title}
              <br />
              {children}
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
                padding={0}
              >
                <p>annyeong haseyong</p>
              </Box>
            </div>

            <div className="usr-chat-box reverse">
              <Box
                radius={10}
                className="bg sent"
                widthh={0}
                background={`#fff`}
                padding={0}
              >
                <p>annyeong haseyong</p>
              </Box>
            </div>
            <div className="usr-chat-box reverse">
              <Box
                radius={10}
                className="bg sent"
                widthh={0}
                background={`#fff`}
                padding={0}
              >
                <p>
                  annyeong haseyong annyeong haseyong annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                  <br />
                  annyeong haseyong
                </p>
              </Box>
            </div>
            {/* // */}
          </div>{" "}
          <div className="textarea">
            <Form.Item name={["user", "introduction"]}>
              <Input.TextArea placeholder="dd" />
              <Button type="primary"> send</Button>
            </Form.Item>
          </div>
          {/* // */}
        </div>
      )}
    </>
  );
};

export default CustomDrawer;
