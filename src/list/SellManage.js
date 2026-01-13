import React, { useState, useEffect, useReducer, useMemo } from "react";

import ReportSell from "../sell/ReportSell";
import ManageMarketing from "../sell/ManageMarketing";
import ManageShipping from "../sell/ManageShipping";
import CsTemp from "../cs/CsTemp";
import BoardCs from "../cs/BoardCs";

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

import { useNavigate } from "react-router-dom";

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

//
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

const columns = [
  { title: "범례", dataIndex: "title", key: "title" },
  {
    title: "하나",
    dataIndex: "fir",
    key: "fir",
    sorter: (a, b) => a.fir - b.fir,
  },
  {
    title: "둘",
    dataIndex: "scnd",
    key: "scnd",
    sorter: (a, b) => a.scnd - b.scnd,
  },
];

const SellManage = () => {
  const [chkDeleteModal, setChkDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);
  const [tabPosition, setTabPosition] = useState("left");

  const [input, setInput] = useState({
    title: "",
    fir: "",
    scnd: "",
  });

  useEffect(() => {
    setFilteredData(cellData);
  }, [cellData]);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredData(cellData);
    }
  }, [searchKeyword, cellData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const addRow = () => {
    if (input.title && input.fir && input.scnd) {
      dispatch({
        type: "add",
        payload: {
          title: input.title,
          fir: Number(input.fir),
          scnd: Number(input.scnd),
        },
      });
      setInput({ title: "", fir: "", scnd: "" });
    } else {
      alert("값을 모두 입력해주세요.");
    }
  };

  const deleteRow = (index) => {
    setSelectedRow({ ...cellData[index], index });
    setChkDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch({ type: "delete", index: selectedRow.index });
    setChkDeleteModal(false);
    setSelectedRow(null);
  };

  const cancelDelete = () => {
    setChkDeleteModal(false);
    setSelectedRow(null);
  };

  const searchData = () => {
    const keyword = searchKeyword.toLowerCase().trim();

    if (keyword === "") {
      setFilteredData(cellData);
      return;
    }

    const filtered = cellData.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.fir.toString().includes(keyword) ||
        item.scnd.toString().includes(keyword)
    );

    setFilteredData(filtered);
  };

  const { Sider, Header, Content, Footer } = Layout;

  // 차트 데이터 생성 labelKey-> "title"
  const chartData = useMemo(
    () => generateChartData(columns, filteredData, "title"),
    [filteredData]
  );

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const navigate = useNavigate();
  const handleTabChange = (key) => {
    if (key === "/mail") {
      navigate("/mail");
    } else {
      navigate(key);
    }
  };

  const items2 = [
    { key: "/ReportSell", label: "매출 현황 분석" },
    // { key: "/ManageShipping", label: "주문/배송 관리" },
    { key: "/sellManage/mail", label: "메일" },
    // { key: "/sellManage/boardCs", label: "게시판문의" },
  ];

  const tabItems = items2.map((item) => {
    let Component;
    switch (item.key) {
      case "/ReportSell":
        Component = <ReportSell />;
        break;
      case "/ManageMarketing":
        Component = <ManageShipping />;
        break;
      case "/sellManage/mail":
        Component = <CsTemp />;
        break;
      case "/sellManage/boardCs":
        Component = <boardCs />;
        break;
      default:
        Component = <div>404</div>;
    }

    return {
      key: item.key,
      label: item.label,
      children: Component,
    };
  });

  return (
    <Layout>
      <Tabs
        tabPosition={tabPosition}
        items={tabItems}
        onChange={handleTabChange}
      />
      <Content />
    </Layout>
  );
};

export default SellManage;
