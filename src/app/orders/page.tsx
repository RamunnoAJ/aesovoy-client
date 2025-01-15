import * as ordersService from "@/service/orders";

export default async function Page() {
  const orders = await ordersService.getAll(0, 10);
  console.log(orders.data);

  return (
    <div className="p-3">
      <h2 className="text-2xl my-2">Orders page</h2>
      <ul>
        <h3 className="text-xl my-2">Orders list</h3>
        {orders.data.map((order) => (
          <li key={order.id}>{order.id}</li>
        ))}
      </ul>
    </div>
  );
}
