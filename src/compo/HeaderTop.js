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
  Avatar,
  Card,
  Calendar,
} from "antd";

const HeaderTop = () => {
  return (
    <>
      <header className="headerTop">
        <h1 style={{ color: "#fff" }}>Manage</h1>
        <Flex style={{ gap: "3rem" }}>
          <a href="sellManage/mail">Mall</a>
          <a href="" target="_blank">
            Insta
          </a>
        </Flex>
      </header>
    </>
  );
};
export default HeaderTop;
