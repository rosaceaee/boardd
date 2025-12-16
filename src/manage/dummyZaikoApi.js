export const DATA_FILTERS = {
  all: "all",
  perfume: "perfume",
  body: "body",
  candle: "candle",
};

const dataMap = {
  perfume: [
    {
      floral: [
        {
          id: "perfume1",
          prdName: "플로럴1",
          status: "Instock",
          suryou: 50,
          price: 1500000,
        },
        {
          id: "perfume2",
          prdName: "플로럴2",
          status: "Instock",
          suryou: 50,
          price: 1500000,
        },
        {
          id: "perfume3",
          prdName: "플로럴3",
          status: "Instock",
          suryou: 50,
          price: 1500000,
        },
      ],
    },
    {
      clean: [
        {
          id: "perfume1",
          prdName: "클린1",
          status: "ArrivingSoon",
          suryou: 50,
          price: 1500000,
        },
        {
          id: "perfume2",
          prdName: "클린2",
          status: "Instock",
          suryou: 50,
          price: 1500000,
        },
        {
          id: "perfume3",
          prdName: "클린3",
          status: "Instock",
          suryou: 50,
          price: 1500000,
        },
      ],
    },
    {
      woody: [
        {
          id: "perfume1",
          prdName: "우디1",
          status: "Instock",
          suryou: 50,
          price: 1500000,
        },
        {
          id: "perfume2",
          prdName: "우디2",
          status: "ArrivingSoon",
          suryou: 50,
          price: 1500000,
        },
        {
          id: "perfume3",
          prdName: "우디3",
          status: "Instock",
          suryou: 50,
          price: 1500000,
        },
      ],
    },
  ],
  body: [
    {
      hair: [
        {
          id: 101,
          cate: "wash",
          prdName: "플로럴1",
          suryou: 50,
          price: 1500000,
        },
        {
          id: 2,
          cate: "treatment",
          prdName: "222",
          suryou: 50,
          price: 1500000,
        },
      ],
      hand: [
        {
          id: 101,
          cate: "wash",
          prdName: "플로럴1",
          suryou: 50,
          price: 1500000,
        },
        {
          id: 2,
          cate: "treatment",
          prdName: "222",
          suryou: 50,
          price: 1500000,
        },
      ],
    },
  ],
  candle: [
    {
      id: 101,
      prdName: "플로럴1",
      status: "Instock",
      suryou: 50,
      price: 1500000,
    },
    {
      id: 102,
      prdName: "플로럴1",
      status: "Instock",
      suryou: 50,
      price: 1500000,
    },
  ],
};

export const dummyZaikoApi = (status) => {
  let data;

  if (status === DATA_FILTERS.all) {
    // Flatten all data from dataMap
    data = Object.values(dataMap).flatMap((category) =>
      Array.isArray(category)
        ? category.flatMap((item) => Object.values(item).flat())
        : []
    );
  } else {
    data = dataMap[status] || [];
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 50);
  });
};
