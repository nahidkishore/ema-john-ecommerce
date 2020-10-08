import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";
import SplitCardForm from "./SplitCardForm";

const stripePromise = loadStripe("pk_test_51HZtzJBRGc50roq06i3xniicqrgoOLvtYJnfJXeSQVl9fzARwBMf3BzW720VnnJ4wyZvbDUws8wgG4vE35XGf3gj00YHwGFdo4");
const ProcessPayment = () => {
  return (
    <Elements stripe={stripePromise}>
   {/*    <SimpleCardForm /> */}
 <SplitCardForm></SplitCardForm>
    
    </Elements>
  );
};

export default ProcessPayment;
