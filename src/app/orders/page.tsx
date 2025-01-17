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
    <div className="p-3">
      <h2 className="text-2xl my-2">Orders page</h2>
      <ul>
        <h3 className="text-xl my-2">Orders list</h3>
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
    </div>
  );
}
