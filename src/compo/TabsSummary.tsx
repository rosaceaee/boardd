import React, { useState, useMemo } from "react";
import CircleBox from "./CircleBox";
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
}

// 차트 데이터
const generateChartData = (
  columns: { title: string; dataIndex: string; key: string }[],
  dataSource: { [key: string]: any }[],
  labelKey: string
) => {
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

const columns = [
  { title: "Total", dataIndex: "fir", key: "fir" },
  { title: "Second", dataIndex: "scnd", key: "scnd" },
];

const TabsSummary: React.FC<CustomTabProps> = ({
  tabData,
  activeKey,
  onTabChange,
  activeContent,
}) => {
  const chartData = useMemo(
    () => generateChartData(columns, tabData, "title"),
    [columns, tabData]
  );

  return (
    <div className="tab-wrap">
      <div className="left">
        {tabData.map((item) => (
          <div
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={`left ${item.key === activeKey ? "active" : ""}`}
          >
            {item.key}
          </div>
        ))}
      </div>

      {activeContent ? (
        <div className="right">
          <h4>총 {activeContent.count}품목</h4>
          <p>{activeContent.prdName}</p>
          <Bar data={chartData} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TabsSummary;
