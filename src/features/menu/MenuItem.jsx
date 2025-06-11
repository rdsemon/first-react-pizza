import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItemQuantityById } from "../cart/cartSlice";
import DeleteItem from "../../ui/DeleteItem";
import QuantityButton from "../cart/QuantityButton";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const itemQuantity = useSelector(getItemQuantityById(id));
  const isSelect = itemQuantity > 0;
  function handleAddPizza() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-4">
      <img
        src={imageUrl}
        alt={name}
        className={`w-24 ${!soldOut ? "" : "grayscale"}`}
      />
      <div className="flex flex-grow flex-col">
        <p>{name}</p>
        <p className="capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-red-500">
              Sold out
            </p>
          )}

          {isSelect && (
            <div className="flex md:space-x-3">
              <QuantityButton currentQuantity={itemQuantity} id={id} />
              <DeleteItem id={id} />
            </div>
          )}

          {!soldOut && !isSelect && (
            <Button type="small" onClick={handleAddPizza}>
              Add to Cart
            </Button>
          )}

          {soldOut && (
            <Button type="small" disabled>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
