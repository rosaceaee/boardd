import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
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
  Avatar,
  Card,
  Calendar,
} from "antd";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraphDashboard: React.FC<any> = ({ activeKey, activeDetailData }) => {
  const chartData = useMemo(() => {
    const chartItems = activeDetailData
      .filter((item: any) => item.history)
      .slice(0, 4);

    if (chartItems.length === 0) return { labels: [], datasets: [] };

    const labels = chartItems[0].history.map((h: any) => h.date.slice(5));

    const colors = [
      { border: "#36A2EB", bg: "rgba(54, 162, 235, 0.1)" },
      { border: "#FF6384", bg: "rgba(255, 99, 132, 0.1)" },
      { border: "#4BC0C0", bg: "rgba(75, 192, 192, 0.1)" },
      { border: "#FFCE56", bg: "rgba(255, 206, 86, 0.1)" },
    ];

    return {
      labels,
      datasets: chartItems.map((item: any, i: number) => ({
        label: item.prdName,
        data: item.history.map((h: any) => h.suryou),
        borderColor: colors[i % 4].border,
        backgroundColor: colors[i % 4].bg,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      })),
    };
  }, [activeDetailData]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
        justifyContent: "spaceBetween",
        marginTop: "2rem",
      }}
    >
      <div style={{}}>
        <div>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", margin: 0, color: "#1a1a1a" }}>
              재고 변동 이력
              {/* <span style={{ color: "#36A2EB" }}>
                {activeKey.toUpperCase()}
              </span> */}
            </h2>
            <p
              style={{ marginTop: "1rem", fontSize: "13px", color: "#8c8c8c" }}
            >
              최근 5일간의 주요 품목 재고 변동 이력입니다.
            </p>
          </div>
          <div style={{ height: "400px" }}>
            {chartData.labels?.length > 0 ? (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                  scales: { y: { beginAtZero: true } },
                }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px dashed #ddd",
                }}
              >
                분석할 데이터가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="topsoldbox">
        <h3 className="tit">raking</h3>
        {/* <ol>
          <li>
            {activeDetailData
              .filter((item: any) => item.suryou)
              .map((n: number, i: number) => n)}
          </li>
        </ol> */}
        {activeDetailData
          .filter((item: any) => item.suryou <= 10)
          .map((item: any) => (
            <div
              key={item.id}
              style={{ fontWeight: "bold", marginBottom: "4px" }}
              className="list"
            >
              ⚠️ 품절 임박: {item.prdName} (잔여: {item.suryou}개)
            </div>
          ))}
      </div>
    </div>
  );
};

export default GraphDashboard;
