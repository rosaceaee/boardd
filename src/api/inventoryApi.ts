// 나중에 supabase같은 백엔드쪽 확장할 때 사용 예정.

import api from "./axiosInstance";

export interface StockRequestParams {
  itemId: string | number;
  quantity: number;
  status: string;
}

export const inventoryApi = {
  postStockRequest: async (params: StockRequestParams) => {
    const response = await api.post("/inventory/requests", params);
    return response.data;
  },

  // 목록 조회 api
  fetchStockList: async () => {
    const response = await api.get("/inventory/list");
    return response.data;
  },
};
