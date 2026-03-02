// 나중에 supabase같은 백엔드쪽 확장할 때 사용 예정.
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;
