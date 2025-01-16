import { signOut } from "@/auth";
import { columns } from "@/components/ui/orders/columns";
import { DataTable } from "@/components/ui/orders/data-table";
import * as ordersService from "@/service/orders";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const page = parseInt(searchParams.page || "0", 10);
  const limit = parseInt(searchParams.limit || "10", 10);

  const orders = await ordersService.getAll(page, limit);

  return (
    <>
      {/* Sign Out Button */}
      <form
        className="gap-4 flex flex-col"
        action={async () => {
          "use server";
          try {
            await signOut();
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <button>Sign Out</button>
      </form>

      {/* Page and Limit Form */}
      <form className="flex gap-4 py-4" method="get">
        <label>
          Page:
          <input
            type="number"
            name="page"
            defaultValue={page}
            min={0}
            className="border rounded px-2"
          />
        </label>
        <label>
          Limit:
          <input
            type="number"
            name="limit"
            defaultValue={limit}
            min={1}
            className="border rounded px-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={orders.data} />
      </div>
    </>
  );
}
