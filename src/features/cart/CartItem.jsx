import { formatCurrency } from "../../utils/helpers";

import DeleteItem from "../../ui/DeleteItem";
import QuantityButton from "./QuantityButton";
import { useSelector } from "react-redux";
import { getItemQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getItemQuantityById(pizzaId));


  return (
    <li className="mb-3 flex items-center justify-between">
      <div className="mr-6 flex grow items-center justify-between">
        <p className="">
          {quantity}&times; {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>

      <div className="flex items-center space-x-3">
        <QuantityButton id={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
