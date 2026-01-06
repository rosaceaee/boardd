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
  InputNumber,
  Popover,
} from "antd";
import { FormProvider } from "rc-field-form";
import { dummyStockApi } from "../manage/dummyStockApi";
import { dummyZaikoApi, DATA_FILTERS } from "../manage/dummyZaikoApi";
import { inventoryApi } from "../api/inventoryApi";

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

const Instock = ({ onApplySuccess, selectedCategory }) => {
  const [activeFilter, setActiveFilter] = useState(DATA_FILTERS.all);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openId, setOpenId] = useState(null);

  const { Sider, Header, Content, Footer } = Layout;

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

  const handleOpenChange = (newOpen, record) => {
    if (newOpen) {
      setOpenId(record.key);
      setStep(1);
      setNum(0);
    } else {
      setOpenId(null);
    }
  };

  const hide = () => setOpenId(null);
  const done = (statusVal) => {
    setOpenId(null);
    statusVal = "Arrivingsoon";
    console.log(statusVal);
    return statusVal;
  };

  const [modifiedStatus, setModifiedStatus] = useState({});
  // 재고추가 팝오버 완료 -> 스테이터스 변경
  const changeStatus = (id, nextStatus) => {
    setModifiedStatus((prev) => ({
      ...prev,
      [id]: nextStatus,
    }));
  };

  const [step, setStep] = useState(1);
  const [num, setNum] = useState(0);
  const handleRequestApi = async (record) => {
    const mappedData = {
      key: record.id,
      name: record.prdName,
      count: num,
      date: new Date().toLocaleString(),
      status: "신청완료",
    };

    onApplySuccess(mappedData);
    setStep(3);
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
      render: (statusVal, record) => {
        const currentStatus = modifiedStatus[record.id] || statusVal;
        let btn;
        switch (currentStatus) {
          case "Instock":
            btn = (
              <Button type="primary" variant="solid">
                여유
              </Button>
            );
            break;
          case "ArrivingSoon":
            btn = (
              <Button color="purple" variant="solid">
                재고 추가요청중
              </Button>
            );
            break;
          case "lowQ":
            btn = (
              <Popover
                open={openId === record.id}
                onOpenChange={(visible) => {
                  setOpenId(visible ? record.id : null);
                  setStep(1);
                }}
                content={
                  <div className="step-wrap">
                    {step === 1 && (
                      <div className="inner step1">
                        <span className="desc">
                          재고가 부족합니다. 몇 개 신청할래?
                          <br />
                          <span className="note">
                            숫자를 입력하거나 증감 버튼으로 조작 가넝
                          </span>
                          {/* {record.prdName} */}
                        </span>

                        <div className="input-wrap">
                          <InputNumber
                            min={1}
                            // onChange={(value) => setNum(value)}
                            onChange={(v) => setNum(v || 0)}
                          />
                          <span
                            style={{ fontSize: "1rem", marginLeft: "0.5rem" }}
                          >
                            개
                          </span>
                        </div>

                        <div className="confirm-btn-wrap">
                          <Button
                            type="primary"
                            onClick={() => setStep(2)}
                            disabled={!num}
                          >
                            확인
                          </Button>
                          <Button type="dashed" onClick={hide}>
                            취소
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="inner step2">
                        {/* <p>
                          <strong>{num}개</strong> 맞아?
                        </p>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Button type="primary" onClick={() => setStep(3)}>
                            응, 맞아
                          </Button>
                          <Button onClick={() => setStep(1)}>
                            아니, 수정할래
                          </Button> </div> */}
                        <span className="desc">
                          <strong>{num}개</strong> 맞아?
                        </span>

                        <div className="confirm-btn-wrap">
                          <Button
                            type="primary"
                            onClick={() => {
                              // console.log("전송 데이터:", record, num);
                              onApplySuccess({
                                id: record.id,
                                name: record.prdName,
                                amount: num,
                              });
                              setStep(3);
                            }}
                          >
                            전송
                          </Button>
                          <Button type="dashed" onClick={() => setStep(1)}>
                            아니, 수정할래
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div
                        className="inner step3"
                        style={{ textAlign: "center" }}
                      >
                        <p className="desc">
                          {num}개 신청 완료. <br /> 상세내역은 다음 탭에서 확인
                        </p>
                        <div className="confirm-btn-wrap">
                          <Button
                            onClick={() => {
                              changeStatus(record.id, "ArrivingSoon");
                              onApplySuccess({
                                ...record,
                                status: "ArrivingSoon",
                                amount: num,
                              });
                            }}
                          >
                            완료
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                }
                title=""
                trigger="click"
                // open={openId === record.key}
                // onOpenChange={(newOpen) => handleOpenChange(newOpen, record)}
              >
                <Button color="pink" variant="solid">
                  재고없음
                </Button>
              </Popover>
            );
            break;
          default:
            btn = <span>{currentStatus}</span>;
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

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <h2>입/출고 일람</h2>

        <Row className="wrapp" style={{ flexDirection: "row" }}>
          <Col size={12} style={{ width: "100%" }}>
            <Flex style={{ flexDirection: "column" }}>
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
                          activeFilter === DATA_FILTERS.all
                            ? "primary"
                            : "default"
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
                          activeFilter === DATA_FILTERS.body
                            ? "primary"
                            : "default"
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

                <Table
                  columns={columns}
                  dataSource={tableData}
                  rowKey="id"
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

export default Instock;
