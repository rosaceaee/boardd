import React, { useState, useEffect, useReducer, useMemo } from "react";

import { SearchOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Layout, Row, Col, Menu, Table, Input, Button, Modal, Space, Dropdown, Flex, Tabs } from "antd";

import { useNavigate } from "react-router-dom";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, 0.5)`,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: 1,
    }));

  return { labels, datasets };
};

const columns = [
  { title: "범례", dataIndex: "title", key: "title" },
  { title: "하나", dataIndex: "fir", key: "fir", sorter: (a, b) => a.fir - b.fir },
  { title: "둘", dataIndex: "scnd", key: "scnd", sorter: (a, b) => a.scnd - b.scnd },
];

const ExAntd = () => {
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
  const chartData = useMemo(() => generateChartData(columns, filteredData, "title"), [filteredData]);

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
      <Sider width={200}>
        <Menu items={items} mode="inline" theme="dark" onClick={handleMenuClick} />
      </Sider>
    );
  };

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const items2 = [
    { key: "/settings", label: "basic setting" },
    { key: "/sub12", label: "sub12" },
    {
      key: "",
      label: "sub3",
    },
  ];

  return (
    <Layout>
      {/* <Sider width={200} trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu items={items} mode="inline" theme="dark" onClick={(a) => a} />
      </Sider>       */}
      <SidebarMenu />
      <Tabs
        tabPosition={tabPosition}
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
      <Content>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <InfoCircleTwoTone style={{ fontSize: "1.4rem", position: "fixed", right: "1rem", margin: "1rem" }} />
          </a>
        </Dropdown>
        <section style={{ minHeight: "100vh" }}>
          <Row className="wrapp">
            <Col size={12} style={{ border: "2px solid red" }}>
              <Flex style={{ flexDirection: "column" }}>
                <Col>
                  <Space direction="horizontal" style={{ marginBottom: "20px" }}>
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
                      <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={searchData} />
                    </div>
                  </Space>
                </Col>

                <Col style={{ marginTop: "1rem" }}>
                  <Table
                    columns={columns}
                    dataSource={filteredData.map((item, idx) => ({ ...item, key: idx }))}
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
                  <Space direction="horizontal" style={{ marginBottom: "20px" }}>
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
                      <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={searchData} />
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
        </section>
      </Content>
    </Layout>
  );
};

export default ExAntd;
