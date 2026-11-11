import ProductCard from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import type { Product } from "../types";

export default function Products() {
  const { data, loading, error } = useFetch<Product[]>(
    "https://fakestoreapi.com/products",
  );

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  return (
    <div>
      {data?.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
