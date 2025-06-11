import { useSelector } from "react-redux";
import LinkButton from "../../ui/LinkButton";
import { getTotalItem, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalItem);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalCartQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 font-semibold uppercase text-stone-200 sm:px-6">
      <p className="space-x-3 text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity}</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
