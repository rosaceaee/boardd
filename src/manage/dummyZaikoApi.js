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

const flattenCategory = (categoryData) => {
  if (!categoryData) return [];

  if (Array.isArray(categoryData) && categoryData[0]?.prdName)
    return categoryData;

  return categoryData.flatMap((subGroup) => {
    return Object.values(subGroup).flat();
  });
};

export const dummyZaikoApi = (categoryKey) => {
  let processedData = [];

  if (categoryKey === DATA_FILTERS.all) {
    processedData = Object.keys(dataMap).flatMap((key) =>
      flattenCategory(dataMap[key])
    );
  } else {
    processedData = flattenCategory(dataMap[categoryKey]);
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(processedData), 100);
  });
};
