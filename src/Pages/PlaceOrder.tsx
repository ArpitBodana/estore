import React, { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { UserStateTypes } from "../Redux/User/UserTypes";
import { MapState } from "../Redux/Products/ProductType";
import { Link } from "react-router-dom";
import { CartProductType } from "../Types/Product";
import { useNavigate } from "react-router-dom";
import {
  createFail,
  createRequest,
  createSuccess,
} from "../Redux/Order/Action";
import axios from "axios";
import { toast } from "react-toastify";
import { ClearCart } from "../Redux";

function PlaceOrder() {
  const { shipping, paymentMethod, user }: UserStateTypes = useSelector(
    (state: MapState) => state.user
  );
  const cart = useSelector((state: MapState) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const round2 = (num: any) => Math.round(num + 100 + Number.EPSILON) / 100;
  const itemsPrice = cart.cartItems.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );
  const shippingPrice = itemsPrice > 100 ? round2(420) * 10 : round2(4000) * 10;
  const taxPrice = round2(0.41 * itemsPrice);
  const totalPrice = Math.round(itemsPrice + shippingPrice + taxPrice);
  const placeOrderHandler = async () => {
    try {
      dispatch(createRequest());
      const { data } = await axios.post(
        "https://estore-backend.vercel.app/api/order",
        {
          orderItems: cart.cartItems,
          shippingAddress: shipping,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      dispatch(ClearCart());
      dispatch(createSuccess(data.order));
      navigate(`/order/${data.order._id}`);
    } catch (error: any) {
      dispatch(createFail(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {shipping.fullName} <br />
                <strong>Address:</strong> {shipping.address} , {shipping.city} ,{" "}
                {shipping.postalCode},{shipping.country}
              </Card.Text>
              <Link to="/shipping">
                <Button variant="warning" size="sm">
                  Edit
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>PaymentMethod</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {paymentMethod} <br />
              </Card.Text>
              <Link to="/payment">
                <Button variant="warning" size="sm">
                  Edit
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              {cart.cartItems.map((item: CartProductType) => (
                <ListGroup.Item key={item._id} variant="flush">
                  <Row className="align-items-center">
                    <Col md={6}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail w-50"
                      />
                      <br />
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <span>{item.quantity}</span>
                    </Col>
                    <Col md={3}>
                      <span>Rs {item.price}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <Link to="/cart">
                <Button variant="warning" size="sm" className="my-3">
                  Edit
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>Rs {itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>Rs {shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>Rs {taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>Rs {totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    variant="warning"
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrder;
