"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Orders = {
  id: number;
  total: number;
  state: "todo" | "done" | "delivered" | "cancelled";
  client: {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    reference: string;
    cuit: string;
    type: "individual" | "wholesaler";
  };
};

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "client.cuit",
    header: "CUIT",
  },
  {
    accessorKey: "client.name",
    header: "Nombre",
  },
  {
    accessorKey: "state",
    header: "Estado",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
