import React, { useState, useEffect, useReducer, useMemo } from "react";
import Instock from "../manage/Instock";
import Outstock from "../manage/Outstock";
import PerfumeInvent from "../manage/PerfumeInvent";
import BodyInvent from "../manage/BodyInvent";
import CandleInvent from "../manage/CandleInvent";
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

const ListStock = () => {
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
  const chartData = useMemo(
    () => generateChartData(columns, filteredData, "title"),
    [filteredData]
  );
  const [input, setInput] = useState({
    title: "",
    fir: "",
    scnd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const { Sider, Header, Content, Footer } = Layout;

  const Txt = () => {
    const columns = [
      //상품명 상품코드 카테고리 재고수량 안전재고 상태 최근입고일 판매중단여부

      { title: "prdName", dataIndex: "title", key: "title" },
      {
        title: "status",
        dataIndex: "first",
        key: "first",

        render: (statusVal, idx) => {
          let btn;
          switch (statusVal) {
            case "ari":
              btn = <Button type="primary">승인</Button>;
              break;
            case "half":
              btn = <Button type="primary">halkf</Button>;
              break;
            case "out":
              btn = <Button type="primary">out</Button>;
              break;
            default:
              btn = <span>상태 정보 없음</span>;
          }
          return btn;
        },
      },
      {
        title: "suryou",
        dataIndex: "scnd",
        key: "scnd",
        sorter: (a, b) => a.scnd - b.scnd,
      },
      {
        title: "price",
        dataIndex: "scnd",
        key: "scnd",
        sorter: (a, b) => a.scnd - b.scnd,
      },
      {
        title: "nokori",
        dataIndex: "scnd",
        key: "scnd",
        sorter: (a, b) => a.scnd - b.scnd,
      },
    ];

    const data1 = [
      {
        key: "1",
        title: "ari",
        first: "ari",
        scnd: "1",
      },
      {
        key: "2",
        title: "out",
        first: "out",
        scnd: "77",
      },
      {
        key: "3",
        title: "John Brown",
        first: 32,
        scnd: "33",
      },
      {
        key: "4",
        title: "John Brown",
        first: 32,
        scnd: "5",
      },
      {
        key: "2",
        title: "out",
        first: "out",
        scnd: "77",
      },
      {
        key: "2",
        title: "out",
        first: "out",
        scnd: "77",
      },
      {
        key: "2",
        title: "out",
        first: "out",
        scnd: "77",
      },
    ];
    return (
      <>
        <h1>재고 현황 조회</h1>
        {/* <p>
          1. 기본 요약 정보 (상단에 카드 형태로) 한눈에 전체 상황을 볼 수 있게
          요약: 🔹 전체 상품 수 🔹 전체 재고 수량 (예: 총 12,350개) 🔹 품절 상품
          수 🔹 재고 부족 상품 수 (예: 10개 이하 남은 상품) 🔹 재입고 예정 상품
          수
        </p>
        <p>
          📊 2. 재고 상세 테이블 <br />
          상품명 상품코드 카테고리 재고수량 안전재고 상태 최근입고일
          판매중단여부
        </p>
        <p>
          3. 차트/시각화 아이디어 시각적으로 빠른 파악용: 카테고리별 재고 비율
          (파이차트) 월별 재고 변화 추이 (라인차트) 재고 부족 상위 10개 상품
          (가로바차트)
        </p>
        <p>
          4. 필터 / 검색 기능 운영자 입장에서 필수야: 카테고리, 브랜드별 필터
          재고 상태(충분 / 부족 / 품절) 상품명/코드 검색
        </p>
        <p>
          5. 추가로 있으면 좋은 기능 최근 입고 / 출고 로그 (Top 5) 재입고 알림
          설정 여부 표시 엑셀 내보내기 버튼 자동 재고 업데이트 시간 표시 (예:
          “최근 업데이트: 2025-11-04 21:00”)
        </p>

        <br />
        <br /> */}

        <div className="summ-wrap" style={{}}>
          <Box radius={15} widthh={200}>
            <h4 className="tit">전체 상품수</h4>
            <p className="num">1개</p>
          </Box>
          <Box radius={15} widthh={200}>
            <h4 className="tit">재고수량</h4>
            <p className="num">1개</p>
          </Box>
          <Box radius={15} widthh={200}>
            <h4 className="tit">품절상품수</h4>
            <p className="num">1개</p>
          </Box>
          <Box radius={15} widthh={200}>
            <h4 className="tit">재고부족상품수</h4>
            <p className="num">1개</p>
          </Box>
          <Box radius={15} widthh={200}>
            <h4 className="tit">재입고예쩡상품</h4>
            <p className="num">1개</p>
          </Box>
        </div>
        {/* xlsx파일 다운로드 팡션 추가 */}
        {/* <Bar data={chartData} /> */}
        <br />
        <br />
        <Table
          columns={columns}
          dataSource={data1}
          // dataSource={filteredData.map((item, idx) => ({
          //   ...item,
          //   key: idx,
          // }))}
          // onRow={(record, rowIndex) => ({
          //   onClick: () => deleteRow(rowIndex),
          // })}
          pagination={true}
        />
      </>
    );
  };
  const tabItms = [
    {
      key: "1",
      label: "향수",
      children: <PerfumeInvent />,
    },
    {
      key: "2",
      label: "바디",
      children: <BodyInvent />,
    },
    {
      key: "3",
      label: "candle",
      children: <CandleInvent />,
    },
  ];
  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <Tabs items={tabItms} />
      </section>
    </>
  );
};

export default ListStock;
