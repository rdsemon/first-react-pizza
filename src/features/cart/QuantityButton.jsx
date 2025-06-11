import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQunatity } from "./cartSlice";
function QuantityButton({ id, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <span className="mt-2">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQunatity(id))}>
        +
      </Button>
    </div>
  );
}

export default QuantityButton;
