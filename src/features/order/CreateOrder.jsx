import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartItems, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { fetchAddress } from "../../utils/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const formError = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCartItems);
  const { userName, status, error, position, address } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-3">
      <h2 className="mb-5 font-medium">Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div className="mb-4 flex sm:flex sm:flex-col">
          <label className="mb-3 basis-44 sm:basis-0">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              className="input"
              defaultValue={userName}
            />
          </div>
        </div>

        <div className="mb-4 flex sm:flex sm:flex-col">
          <label className="mb-3 basis-44 sm:basis-0">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
            {formError?.phone && <p>{formError.phone}</p>}
          </div>
        </div>

        <div className="mb-4 flex sm:flex sm:flex-col">
          <label className="mb-3 basis-44 sm:basis-0">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              required
              className="input"
              defaultValue={address}
              placeholder={status === "loading" ? "loading..." : ""}
            />
            {!address && (
              <span className="absolute right-0 top-[-10.5px]">
                {" "}
                <Button
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex space-x-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="focus: h-6 w-6 accent-yellow-400 ring-yellow-400 focus:outline-none focus:ring focus:ring-offset-2"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position} />
          <Button disabled={isSubmitting} type="primary" className="mt-5">
            {isSubmitting
              ? "Placing order..."
              : `Order now ${formatCurrency(totalPrice)} `}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const error = {};
  if (!isValidPhone(order.phone))
    error.phone = "Please provide a valid phone number";

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
