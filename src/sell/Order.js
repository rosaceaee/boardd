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
import { dummyStockApi } from "../manage/dummyStockApi";
import { dummyZaikoApi, DATA_FILTERS } from "../manage/dummyZaikoApi";

const initialState = [];

const columns = [
  {
    title: "제품명",
    dataIndex: "prdName",
    key: "prdName",
  },
  {
    title: "주문상태",
    dataIndex: "haisouStat",
    key: "haisouStat",
    render: (statusVal) => {
      let btn;
      switch (statusVal) {
        case "haisouReady":
          btn = (
            <Button type="primary" variant="solid">
              접수
            </Button>
          );
          break;
        case "haisou":
          btn = (
            <Button color="purple" variant="solid">
              배송준비
            </Button>
          );
          break;
        case "haisouing":
          btn = (
            <Button color="pink" variant="solid">
              배송중
            </Button>
          );
          break;
        case "haisoued":
          btn = (
            <Button color="orange" variant="solid">
              배송완료
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

const Order = () => {
  const [activeFilter, setActiveFilter] = useState(DATA_FILTERS.all);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchTableData = async () => {
      setIsLoading(true);
      setTableData([]);

      try {
        const data = await dummyZaikoApi(activeFilter);

        const cleanedData = data.filter((item) => {
          const isValid =
            item &&
            item.id !== undefined &&
            item.price !== undefined &&
            item.price !== null &&
            item.suryou !== undefined &&
            item.suryou !== null;

          return isValid;
        });

        setTableData(cleanedData);
      } catch (error) {
        console.error("error: call the data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, [activeFilter]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <>
      <section
        style={{ minHeight: "100vh", paddingTop: "calc(46 * 1rem / 16)" }}
      >
        <h2>주문배송관리</h2>

        <Row className="wrapp" style={{ flexDirection: "row" }}>
          <Col
            size={12}
            style={{ width: "100%" }}
            // className={getBoxClassName("instock")}
            // onClick={() => onHeree("instock")}
          >
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
                      activeFilter === DATA_FILTERS.all ? "primary" : "default"
                    }
                    onClick={() => handleFilterClick(DATA_FILTERS.all)}
                  >
                    All
                  </Button>

                  <Button
                    type={
                      activeFilter === DATA_FILTERS.perfume
                        ? "primary"
                        : "default"
                    }
                    onClick={() => handleFilterClick(DATA_FILTERS.perfume)}
                  >
                    Perfume
                  </Button>

                  <Button
                    type={
                      activeFilter === DATA_FILTERS.body ? "primary" : "default"
                    }
                    onClick={() => handleFilterClick(DATA_FILTERS.body)}
                  >
                    Body
                  </Button>

                  <Button
                    type={
                      activeFilter === DATA_FILTERS.candle
                        ? "primary"
                        : "default"
                    }
                    onClick={() => handleFilterClick(DATA_FILTERS.candle)}
                  >
                    Candle
                  </Button>
                </div>
              </div>

              <div>
                <input type="text" placeholder="search sth" />{" "}
                <Button type="primary">go</Button>
              </div>
            </div>
            <Flex style={{ flexDirection: "column" }}>
              <Col style={{ marginTop: "1rem" }}>
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
                  pagination={{
                    current: currentPage,
                    onChange: (page, pageSize) =>
                      handleTableChange({ current: page, pageSize: pageSize }),
                  }}
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

export default Order;
