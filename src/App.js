import Header from "./components/layout/Header";
import { useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "../src/components/cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartShownHandler = () => {
    setCartIsShown(true);
  };

  const cartHideHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={cartHideHandler} />}
      <Header onShowCart={cartShownHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
