"use client";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { columns } from "@/components/ui/orders/columns";
import { DataTable as OrdersTable } from "@/components/ui/orders/data-table";
import { useDebounce } from "@/hooks/use-debouncer";
import * as ordersService from "@/service/orders";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [cuit, setCuit] = useState("");
  const [name, setName] = useState("");
  const debouncedCuit = useDebounce(cuit, 500);
  const debouncedName = useDebounce(name, 500);
  const { data, isLoading } = useQuery({
    queryFn: async () => await ordersService.getAll(page, limit, cuit, name),
    queryKey: ["orders", page, limit, debouncedCuit, debouncedName],
  });

  return (
    <ul>
      {isLoading ? (
        <DataTableSkeleton columnCount={5} />
      ) : (
        <OrdersTable
          cuit={cuit}
          setCuitAction={setCuit}
          name={name}
          setNameAction={setName}
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
