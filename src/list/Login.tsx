import { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Table,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";

import type { FormProps } from "antd";

const Login = () => {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("로그인 성공:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("로그인 실패:", errorInfo);
  };

  return (
    <>
      <section className="login-wrap">
        <div className="side left">
          <h1 className="tit"></h1>
        </div>

        <div className="side right">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="아이디"
              name="username"
              rules={[{ required: true, message: "아이디를 입력해주세요" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox>로그인 정보 기억하기</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                <a href="/">접속</a>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
