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
const columns1 = [
  {
    title: "제품명",
    dataIndex: "prdName",
    key: "prdName",
  },
  {
    title: "현재 상태",
    dataIndex: "status",
    key: "status",
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

const Outstock = () => {
  const [chkDeleteModal, setChkDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <h1>입/출고 리스트</h1>
        <Row className="wrapp">
          <Col size={24} style={{ border: "2px solid red", width: "100%" }}>
            <Flex style={{ flexDirection: "column" }}>
              <Col style={{ marginTop: "1rem" }}>
                {/* <Table
                  columns={columns}
                  onRow={(record, rowIndex) => ({
                    onClick: () => deleteRow(rowIndex),
                  })}
                  pagination={true}
                /> */}
                <Table columns={columns1} dataSource={nokoriData} />
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
    </>
  );
};

export default Outstock;
