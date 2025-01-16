import { signOut } from "@/auth";
import { columns } from "@/components/ui/orders/columns";
import { DataTable } from "@/components/ui/orders/data-table";
import * as ordersService from "@/service/orders";

export default async function Home() {
  const orders = await ordersService.getAll(0, 10);
  console.log(orders);

  return (
    <>
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
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={orders.data} />
      </div>
    </>
  );
}
