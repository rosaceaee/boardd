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
import Box from "../compo/Box.tsx";
import Instock from "../manage/Instock";

const ManageShipping = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const onChange = (key) => {
    console.log(key);
  };

  const items2 = [
    { key: "/ReportSell", label: "매출 현황 분석" },
    { key: "/ManageShipping", label: "주문/배송 관리" },
    // { key: "/ManageShipping", label: "상품 성과 분석" },
    { key: "/sub12", label: "광고/마케팅 성과" },
  ];

  const tabItems = items2.map((item) => {
    let Component;
    switch (item.key) {
      case "/ReportSell":
        Component = <Instock />;
        break;

      // case "/ManageShipping":
      //   Component = <ManageShipping />;
      //   break;
      default:
        Component = <div>404</div>;
    }

    return {
      key: item.key,
      label: item.label,
      children: Component,
    };
  });

  const tabItms = [
    {
      key: "1",
      label: "주문 관리",
      children: <Instock />,
    },
    {
      key: "2",
      label: "배송 관리",
      children: "Content of Tab Pane 11",
    },
  ];
  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <h1> 주문/배송 관리(1~5)</h1>
        <Box>
          <Flex style={{ justifyContent: "space-around" }}>
            <p>주문</p>
            <p>배송</p>
          </Flex>
        </Box>

        <Tabs items={tabItms} onChange={onChange} />
        {/* <Bar data={chartData} /> */}
      </section>
    </>
  );
};

export default ManageShipping;
