import {
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  cartReducer,
  initialCartState,
  type CartAction,
  type CartState,
} from "../reducers/cartReducer";
import { CartContext } from "./cartContextObject";

export type CartContextType = {
  items: CartState["items"];
  dispatch: Dispatch<CartAction>;
  totalItems: number;
  totalPrice: number;
};

const STORAGE_KEY = "cart";

function init(initial: CartState): CartState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CartState) : initial;
  } catch {
    return initial;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, init);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );
  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items],
  );
  return (
    <CartContext.Provider
      value={{ items: state.items, dispatch, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
