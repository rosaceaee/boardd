import React, { useState, useEffect, useReducer, useMemo } from "react";
import Instock from "../manage/Instock";
import Outstock from "../manage/Outstock";
import { dummyStockApi } from "../manage/dummyStockApi.js";
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

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const tabItms = [
  {
    key: "1",
    label: "향수",
    // children: <PerfumeInvent />,
  },
  {
    key: "2",
    label: "바디ㅇ",
    // children: <BodyInvent />,
  },
  {
    key: "3",
    label: "candle",
    // children: <CandleInvent />,
  },
];

const ListStock = () => {
  const [tableData, setTableData] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState(tabItms[0].key);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (key) => {
    setIsLoading(true);
    // 🚨 key 값에 따라 다른 API를 호출하거나, 단일 API에 key를 필터로 전달
    const status = key === "1" ? "perfume" : key === "2" ? "body" : "candle";

    try {
      // dummyStockApi는 상태(status)를 인수로 받는다고 가정
      const data = await dummyStockApi(status);
      setTableData(data);
    } catch (error) {
      console.error("데이터 로딩 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(activeTabKey);
  }, [activeTabKey]); // 🚨 activeTabKey가 변경될 때마다 useEffect 재실행

  // 4. 📝 탭 변경 핸들러
  const handleTabChange = (key) => {
    setActiveTabKey(key);
    // setTableData([]); // 데이터를 비우고 로딩을 시작할 수도 있음
  };

  const columns = [
    {
      title: "분류",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "현재 상태",
      dataIndex: "status",
      key: "status",
      render: (statusVal) => {
        let btn;
        switch (statusVal) {
          case "Instock":
            btn = <Button type="primary">재고</Button>;
            break;
          case "ArrivingSoon":
            btn = <Button type="default">ArrivingSoon</Button>;
            break;
          case "NoJaiko":
            btn = <Button danger>jaikono</Button>;
            break;
          default:
            btn = <span>{statusVal}</span>;
        }
        return btn;
      },
    },
    {
      title: "상품명",
      dataIndex: "prdName",
      key: "prdName",
    },
    {
      title: "수량",
      dataIndex: "suryou",
      key: "suryou",
      sorter: (a, b) => a.suryou - b.suryou,
      render: (suryou) => suryou.toLocaleString(),
      align: "right",
    },
    {
      title: "가격 (원)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${price.toLocaleString()} 원`,
      align: "right",
    },
  ];

  const { Sider, Header, Content, Footer } = Layout;

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <Tabs
          items={tabItms}
          activeKey={activeTabKey}
          onChange={handleTabChange}
        />

        {/* 🚨 공통 Table에 데이터 및 로딩 상태 연결 */}
        <Table dataSource={tableData} columns={columns} loading={isLoading} />
      </section>
    </>
  );
};

export default ListStock;
