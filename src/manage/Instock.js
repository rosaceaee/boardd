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
import { FormProvider } from "rc-field-form";
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
  {
    title: "제품명",
    dataIndex: "prdName",
    key: "prdName",
  },
  {
    title: "현재 상태",
    dataIndex: "status",
    key: "status",
    render: (statusVal) => {
      let btn;
      switch (statusVal) {
        case "Instock":
          btn = (
            <Button type="primary" variant="solid">
              재고
            </Button>
          );
          break;
        case "ArrivingSoon":
          btn = (
            <Button color="purple" variant="solid">
              ArrivingSoon
            </Button>
          );
          break;
        case "NoJaiko":
          btn = (
            <Button color="pink" variant="solid">
              jaikono
            </Button>
          );
          break;
        default:
          btn = <span>{statusVal}</span>;
      }
      return btn;
    },
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

const Instock = () => {
  const [activeFilter, setActiveFilter] = useState(DATA_FILTERS.all);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);
  const [currArea, setCurrArea] = useState(null);

  const { Sider, Header, Content, Footer } = Layout;

  const [input, setInput] = useState({
    title: "",
    fir: "",
    scnd: "",
  });

  const onHeree = (a) => {
    setCurrArea(currArea === a ? null : a);
  };

  const getBoxClassName = (boxId) => {
    let className = "box";

    if (currArea === boxId) {
      className += " here";
    } else if (currArea !== null) {
      className += " hide";
    }

    return className;
  };

  useEffect(() => {
    setFilteredData(cellData);
  }, [cellData]);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredData(cellData);
    }
  }, [searchKeyword, cellData]);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  useEffect(() => {
    const fetchTableData = async () => {
      setIsLoading(true);
      setTableData([]);

      try {
        const data = await dummyStockApi(activeFilter);
        setTableData(data);
      } catch (error) {
        console.error("error: call the data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, [activeFilter]);

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

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <h2>입/출고 일람</h2>
        {/* <div style={{ display: "flex", marginLeft: "auto" }}>
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
        </div> */}
        <Row className="wrapp" style={{ flexDirection: "row" }}>
          <Col
            size={12}
            style={{ width: "100%" }}
            className={getBoxClassName("instock")}
            onClick={() => onHeree("instock")}
          >
            <Flex style={{ flexDirection: "column" }}>
              {/* <Col>
                <Space
                  direction="horizontal"
                  style={{ marginBottom: "20px" }}
                  id="instock-area"
                >
                  <InputElWrap />
                  <Button type="primary">추가</Button>
                </Space>
              </Col> */}
              <Col style={{ marginTop: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <Button
                        type={
                          activeFilter === DATA_FILTERS.stocks
                            ? "primary"
                            : "default"
                        }
                        onClick={() => handleFilterClick(DATA_FILTERS.stocks)}
                      >
                        Stocks
                      </Button>

                      <Button
                        color={
                          activeFilter === DATA_FILTERS.arriving_soon
                            ? "purple"
                            : ""
                        }
                        variant="solid"
                        onClick={() =>
                          handleFilterClick(DATA_FILTERS.arriving_soon)
                        }
                      >
                        Arriving soon
                      </Button>

                      <Button
                        color={
                          activeFilter === DATA_FILTERS.reorder ? "pink" : ""
                        }
                        variant="solid"
                        onClick={() => handleFilterClick(DATA_FILTERS.reorder)}
                      >
                        Reoder
                      </Button>
                    </div>
                  </div>

                  <div>
                    <input type="text" placeholder="search sth" />{" "}
                    <Button type="primary">go</Button>
                  </div>
                </div>

                <Table
                  columns={columns}
                  dataSource={tableData}
                  // dataSource={filteredData.map((item, idx) => ({
                  //   ...item,
                  //   key: idx,
                  // }))}
                  // onRow={(record, rowIndex) => ({
                  //   onClick: () => deleteRow(rowIndex),
                  // })}
                  pagination={true}
                />

                <Button type="primary">pdf download</Button>
              </Col>
            </Flex>
          </Col>
          {/* <Col
            size={12}
            style={{ width: "50%" }}
            className={getBoxClassName("outstock")}
            onClick={() => onHeree("outstock")}
          >
          </Col> */}
        </Row>
        <Modal
          title="삭제 확인"
          // open={chkDeleteModal}
          // onOk={confirmDelete}
          // onCancel={cancelDelete}
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

export default Instock;
