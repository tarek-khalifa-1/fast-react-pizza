import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const error = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        {error && <div>{error}</div>}
        <div>
          <label>First Name</label>
          <input type="text" name="customer" />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "placing order..." : " Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priority: data.priority === "on",
    };

    if (!order.customer || !order.phone || !order.address)
      throw new Error("please enter your all required information");
    if (!isValidPhone(data.phone))
      throw new Error(
        "Please give us your correct phone number. We might need it to contacct you.",
      );
    // everything is fine, make an order
    const newOrder = await createOrder(order);
    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    // if any error exists will return and get it with useActionData hook from react router
    return error.message;
  }
}

export default CreateOrder;
