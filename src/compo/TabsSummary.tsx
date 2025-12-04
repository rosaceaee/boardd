import React, { useState } from "react";
import CircleBox from "./CircleBox";
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

const TabsSummary: React.FC<CustomTabProps> = ({
  tabData,
  activeKey,
  onTabChange,
  activeContent,
}) => {
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
          <h1>
            {" "}
            {activeContent.count}
            <br />
            {activeContent.prdName}
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TabsSummary;
