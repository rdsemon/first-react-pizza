import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useFetcher } from "react-router-dom";

function OrderUpdate() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default OrderUpdate;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
