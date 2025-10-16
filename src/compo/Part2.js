import React, { useState, useEffect, useReducer, useMemo } from "react";
import { SearchOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Layout, Row, Col, Menu, Table, Input, Button, Modal, Space, Dropdown, Flex, Tabs } from "antd";

const Part = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <h1>part222</h1>
      </section>
    </>
  );
};

export default Part;
