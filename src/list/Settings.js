import React, { useState, useEffect, useReducer, useMemo } from "react";
import Box from "../compo/Box.tsx";
import CircleBox from "../compo/CircleBox.tsx";
import RequestStock from "../compo/RequestStock";
import TabsSummary from "../compo/TabsSummary";
import { DATA_FILTERS } from "../manage/stockData";
import { dummyStockApi } from "../manage/dummyStockApi";

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
  Avatar,
  Card,
  Calendar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import { dummyMail } from "./dummyMail.js";

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

const Settings = () => {
  const [chkDeleteModal, setChkDeleteModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);

  const [tabButtons, setTabButtons] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const rawData = await dummyStockApi(DATA_FILTERS.all);
        setTableData(rawData);

        const processedTabs = processDataForTabs(rawData);
        setTabButtons(processedTabs);

        if (processedTabs.length > 0) {
          setSum(processedTabs[0].key);
        }
      } catch (error) {
        console.error("데이터 처리 오류:", error);
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

  const clicksumNum = (key) => {
    setSum(key);
  };

  const activeContent = sumNum.find((item) => item.key === sum);

  const processDataForTabs = (data) => {
    const allTab = {
      key: "all",
      name: `전체 (${data.length})`,
      scnd: data.length,
      fir: 0,
    };

    const statusCounts = data.reduce((acc, item) => {
      const statusKey = item.status;
      acc[statusKey] = (acc[statusKey] || 0) + 1;
      return acc;
    }, {});

    const statusTabs = Object.entries(statusCounts).map(
      ([statusKey, count]) => ({
        key: statusKey,
        name: `${statusKey} (${count})`,
        scnd: count,
        fir: 0,
      })
    );

    // 전체 탭과 상태별 탭을 합쳐서 반환
    return [allTab, ...statusTabs];
  };

  return (
    <Layout>
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: "4rem",
          marginBottom: "1rem",
        }}
      >
        <span>site1</span>
        <span>site1</span>
        <span>site1</span>
      </header>
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
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              flex: "0 0 20%;",
              maxWidth: "20rem",
              width: "100%",
            }}
          >
            <Box radius={15} className="box" padding={2}>
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

          <Flex style={{ flexDirection: "column", flex: "0 0 70%" }}>
            <Flex style={{ flexDirection: "row", gap: "1rem" }}>
              <Box
                radius={15}
                className="box"
                style={{ maxWidth: "100%", flex: "1", height: "100%" }}
              >
                <h2>재고 추이</h2>

                <Box className="box summary">
                  <TabsSummary
                    tabData={tabButtons}
                    activeKey={sum}
                    onTabChange={clicksumNum}
                    activeContent={tabButtons.find((item) => item.key === sum)}
                  />
                </Box>
              </Box>

              <Box
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
              </Box>
            </Flex>

            <Box
              radius={15}
              padding={2}
              className="box"
              style={{ marginTop: "1rem" }}
            >
              <Flex
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <h2 style={{ textAlign: "left" }}>메일 문의</h2>
                <Button type="link">더보기</Button>
              </Flex>
              <ul>
                {dummyMail.received.map((mail, index) => {
                  return (
                    <>
                      <li
                        key={index}
                        style={{
                          margin: "0.3rem 0",
                          border: "1px solid gray",
                          display: "flex",
                          justifyContent: "left",
                          padding: "0.7rem 1rem",
                          gap: "0rem 3rem",
                        }}
                      >
                        <span>{mail.date}</span>
                        <span>{mail.author}</span>
                        <span className="mail-desc">{mail.desc}</span>
                      </li>
                    </>
                  );
                })}{" "}
              </ul>
            </Box>

            <Box
              radius={15}
              padding={2}
              className="box"
              style={{ marginTop: "1rem" }}
            >
              <Flex
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <h2 style={{ textAlign: "left" }}>게시판별 문의</h2>
                <Button type="link">더보기</Button>
              </Flex>{" "}
              {dummyMail.received.map((mail, index) => {
                return (
                  <>
                    <ul>
                      <li
                        key={index}
                        style={{
                          margin: "1rem 0",
                          border: "1px solid",
                          display: "flex",
                          justifyContent: "space-around",
                          padding: "0.5rem",
                        }}
                      >
                        <span>{mail.date}</span>
                        <span className="mail-desc">{mail.desc}</span>
                      </li>
                    </ul>
                  </>
                );
              })}
            </Box>
          </Flex>

          {/* <Box
            radius={15}
            className="box"
            style={{ maxWidth: "100%", flex: "1", height: "100%" }}
          >
            <Bar data={chartData} />
          </Box> */}
        </div>

        {/* <section style={{ minHeight: "100vh" }}>
          <Row className="wrapp">
            <Col size={12} style={{ border: "2px solid red" }}>
              <Flex style={{ flexDirection: "column" }}>
                <Col>
                  <Space
                    direction="horizontal"
                    style={{ marginBottom: "20px" }}
                  >
                    <Input
                      placeholder="orig"
                      name="title"
                      value={input.title}
                      onChange={handleChange}
                      style={{ width: 120 }}
                    />
                    <Input
                      placeholder="cell1"
                      name="fir"
                      type="number"
                      value={input.fir}
                      onChange={handleChange}
                      style={{ width: 100 }}
                    />
                    <Input
                      placeholder="cell2"
                      name="scnd"
                      type="number"
                      value={input.scnd}
                      onChange={handleChange}
                      style={{ width: 100 }}
                    />
                    <Button type="primary" onClick={addRow}>
                      추가
                    </Button>
                  </Space>

                  <Space style={{ marginBottom: "20px", padding: "20px" }}>
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <Input
                        placeholder="찾을 데이터 입력"
                        type="text"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<SearchOutlined />}
                        onClick={searchData}
                      />
                    </div>
                  </Space>
                </Col>

                <Col style={{ marginTop: "1rem" }}>
                  <Table
                    columns={columns}
                    dataSource={filteredData.map((item, idx) => ({
                      ...item,
                      key: idx,
                    }))}
                    onRow={(record, rowIndex) => ({
                      onClick: () => deleteRow(rowIndex),
                    })}
                    pagination={true}
                  />
                </Col>

                <Col>
                  <Bar data={chartData} />
                </Col>
              </Flex>
            </Col>
            <Col size={12} style={{ border: "2px solid red" }}>
              <div></div>

              <Flex style={{ flexDirection: "column" }}>
                <Col>
                  <Space
                    direction="horizontal"
                    style={{ marginBottom: "20px" }}
                  >
                    <Input
                      placeholder="범례"
                      name="title"
                      value={input.title}
                      onChange={handleChange}
                      style={{ width: 120 }}
                    />
                    <Input
                      placeholder="cell1"
                      name="fir"
                      type="number"
                      value={input.fir}
                      onChange={handleChange}
                      style={{ width: 100 }}
                    />
                    <Input
                      placeholder="cell2"
                      name="scnd"
                      type="number"
                      value={input.scnd}
                      onChange={handleChange}
                      style={{ width: 100 }}
                    />
                    <Button type="primary" onClick={addRow}>
                      추가
                    </Button>
                  </Space>

                  <Space style={{ marginBottom: "20px", padding: "20px" }}>
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <Input
                        placeholder="찾을 데이터 입력"
                        type="text"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<SearchOutlined />}
                        onClick={searchData}
                      />
                    </div>
                  </Space>
                </Col>
              </Flex>
            </Col>
          </Row>
          <Modal
            title="삭제 확인"
            open={chkDeleteModal}
            onOk={confirmDelete}
            onCancel={cancelDelete}
            okText="삭제"
            cancelText="취소"
          >
            <p>
              이 항목을 삭제할까요?
              <br />
              {selectedRow?.title}, {selectedRow?.fir}, {selectedRow?.scnd}
            </p>
          </Modal>
        </section> */}
      </Content>
    </Layout>
  );
};

export default Settings;
