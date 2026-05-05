export type CartItem = {
  productId: string;
  slug: string;
  sku: string;
  name: string;
  price: string;
  baseUnit: string;
  saleUnit: string;
  priceUnit: string;
  quantity: number;
  packSize?: string | null;
};

const CART_KEY = "finkom_cart";

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawCart = window.localStorage.getItem(CART_KEY);

  if (!rawCart) {
    return [];
  }

  try {
    return JSON.parse(rawCart) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addCartItem(item: CartItem) {
  const items = getCartItems();

  const existingItem = items.find((cartItem) => cartItem.productId === item.productId);

  if (existingItem) {
    existingItem.quantity += item.quantity;
    saveCartItems(items);
    return;
  }

  saveCartItems([...items, item]);
}

export function removeCartItem(productId: string) {
  const items = getCartItems().filter((item) => item.productId !== productId);
  saveCartItems(items);
}

export function clearCart() {
  saveCartItems([]);
}