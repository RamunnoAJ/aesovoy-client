"use server";
import apiClient from "@/lib/apiClient";

export async function getAll(page: number, limit: number) {
  try {
    const response = await apiClient.get(
      `/orders?page=${page}&limit=${limit}`,
      { skipAuth: false },
    );

    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get the orders");
  }
}
