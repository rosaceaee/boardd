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
        style={{ maxWidth: "1000px", width: "90%", padding: 0 }}
        styles={{
          content: {
            position: "fixed",
            bottom: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "1000px",
            width: "calc(100% - 2rem)",
            margin: 0,
          },
        }}
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
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
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
