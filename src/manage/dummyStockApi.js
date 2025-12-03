/*** 입출고 관련 데이터 ***/

import { DATA_FILTERS } from "./stockData.js";

const dataMap = {
  stocks: [
    {
      id: 101,
      prdName: "플로럴1",
      status: "Instock",
      suryou: 50,
      price: 1500000,
    },
    {
      id: 102,
      prdName: "플로럴2",
      status: "Instock",
      suryou: 200,
      price: 80000,
    },
  ],
  arriving_soon: [
    {
      id: 201,
      prdName: "파우더리1",
      status: "ArrivingSoon",
      suryou: 75,
      price: 350000,
    },
    {
      id: 202,
      prdName: "222파우더리1",
      status: "ArrivingSoon",
      suryou: 75,
      price: 350000,
    },
  ],
  reorder: [
    {
      id: 301,
      prdName: "캔들1",
      status: "Instock",
      suryou: 10,
      price: 25000,
    },
    {
      id: 302,
      prdName: "캔들2",
      status: "reorder",
      suryou: 0,
      price: 60000,
      key: "sibal",
    },
  ],
  nokori: [
    {
      id: 401,
      prdName: "디퓨저1",
      status: "NoJaiko",
      suryou: 0,
      price: 120000,
      key: "nokori111",
    },
    {
      id: 402,
      prdName: "디퓨저2",
      status: "NoJaiko",
      suryou: 0,
      price: 90000,
      key: "nokori1111",
    },
  ],
};

// export const dummyStockApi = (status) => {
//   const data = dataMap[status] || [];

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data);
//     }, 500);
//   });
// };

export const dummyStockApi = (status) => {
  const stocksData = dataMap["stocks"] || [];
  const arrivingSoonData = dataMap["arriving_soon"] || [];
  const reorderData = dataMap["reorder"] || [];

  let data;

  if (status === DATA_FILTERS.all) {
    data = [...stocksData, ...arrivingSoonData, ...reorderData];
  } else {
    data = dataMap[status] || [];
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 50);
  });
};
