import React, { useState, useEffect, useReducer, useMemo } from "react";
import Instock from "../manage/Instock";
import Outstock from "../manage/Outstock";
import { inventoryApi } from "../api/inventoryApi";
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
const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((_, idx) => idx !== action.index);
    default:
      return state;
  }
};
// 차트 데이터
const generateChartData = (columns, dataSource, labelKey) => {
  const labels = dataSource.map((item) => item[labelKey]);

  const datasets = columns
    .filter((col) => col.dataIndex !== labelKey)
    .map((col) => ({
      label: col.title,
      data: dataSource.map((item) => item[col.dataIndex]),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: 1,
    }));

  return { labels, datasets };
};

const RequestStock = () => {
  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);
  const [stockRequests, setStockRequests] = useState([]);
  const [finalNum, setFinalNum] = useState(0);

  const handleApplySuccess = (data) => {
    console.log("data.count");
    setFinalNum(data.count);
  };

  const handleAddRequest = (newRequest) => {
    // 기존 리스트에 새 신청 건 추갸ㄱ
    setStockRequests((prev) => [...prev, newRequest]);
  };

  useEffect(() => {
    setFilteredData(cellData);
  }, [cellData]);

  const onChange = (key) => {
    // console.log(key);
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
      label: "입/출고 일람",
      children: <Instock onApplySuccess={handleAddRequest} />,
    },
    {
      key: "2",
      label: "재고 신청 현황",
      children: <Outstock data={stockRequests} />,
    },
  ];

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <Tabs items={tabItms} onChange={onChange} />
      </section>
    </>
  );
};

export default RequestStock;
