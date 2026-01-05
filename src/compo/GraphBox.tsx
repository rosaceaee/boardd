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

export interface StockHistory {
  date: string;
  suryou: number;
}

export interface TabItem {
  key: string;
  name: string;
  fir: number;
  scnd: number;
  count: number;
  prdName?: string;
}

export interface CustomTabProps {
  tabData: TabItem[];
  activeKey: string;
  onTabChange: (key: string) => void;
  activeContent: TabItem | undefined;
  activeDetailData: any[]; // API에서 받아온 전체 리스트 - 근데 any..?
}

const generateChartData = (prdName: string, history: StockHistory[]) => {
  if (!history || history.length === 0) {
    return { labels: [], datasets: [] };
  }

  const labels = history.map((item) => {
    const dateParts = item.date.split("-");
    return dateParts.length > 2 ? `${dateParts[1]}/${dateParts[2]}` : item.date;
  });

  const dataValues = history.map((item) => item.suryou);

  return {
    labels,
    datasets: [
      {
        label: `${prdName} 재고 추이`,
        data: dataValues,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: (context: any) => {
          const value = context.raw as number;
          if (value <= 10) return "#FF4D4F";
          if (value <= 30) return "#FFA940";
          return "#52C41A";
        },
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
};

const GraphBox: React.FC<CustomTabProps> = ({
  activeKey,
  activeContent,
  activeDetailData,
}) => {
  const chartData = useMemo(() => {
    const targetProduct = activeDetailData[0];
    if (!targetProduct || !targetProduct.history) {
      return { labels: [], datasets: [] };
    }
    return generateChartData(targetProduct.prdName, targetProduct.history);
  }, [activeDetailData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      tooltip: {
        callbacks: {
          label: (context: any) => ` 현재 재고: ${context.raw}개`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "재고 수량 (EA)",
          font: { weight: "bold" },
        },
      },
      x: {
        title: { display: true, text: "날짜" },
      },
    },
  };

  return (
    <div className="tab-wrap">
      {activeContent ? (
        <div
          className="right"
          style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}
        >
          <h4>
            {activeKey.toUpperCase()} - 총 {activeContent.count}품목
          </h4>
          <p style={{ color: "#666", fontSize: "14px" }}>
            {activeContent.prdName}
          </p>

          <div style={{ height: "300px", marginTop: "20px" }}>
            {chartData.labels && chartData.labels.length > 0 ? (
              <Line data={chartData} options={options as any} />
            ) : (
              <div className="empty-chart">데이터 없음</div>
            )}
          </div>
        </div>
      ) : (
        <div className="right">카테고리를 선택해주세요.</div>
      )}
    </div>
  );
};

export default GraphBox;
