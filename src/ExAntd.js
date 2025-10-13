import React, { useState, useEffect, useReducer } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, Modal, Space, Layout } from "antd";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((_, idx) => idx !== action.index);
    case "arrange":
      return action.payload;
    default:
      return state;
  }
}

const ExAntd = () => {
  const [chkDeleteModal, setChkDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);

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

  const columns = [
    {
      title: "범례",
      dataIndex: "title",
      key: "title",
    },
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

  return (
    <section style={{ padding: "20px" }}>
      <legend>입력:</legend>
      <Space direction="horizontal" style={{ marginBottom: "20px" }}>
        <Input placeholder="범례" name="title" value={input.title} onChange={handleChange} style={{ width: 120 }} />
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
          <Input placeholder="찾을 데이터 입력" type="text" onChange={(e) => setSearchKeyword(e.target.value)} />
          <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={searchData} />
        </div>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData.map((item, idx) => ({ ...item, key: idx }))}
        onRow={(record, rowIndex) => ({
          onClick: () => deleteRow(rowIndex),
        })}
        pagination={true}
      />

      <Modal
        title="삭제 확인"
        open={chkDeleteModal}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="삭제"
        cancelText="취소"
      >
        <p>
          {selectedRow?.title}, {selectedRow?.fir}, {selectedRow?.scnd}
        </p>
      </Modal>
    </section>
  );
};

export default ExAntd;
