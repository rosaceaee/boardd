import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Layout, Tabs } from "antd";

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

const SellManage = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cellData, dispatch] = useReducer(reducer, initialState);
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFilteredData(cellData);
  }, [cellData]);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredData(cellData);
    }
  }, [searchKeyword, cellData]);

  const activeKey = location.pathname.includes("boardCs")
    ? "/sellManage/boardCs"
    : "/sellManage/mail";

  const items2 = [
    { key: "/sellManage/mail", label: "메일" },
    { key: "/sellManage/boardCs", label: "게시판" },
  ];
  const handleTabChange = (key) => {
    navigate(key); // URL 변경 -> Route 체크
  };

  const tabItems = items2.map((item) => ({
    key: item.key,
    label: item.label,
    children: (
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    ),
  }));

  return (
    <Layout style={{ borderRadius: "1rem" }}>
      <Tabs
        tabPosition={tabPosition}
        activeKey={activeKey}
        items={tabItems}
        onChange={handleTabChange}
        style={{ height: "100vh", padding: "1rem" }}
      />
    </Layout>
  );
};

export default SellManage;
