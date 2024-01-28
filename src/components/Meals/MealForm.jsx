import { useRef, useState } from "react";
import classes from "./MealForm.module.css";
import Input from "../UI/Input";

const MealForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const EnteredAmount = amountInputRef.current.value;
    const EnteredAmountNumber = +EnteredAmount;
    if (
      EnteredAmount.trim().length === 0 ||
      EnteredAmountNumber < 1 ||
      EnteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(amountInputRef.current.value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealForm;
