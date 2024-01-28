import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const CartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const CartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmit(true);
    const response = await fetch(
      "https://food-order-fd2b6-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderItems: cartCtx.items }),
      }
    );
    setIsSubmit(false);
    setDidSubmit(true);
    if (!response.ok) {
      // error handling
    }
    cartCtx.clearCart();
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={CartItemRemoveHandler.bind(null, item.id)}
          onAdd={CartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmitingFormContent = <p>Sending order data ...</p>;

  const didSubmitedFormContent = (
    <>
      <h2>Thank you for your order!</h2>
      <button className={classes.close} onClick={props.onHideCart}>
        close
      </button>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmit && !didSubmit && modalContent}
      {isSubmit && !didSubmit && isSubmitingFormContent}
      {didSubmit && didSubmitedFormContent}
    </Modal>
  );
};

export default Cart;
