import React, { useState, useMemo } from "react";
import {
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

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
          <p onClick={closeThis}>BACK</p>
          <p style={{ border: " 2px solid red" }}>
            <Avatar size={46} icon={<UserOutlined />} />
            {title}
            <br />
            {children}
          </p>
        </div>
      )}
    </>
  );
};

export default CustomDrawer;
