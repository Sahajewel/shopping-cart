import { useCart } from "../hooks/useCart";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  return (
    <div className="flex flec-col rounded-lg border bg-white p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain"
      />
      <h2 className="mt-3 line-clamp-2 font-semibold">{product.title}</h2>
      <p className="mt-1 text-lg font-bold text-blue-600">{product.price}</p>
      <button
        onClick={() => dispatch({ type: "ADD", payload: product })}
        className="mt-auto rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Add to cart
      </button>
    </div>
  );
}
