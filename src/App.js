import logo from "./logo.svg";

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
} from "antd";

import "./App.css";
import "./custom.scss";
import Settings from "./list/Settings";
import UserPage from "./list/UserPage";
import ManageStress from "./list/ManageStress";
import RequestStock from "./compo/RequestStock";
import SellManage from "./list/SellManage";
import ListStock from "./list/ListStock";
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
    { key: "/stress", icon: <UserOutlined />, label: "재고관리" },
    { key: "/sellManage", icon: <FileTextOutlined />, label: "매출관리" },
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
            <Route path="sellmanage/*" element={<SellManage />} />

            <Route path="*" element={<div>404 Page Not Found</div>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <QuestionCircleOutlined
        style={{
          position: "fixed",
          right: "1rem",
          top: "1rem",
          fontSize: "2rem",
        }}
      />
    </div>
  );
}

export default App;
