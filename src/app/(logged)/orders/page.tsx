"use client";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { columns } from "@/components/ui/orders/columns";
import { DataTable as OrdersTable } from "@/components/ui/orders/data-table";
import * as ordersService from "@/service/orders";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useQuery({
    queryFn: async () => await ordersService.getAll(page, limit),
    queryKey: ["orders", page, limit],
  });

  return (
    <ul className="p-3 w-full">
      {isLoading ? (
        <DataTableSkeleton columnCount={5} />
      ) : (
        <OrdersTable
          setLimitAction={setLimit}
          data={data.data}
          columns={columns}
          page={page}
          setPageAction={setPage}
          totalPages={Math.ceil(data.total / limit)}
        />
      )}
    </ul>
  );
}
