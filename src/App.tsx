import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";

function App() {
  return (
    <div>
      <Navbar />
      <h1>Shopping Cart</h1>
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
