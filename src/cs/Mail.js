import React, { useState, useEffect, useReducer, useMemo } from "react";
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
  TextArea,
} from "antd";

const Mail = () => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const mail = dummyMail;

  const columns = [
    {
      title: "날짜",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "작성자",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setDetail(null);
    setIsReplying(false);
    setReplyContent("");
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={mail.received}
        rowKey={mail.key}
        destroyOnClose={true}
        onRow={(record) => {
          return {
            onClick: () => {
              setDetail(record); // 클릭한 행의 데이터 저장
              setOpen(true); // 모달 열기
            },
            style: { cursor: "pointer" }, // 클릭 가능하다는 표시
          };
        }}
      />

      <Modal
        open={open}
        onOk={() => setDetail(false)}
        onCancel={handleClose}
        footer={null}
        destroyOnClose
        transitionName=""
        maskTransitionName=""
        width="auto"
        className="reply-container"
        // styles={{
        //   content: {
        //     position: "fixed",
        //     bottom: "1rem",
        //     left: "50%",
        //     transform: "translateX(-50%)",
        //     maxWidth: "1000px",
        //     width: "calc(100% - 2rem)",
        //     margin: 0,
        //   },
        // }}
      >
        {detail && (
          <div className="mail-reply-wrap" style={{ paddingTop: "10px" }}>
            <h2 style={{ margin: "0.5rem 0 1rem" }}>답장하기</h2>
            <div className="usr-info">
              <p>
                <strong>날짜:</strong> {detail.date}
              </p>
              <p>
                <strong>발신자:</strong> {detail.author}
              </p>
              <p>
                <strong>제목:</strong> {detail.title}
              </p>
            </div>

            <hr />
            <div className="mail-body">
              <p>{detail.desc}</p>
            </div>
          </div>
        )}

        {!isReplying ? (
          <Button type="primary" onClick={() => setIsReplying(true)}>
            답장하기
          </Button>
        ) : (
          <div className="reply-wrap">
            <Input.TextArea
              rows={4}
              placeholder="답장 내용을 입력ㄱ"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <Flex
              style={{
                marginTop: "1rem",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <Button type="primary">전송하기</Button>
              <Button onClick={() => setIsReplying(false)}>취소</Button>
            </Flex>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Mail;

{
  /*

const dataMap = {
    perfume: [
      {
        floral: [
          {
            id: "p1",
            prdName: "Midnight Floral",
            status: "Instock",
            suryou: 45,
            price: 150000,
            haisouStat: "haisou",
            history: [
              { date: "2025-12-25", suryou: 50 },
              { date: "2025-12-26", suryou: 48 },
              { date: "2025-12-27", suryou: 45 },
            ],
          },
          {
            id: "p2",
            prdName: "Spring Bloom",
            status: "Instock",
            suryou: 12,
            price: 120000,
            haisouStat: "haisouing",
  
            history: [
              { date: "2025-12-25", suryou: 20 },
              { date: "2025-12-26", suryou: 15 },
              { date: "2025-12-27", suryou: 12 },
            ],
          },
        ],
        woody: [
          {
            id: "p3",
            prdName: "Deep Forest",
            status: "ArrivingSoon",
            haisouStat: "haisou",
            suryou: 5,
            price: 180000,
            history: [
              { date: "2025-12-25", suryou: 8 },
              { date: "2025-12-26", suryou: 7 },
              { date: "2025-12-27", suryou: 5 },
            ],
          },
        ],
      },
    ],
    body: [
      {
        hair: [
          {
            id: "b1",
            prdName: "Silk Shampoo",
            status: "lowQ",
            suryou: 80,
            price: 45000,
            haisouStat: "haisoued",
  
            history: [
              { date: "2025-12-25", suryou: 85 },
              { date: "2025-12-26", suryou: 82 },
              { date: "2025-12-27", suryou: 80 },
            ],
          },
        ],
        hand: [
          {
            id: "b2",
            prdName: "Velvet Cream Treatment",
            status: "Instock",
            suryou: 3,
            price: 28000,
            haisouStat: "haisouReady",
  
            history: [
              { date: "2025-12-25", suryou: 10 },
              { date: "2025-12-26", suryou: 5 },
              { date: "2025-12-27", suryou: 3 },
            ],
          },
        ],
      },
    ],
    candle: [
      // 캔들은 depth가 하나 적은 구조일 경우
      {
        id: "c1",
        prdName: "Warm Cotton",
        status: "Instock",
        suryou: 25,
        price: 35000,
        haisouStat: "haisouReady",
  
        history: [
          { date: "2025-12-25", suryou: 30 },
          { date: "2025-12-26", suryou: 28 },
          { date: "2025-12-27", suryou: 25 },
        ],
      },
    ],
  };
  
  export const DATA_FILTERS = {
    all: "all",
    perfume: "perfume",
    body: "body",
    candle: "candle",
  };
  
  // 2. 핵심 로직: 복잡한 중첩 구조를 평탄화(Flatten)하는 함수
  const flattenCategory = (categoryData) => {
    if (!categoryData) return [];
  
    // 만약 바로 배열 안에 상품이 들어있는 형태라면 (예: candle)
    if (Array.isArray(categoryData) && categoryData[0]?.prdName)
      return categoryData;
  
    // 객체(소분류)들이 담긴 배열인 경우 (예: perfume, body)
    return categoryData.flatMap((subGroup) => {
      // subGroup 예: { floral: [...], woody: [...] }
      return Object.values(subGroup).flat();
    });
  };
  
  // 3. API 호출 함수
  export const dummyZaikoApi = (categoryKey) => {
    let processedData = [];
  
    if (categoryKey === DATA_FILTERS.all) {
      // 모든 키를 순회하며 평탄화하여 합침
      processedData = Object.keys(dataMap).flatMap((key) =>
        flattenCategory(dataMap[key])
      );
    } else {
      // 특정 카테고리만 평탄화
      processedData = flattenCategory(dataMap[categoryKey]);
    }
  
    return new Promise((resolve) => {
      setTimeout(() => resolve(processedData), 100);
    });
  };
  


  const handleSend = (values: Record<string, any>) => {
    const text = values.user?.introduction;
    if (!text || !text.trim()) return;

    const newMessage = {
      id: Date.now(), 
      text: text,
      type: "sent", 
    };

    // 3. 기존 배열 뒤에 새 메시지 추가 (Append 효과)
    setMessages((prev) => [...prev, newMessage]);

    form.resetFields();
  };*/
}
