import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartIcon from "../cart/cartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnISHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const BtnClass = `${classes.button} ${btnISHighlighted ? classes.bump : ""}`;
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((currNumber, item) => {
    var numberOfCurrNumber = Number(currNumber);
    var numberOfAmount = Number(item.amount);
    return (numberOfCurrNumber += numberOfAmount);
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={BtnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
