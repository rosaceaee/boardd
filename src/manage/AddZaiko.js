import React, { useState, useEffect, useReducer, useMemo } from "react";
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
  InputNumber,
  Popover,
  Form,
  Radio,
  Select,
  TreeSelect,
  Cascader,
} from "antd";
import Box from "../compo/Box";
// open={open}
// onApplySuccess={onApplySuccess}
// selectedCategory={selectedCategory}

const AddZaiko = ({ open, close, onApplySuccess, selectedCategory }) => {
  return (
    <>
      <Modal
        title={
          <div style={{ width: "100%" }} open={open}>
            재고 추가 / 수정
          </div>
        }
        open={open}
        close={close}
        onApplySuccess={onApplySuccess}
        selectedCategory={selectedCategory}
      >
        <Box
          style={{ margin: "2rem 0", display: "flex", flexDirection: "column" }}
        >
          <Form.Item label="제품명">
            {/* <Cascader
            options={[
              {
                value: "perfume",
                label: "perfume",
                children: [{ value: "soap", label: "soap" }],
              },
            ]}
          /> */}

            <TreeSelect
              treeData={[
                // 4가지 향으로 대분류하고 그 안에 제품명으로 소분류
                {
                  title: "향수",
                  value: "perfume",
                  children: [
                    { title: "Soap", value: "Soap" },
                    { title: "floral", value: "floral" },
                  ],
                },
                {
                  title: "캔들",
                  value: "candle",
                  children: [
                    { title: "Soap", value: "Soap" },
                    { title: "floral", value: "floral" },
                  ],
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="수량">
            <InputNumber min={0} defaultValue={0} />
            {/* <Select options={[{ label: "Demo", value: "demo" }]} /> */}
          </Form.Item>

          <Form.Item label="가격">
            <InputNumber /> 원
            {/* <Select options={[{ label: "Demo", value: "demo" }]} /> */}
          </Form.Item>
        </Box>
      </Modal>
    </>
  );
};

export default AddZaiko;
