import logo from "./logo.svg";
import React, { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import {
  SearchOutlined,
  InfoCircleTwoTone,
  QuestionCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
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
  Theme,
  Drawer,
  Avatar,
} from "antd";

import "./App.css";
import "./custom.scss";
import Settings from "./list/Settings";
import UserPage from "./list/UserPage";
import ManageStress from "./list/ManageStress";
import RequestStock from "./compo/RequestStock";
import SellManage from "./list/SellManage";
import ListStock from "./list/ListStock";
import Box from "./compo/Box.tsx";
import { dummyMail } from "./list/dummyMail.js";
import CustomDrawer from "./compo/CustomDrawer.tsx";
import NewChat from "./compo/NewChat";
import CsTemp from "./cs/CsTemp";
import Mail from "./cs/Mail";
import BoardCs from "./cs/BoardCs";

// App.js

import {
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "/", icon: <BarChartOutlined />, label: "summary" },
    { key: "/stress", icon: <FileTextOutlined />, label: "재고관리" },
    { key: "/sellManage", icon: <UserOutlined />, label: "고객관리" },
    { key: "/usrpage", icon: <UserOutlined />, label: "User Page (중첩)" },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  let currentPath = location.pathname;

  const selectedKeys = items
    .filter(
      (item) => item.key && currentPath.startsWith(item.key) && item.key !== "/"
    )
    .map((item) => item.key);

  if (currentPath === "/") {
    selectedKeys.push("/");
  }

  const finalSelectedKeys = selectedKeys.length > 0 ? selectedKeys : ["/"];

  return (
    <Sider width={150} className="left-side">
      <div
        style={{
          height: 36,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Test Logo
      </div>
      <Menu
        items={items}
        mode="inline"
        onClick={handleMenuClick}
        selectedKeys={finalSelectedKeys}
        theme="dark"
        inlineCollapsed
      />
    </Sider>
  );
};

const FixedLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", padding: "0" }}>
      <SidebarMenu />

      <Layout>
        <Content
          style={{
            margin: "10px 1rem",
            minHeight: "calc(100vh - 48px)",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

function App() {
  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState("");
  const openthis = () => {
    setOpen((a) => !a);
  };
  const openList = (name) => {
    setListOpen(name);
  };
  const closeParentModal = () => {
    setOpen(false);
    setListOpen("");
  };

  const transferStates = { open, setOpen, listOpen, setListOpen, openList };
  const newChat = (name) => {
    setListOpen("some");
  };

  const handleClose = () => {
    setListOpen("");
  };

  const contactOptions = Array.from(
    new Set(dummyMail.received.map((item) => item.author))
  ).map((author) => ({
    label: author,
    value: author,
  }));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FixedLayout />}>
            <Route index element={<Settings />} />

            <Route path="stress" element={<ManageStress />} />
            <Route path="listStock" element={<ListStock />} />

            <Route path="part/*" element={<RequestStock />} />
            <Route path="settings/*" element={<Settings />} />
            <Route path="usrpage/*" element={<UserPage />} />
            <Route path="sellmanage" element={<SellManage />} />
            {/* <Route path="mail" element={<Mail />} /> */}
            <Route path="boardcs" element={<BoardCs />} />

            <Route path="/sellManage" element={<SellManage />}>
              <Route element={<CsTemp />}>
                <Route index element={<Mail />} />
                <Route path="mail" element={<Mail />} />
                <Route path="boardCs" element={<BoardCs />} />
              </Route>
            </Route>
            <Route path="*" element={<div>404 Page Not Found</div>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <QuestionCircleOutlined
        style={{
          position: "fixed",
          right: "1rem",
          bottom: "1rem",
          fontSize: "5rem",
        }}
        onClick={openthis}
      />

      {open && (
        <Box
          className="chat-listbox"

          // onClick={() => setOpen(false)}
        >
          <div className="closeBtn" onClick={closeParentModal}>
            <CloseCircleOutlined style={{ fontSize: "2rem" }} />
          </div>
          <h1 style={{ margin: "1rem auto 2rem" }}>채팅 목록</h1>
          <Flex style={{ flexDirection: "column", gap: "1rem" }}>
            {dummyMail.received.map((name, idx) => {
              return (
                <>
                  <Box
                    style={{ padding: "1rem 10px" }}
                    className="box chat-list-box"
                    key={idx}
                    title={name.author}
                    open={open}
                    // onClick={() => openList(name.author)}
                    onClick={() => {
                      if (listOpen === name.author) {
                        setListOpen("");
                      } else {
                        setListOpen(name.author);
                      }
                    }}
                  >
                    <Avatar size={46} icon={<UserOutlined />} />
                    {name.author}
                    <div className="desc">{name.desc}</div>
                  </Box>
                  {/* // */}
                  {/* 대화 이너 */}
                  {listOpen === name.author && (
                    <>
                      <CustomDrawer
                        title={name.author}
                        transferStates={transferStates}
                        onClose={handleClose}
                      />
                    </>
                  )}
                </>
              );
            })}

            <Button type="primary" onClick={() => newChat("some")}>
              New Chat
            </Button>
            {listOpen === "some" && (
              <NewChat
                options={contactOptions}
                onClose={handleClose}
                transferStates={transferStates}
              />
            )}
          </Flex>
        </Box>
      )}
    </div>
  );
}

export default App;
