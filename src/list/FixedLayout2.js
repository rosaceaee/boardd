import React, { useState, useEffect, useReducer, useMemo } from "react";
import Box from "../compo/Box.tsx";
import RequestStock from "../compo/RequestStock";

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

import { useNavigate, Outlet } from "react-router-dom";

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

const FixedLayout2 = () => {
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

  // 메뉴 리스트
  const items = [
    { key: "1", label: "summary" },
    {
      key: "/stress",
      label: "ManageStress",
    },
    {
      key: "/settings",
      label: (
        <a href="" target="self" rel="noopener noreferrer">
          opr3
        </a>
      ),
    },
  ];

  const SidebarMenu = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();

    const items = [
      { key: "/", label: "summary" },
      { key: "/stress", label: "ManageStredss" },
      { key: "/sellManage", label: "매출관리" },
      {
        key: "",
        label: "asdf",
        children: Array.from({ length: 3 }).map((_, j) => {
          const subKey = 3;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      },
    ];

    const handleMenuClick = (e) => {
      navigate(e.key);
    };

    return (
      <Sider width={300} className="left-side">
        <Menu
          items={items}
          mode="inline"
          theme="dark"
          onClick={handleMenuClick}
        />
      </Sider>
    );
  };

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  return (
    <Layout>
      {/* <Sider width={200} trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu items={items} mode="inline" theme="dark" onClick={(a) => a} />
      </Sider>       */}
      <SidebarMenu />

      <Content
        style={{ padding: "1rem", minHeight: "100vh" }}
        className="right-side"
      >
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <InfoCircleTwoTone
              style={{
                fontSize: "1.4rem",
                position: "fixed",
                right: "1rem",
                margin: "1rem",
              }}
            />
          </a>
        </Dropdown>
        <h2>Main </h2>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default FixedLayout2;
