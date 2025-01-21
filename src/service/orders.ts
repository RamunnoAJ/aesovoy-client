"use server";
import { mapState } from "@/enums/state";
import apiClient from "@/lib/apiClient";
import { Order } from "@/mapper/dto/order.dto";
import { mapResponseToDTO } from "@/mapper/mapResponseToDto";

export async function getAll(
  page: number,
  limit: number,
  cuit: string,
  name: string,
) {
  try {
    const response = await apiClient.get(
      `/orders?page=${page}&limit=${limit}&cuit=${cuit}&name=${name}`,
    );
    response.data.data = response.data.data.map((d: Order) =>
      mapResponseToDTO<Order, typeof d>(d, undefined, {
        state: (value) => mapState(value as string),
      }),
    );

    console.log(response.data.data);

    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get the orders");
  }
}
