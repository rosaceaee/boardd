import React, { useState, useEffect, useReducer, useMemo } from "react";
import { SearchOutlined, InfoCircleTwoTone } from "@ant-design/icons";
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

const StockManage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <h1> 재고 분석</h1>
      </section>
    </>
  );
};

export default StockManage;
