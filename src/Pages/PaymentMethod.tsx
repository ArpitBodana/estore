import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapState } from "../Redux/Products/ProductType";
import { UserStateTypes } from "../Redux/User/UserTypes";
import { userPaymentMethod } from "../Redux/User/UserAction";

function PaymentMethod() {
  const { shipping, paymentMethod }: UserStateTypes = useSelector(
    (state: MapState) => state.user
  );
  const [paymentMethodName, setPaymentMethod] = useState<string>(
    paymentMethod || "Paypal"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!shipping.address) {
      navigate("/shipping");
    }
  }, [shipping, navigate]);

  const submitHandler = (e: React.FormEvent) => {
    e?.preventDefault();
    dispatch(userPaymentMethod(paymentMethodName));
    navigate('/placeorder')

  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <h1 className="my-3">Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="paypal"
            label="Paypal"
            value="Paypal"
            checked={paymentMethodName === "Paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="stripe"
            label="Stripe"
            value="Stripe"
            disabled={true}
            checked={paymentMethodName === "Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Button type="submit" variant="warning">Continue</Button>
        </div>
      </Form>
    </div>
  );
}

export default PaymentMethod;
