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
import Box from "../compo/Box.tsx";

const ReportSell = () => {
  const [chkDeleteModal, setChkDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [tabPosition, setTabPosition] = useState("left");

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
  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <h1> 매출 현황 분석</h1>
        <div className="summ-wrap" style={{ display: "flex" }}>
          <Box className="tit" radius={15} widthh={100}>
            전체 상품수
            <p className="num">1개</p>
          </Box>
          <Box className="tit" radius={15} widthh={100}>
            재고슈량<p className="num">1개</p>
          </Box>
          <Box className="tit" radius={15} widthh={100}>
            품절상품수<p className="num">1개</p>
          </Box>
          <Box className="tit" radius={15} widthh={100}>
            재고부족상품수<p className="num">1개</p>
          </Box>
          <Box className="tit" radius={15} widthh={100}>
            재입고예쩡상품<p className="num">1개</p>
          </Box>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData.map((item, idx) => ({
            ...item,
            key: idx,
          }))}
          pagination={true}
        />

        <p>
          매출 추이 그래프 (기간별) 가장 많이 보는 섹션. 일별 / 주별 / 월별 매출
          추이
        </p>

        <p>
          🛍️ 3. 상품별 / 카테고리별 매출 비율 <br />
          상품 TOP 10 (Bar Chart or Table) 순위 상품명 판매수량 매출액 비율 1
          블랙 티셔츠 210 ₩2,310,000 6.5% 카테고리별 매출 비중 (Pie Chart or
          Donut Chart) 예: 의류 45% / 잡화 30% / 뷰티 15% / 기타 10%
        </p>
      </section>
    </>
  );
};

export default ReportSell;
