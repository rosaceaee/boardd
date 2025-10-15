import React, { useState, useEffect, useReducer, useMemo } from "react";

import { SearchOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Layout, Row, Col, Menu, Table, Input, Button, Modal, Space, Dropdown, Flex, Tabs } from "antd";

import { useNavigate } from "react-router-dom";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
const { Sider, Header, Content, Footer } = Layout;

const Settings = () => {
  const navigate = useNavigate();

  const items2 = [
    { key: "/settings", label: "basic setting" },
    { key: "/sub12", label: "sub12" },
    {
      key: "",
      label: "sub3",
    },
  ];
  const handleMenuClick = (e) => {
    navigate(e.key);
  };
  return (
    <Sider width={200}>
      <Menu items={items2} mode="inline" theme="dark" onClick={handleMenuClick} />
    </Sider>
  );
};

export default Settings;
