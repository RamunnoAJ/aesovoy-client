import axios from "axios";
import { auth, update } from "@/auth";
import * as authService from "@/service/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  if (config.skipAuth) {
    return config;
  }

  const session = await auth();
  const accessToken = session?.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default apiClient;
