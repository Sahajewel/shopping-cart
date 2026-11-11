import { useCart } from "../hooks/useCart";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const { totalItems } = useCart();
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md font-medium ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="sticky top-0 z-10 bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <h1 className="text-xl font-bold">My shop</h1>
        <div className="flex gap-2">
          <NavLink to="/" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart ({totalItems})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
