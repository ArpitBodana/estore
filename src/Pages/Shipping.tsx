import React, { useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import {useDispatch,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";
import { MapState } from "../Redux/Products/ProductType";
import { userShippingAddress } from "../Redux/User/UserAction";
import { UserStateTypes } from "../Redux/User/UserTypes";

function Shipping() {

  const {shipping}:UserStateTypes=useSelector((state:MapState)=>state.user);
  const [fullName, setFullName] = useState<string>(shipping.fullName||"");
  const [address, setAddress] = useState<string>(shipping.address||"");
  const [city, setCity] = useState<string>(shipping.city||"");
  const [postalCode, setPostalCode] = useState<string>(shipping.postalCode||"");
  const [country, setCountry] = useState<string>(shipping.country||"");

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userShippingAddress({fullName,address,city,postalCode,country}));
    navigate('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <Container
        fluid
        className="d-flex justify-content-center align-content-center  flex-column small-container "
      >
        <h1 className="my-3">Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City </Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code </Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" variant="warning">
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Shipping;
