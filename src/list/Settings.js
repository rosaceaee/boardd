import React, { useState, useEffect, useReducer, useMemo } from "react";
import Box from "../compo/Box.tsx";
import HeaderTop from "../compo/HeaderTop";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";

// import { DATA_FILTERS } from "../manage/stockData";
import { dummyZaikoApi, DATA_FILTERS } from "../manage/dummyZaikoApi";

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
  Avatar,
  Card,
  Calendar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { dummyMail } from "./dummyMail.js";

// import { DATA_FILTERS } from "../manage/stockData";

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

const Settings = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);

  const [tabButtons, setTabButtons] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [activeKey, setActiveKey] = useState(DATA_FILTERS.perfume);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dummyZaikoApi(activeKey);
      setTableData(data);
    };
    fetchData();
  }, [activeKey]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const rawData = await dummyZaikoApi(DATA_FILTERS.all);
        setTableData(rawData);

        const processedTabs = processDataForTabs(rawData);
        setTabButtons(processedTabs);

        if (processedTabs.length > 0) {
          setSum(processedTabs[0].key);
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchAndProcessData();
  }, []);

  const sumNum = [
    { key: "범례1", fir: 30, scnd: 11 },
    { key: "범례11", fir: 30, scnd: 111 },
    { key: "범례111", fir: 30, scnd: 1111 },
  ];

  const [sum, setSum] = useState(sumNum[0].key);

  useEffect(() => {
    setFilteredData(cellData);
  }, [cellData]);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredData(cellData);
    }
  }, [searchKeyword, cellData]);

  const { Sider, Header, Content, Footer } = Layout;

  // 차트 데이터 생성 labelKey-> "title"
  const chartData = useMemo(
    () => generateChartData(columns, filteredData, "title"),
    [filteredData]
  );

  const processDataForTabs = (data) => {
    const allTab = {
      key: "all",
      name: `전체 (${data.length})`,
      count: data.length,
      fir: 0,
      prdName: data.map((item) => item.prdName),
    };

    const statusCounts = data.reduce((acc, item) => {
      const statusKey = item.status;
      // acc[statusKey] = (acc[statusKey] || 0) + 1;

      if (!acc[statusKey]) {
        acc[statusKey] = {
          count: 0,
          names: [],
        };
      }
      acc[statusKey].count += 1;
      acc[statusKey].names.push(item.prdName);

      return acc;
    }, {});

    const statusTabs = Object.entries(statusCounts).map(
      ([statusKey, count]) => ({
        key: statusKey,
        name: `${statusKey} (${count})`,
        count: count.count,
        fir: 0,
        prdName: `${count.names}`,
      })
    );

    return [allTab, ...statusTabs];
  };

  return (
    <Layout style={{ background: "#001529" }}>
      <HeaderTop />
      <Content
        style={{ padding: "0", minHeight: "100vh" }}
        className="right-side"
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Flex style={{ flexDirection: "column", flex: "0 0 75%" }}>
            {/*  */}
            <Outlet />
            {/* // */}
          </Flex>

          {/* Right side: usr info, calendar */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              maxWidth: "25rem",
              width: "100%",
            }}
          >
            <Box radius={15} className="box profile">
              <Avatar size={64} icon={<UserOutlined />} />
              <h2>Hong gildong</h2>
              <p>Dev / Manager</p>
              <Flex
                style={{ justifyContent: "center", margin: "1.4rem 0 2rem" }}
              >
                <Button type="default" style={{ marginRight: "10px" }}>
                  Todos
                </Button>
                <Button type="primary" style={{ marginRight: "10px" }}>
                  Logout
                </Button>
              </Flex>
            </Box>{" "}
            <Box radius={15} className="box" style={{ height: "100%" }}>
              <h3>달력</h3>
              <Calendar />
            </Box>
          </div>
          {/* // */}
        </div>
      </Content>
    </Layout>
  );
};

export default Settings;
