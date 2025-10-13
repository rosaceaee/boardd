import React, { useState, useEffect, useReducer } from "react";
import { Table } from "antd";
import "./index.scss";

const Example = () => {
  const [chkDeleteModal, setChkDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // sample data
  const data = [];

  const initialState = data;

  function someFunc(state, action) {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "delete":
        return state.filter((_, asdf) => asdf !== action.asdf);
      case "arrange":
        return action.payload;
      default:
        return state;
    }
  }

  const [cellData, dispatch] = useReducer(someFunc, initialState);
  const [input, setInput] = useState({
    title: "",
    fir: "",
    scnd: "",
  });

  const change = (ee) => {
    const { name, value } = ee.target;
    setInput((asdf) => ({ ...asdf, [name]: value }));
  };

  const addRow = () => {
    if (input.title && input.fir && input.scnd) {
      dispatch({
        type: "add",
        payload: {
          ...input,
          first: Number(input.fir),
          second: Number(input.scnd),
        },
      });
      setInput({ title: "", fir: "", scnd: "" });
    }
  };

  // 각 행 삭제
  const deleteRow = (el) => {
    setSelectedRow({ ...cellData[el], index: el });
    // index로 데이터 연결을 하지만 특정 상수에서 다른 매개변수명으로 사용하고싶다면 저런식으로.
    setChkDeleteModal((prev) => !prev);
    // dispatch({ type: "delete", el });
  };

  const confirmDelete = () => {
    dispatch({ type: "delete", asdf: selectedRow.index });
    setChkDeleteModal(false);
    setSelectedRow(null);
  };

  const cancel = () => {
    setChkDeleteModal(false);
    setSelectedRow(null);
  };

  // 오름차순 어레인지
  const arrageCells = (e) => {
    const columnIdx = Number(e.target.getAttribute("data-column"));

    const sortKey = columnIdx === 1 ? "fir" : columnIdx === 2 ? "scnd" : null;
    if (!sortKey) return;

    const sorted = [...cellData].sort((a, b) => Number(a[sortKey]) - Number(b[sortKey]));
    dispatch({ type: "arrange", payload: sorted });
  };

  return (
    <>
      <br />

      <br />
      <section className="table-wrap">
        <div>
          <legend>입력:</legend>

          <input
            type="text"
            id="number"
            value={input.title}
            onChange={change}
            name="title"
            maxlength="20"
            placeholder="범례"
          />
          <input
            type="number"
            id="number"
            value={input.fir}
            onChange={change}
            name="fir"
            maxlength="10"
            placeholder="cell1"
          />
          <input
            type="number"
            id="number"
            value={input.scnd}
            onChange={change}
            name="scnd"
            maxlength="10"
            placeholder="cell2"
          />
          <button onClick={addRow}>추가</button>
        </div>

        <div>
          <table id="caltable">
            <thead>
              <tr>
                <th class="type1" data-column="0">
                  분류1
                </th>
                <th class="type2" data-column="1" onClick={arrageCells}>
                  분류2
                </th>
                <th class="type2" data-column="2">
                  분류3
                </th>
              </tr>
            </thead>

            {cellData.length > 0 && (
              <tbody>
                {cellData.map((cont, index) => (
                  <tr key={index} onClick={() => deleteRow(index)}>
                    <td>{cont.title}</td>
                    <td>{cont.fir}</td>
                    <td>{cont.scnd}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {chkDeleteModal && selectedRow && (
          <>
            <div class="modal-wrap">
              <h4>
                이거 없앨거야? <br /> 너가 삭제하려는 데이터는 이거야.
              </h4>
              <br />
              <p className="last-chk">
                {selectedRow.title},{selectedRow.fir},{selectedRow.scnd}
              </p>

              <div class="btn-wrap">
                <button type="button yes" onClick={confirmDelete}>
                  ㅇㅇ
                </button>
                <button type="button no" onClick={cancel}>
                  ㄴㄴ
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Example;
