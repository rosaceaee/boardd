import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { dummyMail, MailData } from "./MailData";

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

const CsTemp = () => {
  const location = useLocation();

  const title = location.pathname.includes("mail")
    ? "메일 관리"
    : "게시판 관리";

  return (
    <div className="cs-temp-wrap">
      <nav className="nav-wrap">
        <Link replace to="/sellManage/mail">
          메일 관리
        </Link>

        <Link replace to="/sellManage/boardCs">
          게시판 관리
        </Link>
      </nav>
      <header>
        <h1 style={{ margin: "2rem 0" }}>{title}</h1>
      </header>
      <main
        style={{
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default CsTemp;
