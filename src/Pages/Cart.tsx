import React from "react";
import { Col, Image, ListGroup, Row, Button, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Error from "../Components/Error";
import { QtyDsc, QtyInc, RemoveItem } from "../Redux";
import { CartState } from "../Redux/Cart/CartTypes";
import { MapState } from "../Redux/Products/ProductType";

function Cart() {
  const cart: CartState = useSelector((state: MapState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1 className="m-1">Cart</h1>
      <Row>
        <Col md={8}>
          {cart.cartItems.length === 0 ? (
            <Link className=" text-decoration-none" to={"/"}>
              <Error
                message={`Cart is empty. Go for shopping.`}
                variant="info"
              />
            </Link>
          ) : (
            <ListGroup>
              {cart.cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="m-1">
                  <Row className=" align-items-center  text-center">
                    <Col md={4}>
                      <Image
                        alt={item.name}
                        fluid
                        src={item.image}
                        className=" img-thumbnail w-50"
                      />
                      {"  "}
                      <Link to={`/product/${item._id}`}>
                        <br></br>
                        <span className="text-decoration-none text-black d-inline-block">
                          {item.name}
                        </span>
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        size="sm"
                        disabled={item.quantity === 1}
                        onClick={() => dispatch(QtyDsc(item))}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        size="sm"
                        disabled={item.quantity === item.countInStock}
                        onClick={() => dispatch(QtyInc(item))}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}> {item.price} /per</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => dispatch(RemoveItem(item))}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6 className=" fw-bold">
                    Subtotal (
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                    : Rs{" "}
                    {cart.cartItems.reduce(
                      (a, c) => a + c.price * c.quantity,
                      0
                    )}
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="warning"
                      disabled={cart.cartItems.length === 0}
                      onClick={() => checkOutHandler()}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
