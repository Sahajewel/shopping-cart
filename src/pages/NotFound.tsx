import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h2 className="mb-2 text-2xl font-bold">404</h2>
      <Link to="/" className="text-blue-600 underline">
        Back to Home
      </Link>
    </div>
  );
}
