import { createContext, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {}
});

const STORAGE_KEY = 'cartItems';

export const CartContextProvider = ({ children }) => {
  const [cartItems, _setCartItems] = useState(() => {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
  });
  const setCartItems = (newItems) => {
    _setCartItems(newItems);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
