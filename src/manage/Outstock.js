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

import { DATA_FILTERS } from "../manage/stockData";
import { dummyStockApi } from "../manage/dummyStockApi";

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

const Outstock = ({ data }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);
  const [nokoriData, setNokoriData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await dummyStockApi(DATA_FILTERS.nokori);
      setNokoriData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

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

  const { Sider, Header, Content, Footer } = Layout;
  const columns = [
    { title: "신청일시", dataIndex: "date", key: "date" },
    { title: "상품명", dataIndex: "name", key: "name" },
    { title: "신청수량", dataIndex: "amount", key: "amount" },
    { title: "상태", dataIndex: "status", key: "status" },
  ];

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <h1>재고 신청 현황</h1>
        <Row className="wrapp">
          <Col size={24} style={{ width: "100%" }}>
            <Flex style={{ flexDirection: "column" }}>
              <Col style={{ marginTop: "1rem" }}>
                <Table
                  columns={columns}
                  dataSource={data}
                  locale={{ emptyText: "신청된 내역이 없습니다." }}
                />
              </Col>
            </Flex>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Outstock;
