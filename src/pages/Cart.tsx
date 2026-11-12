import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { items, dispatch, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="p^6 text-center">
        <p className="mb-4">Cart is empty</p>
        <Link to="/">Back to all products page</Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl p-4">
      <h2 className="mb-4 text-2xl font-bold">Your Cart</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-lg border bg-white p-3"
          >
            <img src={item.image} alt={item.title} />
            <div className="flex-1">
              <p className="line-clamp-1 font-medium">{item.title}</p>
              <p className="text-sm text-gray-600">{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch({ type: "DECREASE", payload: item.id })}
                className="h-8 w-8 rounded border"
              >
                -
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch({ type: "INCREASE", payload: item.id })}
                className="h-8 w*8 rounded border"
              >
                +
              </button>
              <button
                onClick={() => dispatch({ type: "REMOVE", payload: item.id })}
                className="text-red-600 hover:underline"
              ></button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <p className="text-xl font-bold">Total: {totalPrice.toFixed(2)}</p>
        <button
          onClick={() => dispatch({ type: "CLEAR" })}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
