import React, { useState, useEffect, useReducer, useMemo } from "react";
import Box from "../compo/Box.tsx";
import GraphDashboard from "../compo/GraphDashboard";

// import { DATA_FILTERS } from "../manage/stockData";
import { dummyZaikoApi, DATA_FILTERS } from "../manage/dummyZaikoApi";
import { dummyMail } from "./dummyMail.js";

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

const First = () => {
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
    <>
      <Flex style={{ flexDirection: "row", gap: "1rem" }}>
        <Box
          radius={15}
          className="box"
          style={{
            maxWidth: "100%",
            flex: "1",
            height: "100%",
            background: "#fff",
          }}
        >
          <div className="summ-wrap main" style={{ display: "flex" }}>
            <Box className="tit" radius={15} widthh={130}>
              <p className="txt">오늘 매출</p>
              <p className="num">1개</p>
            </Box>
            <Box className="tit" radius={15} widthh={130}>
              <p className="txt">주문 건수</p>
              <p className="num">1개</p>
            </Box>
            <Box className="tit" radius={15} widthh={130}>
              <p className="txt">품절상품 수</p>
              <p className="num">1개</p>
            </Box>
          </div>
          <Box className="box summary">
            {/* <GraphDashboard
                    tabData={tabButtons}
                    activeKey={sum}
                    onTabChange={clicksumNum}
                    activeContent={tabButtons.find((item) => item.key === sum)}
                  /> */}
            {tableData.length > 0 ? (
              <GraphDashboard
                activeKey={activeKey}
                activeDetailData={tableData}
              />
            ) : (
              <div>데이터를 로드 중입니다...</div>
            )}
          </Box>{" "}
        </Box>

        {/* <Box
                radius={15}
                className="box"
                style={{ maxWidth: "100%", flex: "1", height: "100%" }}
              >
                <h2>입출고 추이</h2>

                <Box className="box summary">
                  <TabsSummary
                    tabData={tabButtons}
                    activeKey={sum}
                    onTabChange={clicksumNum}
                    activeContent={tabButtons.find((item) => item.key === sum)}
                  />
                </Box>
              </Box> */}
      </Flex>

      <div className="main-cs-msg-wrap">
        <Box radius={15} className="box cs-msg-summary">
          <Flex style={{ justifyContent: "flex-start", alignItems: "center" }}>
            <h2 className="tit">메일 문의</h2>
            <Button type="link">더보기</Button>
          </Flex>
          <ul className="main-mailbox">
            {dummyMail.received.map((mail, index) => {
              return (
                <>
                  <li key={index} className="mail-sect">
                    <span>{mail.date}</span>
                    <span>{mail.author}</span>
                    <span className="mail-desc">{mail.desc}</span>
                  </li>
                </>
              );
            })}
          </ul>
        </Box>

        <Box radius={15} className="box cs-msg-summary">
          <Flex style={{ justifyContent: "flex-start", alignItems: "center" }}>
            <h2 className="tit">게시판 문의</h2>
            <Button type="link">더보기</Button>
          </Flex>
          <ul className="main-mailbox">
            {dummyMail.received.map((mail, index) => {
              return (
                <>
                  <li key={index} className="mail-sect">
                    <span>{mail.date}</span>
                    <span>{mail.author}</span>
                    <span className="mail-desc">{mail.desc}</span>
                  </li>
                </>
              );
            })}
          </ul>
        </Box>
      </div>
    </>
  );
};

export default First;
