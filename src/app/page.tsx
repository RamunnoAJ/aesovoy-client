import { signOut } from "@/auth";
import * as ordersService from "@/service/orders";

export default async function Home() {
  const orders = await ordersService.getAll(0, 10);

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
      <div className="flex flex-col gap-2">
        {orders?.data.map((order) => (
          <div key={order.id}>
            {order.id} - {order.state} - {order.client.cuit} -{" "}
            {order.client.name}
          </div>
        ))}
      </div>
    </>
  );
}
