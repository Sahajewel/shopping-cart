import type { CartItem, Product } from "../types";

export type CartState = { items: CartItem[] };

export type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: number }
  | { type: "INCREASE"; payload: number }
  | { type: "DECREASE"; payload: number }
  | { type: "CLEAR" };

export const initialCartState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.payload.id);

      if (existing) {
        // আগে থেকে আছে: quantity +1
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }

      // নতুন item
      const { id, title, price, image } = action.payload;
      return {
        items: [...state.items, { id, title, price, image, quantity: 1 }],
      };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload) };

    case "INCREASE":
      return {
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };

    case "DECREASE":
      return {
        items: state.items
          .map((i) =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i,
          )
          // quantity ০ হলে item মুছে যাবে
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR":
      return initialCartState;

    default:
      return state;
  }
}
