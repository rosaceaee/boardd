import React, { useState, useEffect, useReducer, useMemo } from "react";
import { dummyBoardData, MailData } from "./BoardData";
// dummyMail은 실제 '데이터', MailData는 '타입(설계도)'
import {
  Layout,
  Row,
  Col,
  Menu,
  Table,
  Input,
  Button,
  Modal,
  Space,
  Dropdown,
  Flex,
  Tabs,
} from "antd";

const BoardCs = () => {
  const mail = dummyBoardData;

  const columns = [
    {
      title: "날짜",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "작성자",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={mail.received} />
    </div>
  );
};

export default BoardCs;
