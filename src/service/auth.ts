import axios from "axios";
import { BASE_URL } from "./base";

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed login attempt");
  }
}

export async function refreshToken(id: number, refreshToken: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      id,
      refreshToken,
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
}
