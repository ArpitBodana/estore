import React, { useEffect } from "react";
import Error from "../Components/Error";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { MapState } from "../Redux/Products/ProductType";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  createRequest,
  createSuccess,
  createFail,
  reqPay,
  paySuccess,
  payFail,
  payReset,
} from "../Redux/Order/Action";
import axios from "axios";
import { UserStateTypes } from "../Redux/User/UserTypes";
import { Helmet } from "react-helmet-async";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { CartProductType } from "../Types/Product";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const userInfo = localStorage.getItem("userInfo");
  const { loading, error, order, loadingPay, successPay } = useSelector(
    (state: MapState) => state.order
  );
  const { user, paymentMethod }: UserStateTypes = useSelector(
    (state: MapState) => state.user
  );
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId: any) => {
        return orderId;
      });
  };
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      try {
        dispatch(reqPay());
        const { data } = await axios.put(
          `https://estore-backend.vercel.app/api/order/${orderId}/pay`,
          details,
          {
            headers: {
              authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        dispatch(paySuccess(data));
      } catch (error: any) {
        dispatch(payFail(error.response.data.message));
        toast.error(error.response.data.message);
      }
    });
  };
  const onError = (err: any) => {
    toast.error(err);
  };

  const dateConvert = (date: any) => {
    const mydate = new Date(date);
    return mydate.toLocaleDateString("en-IN");
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch(createRequest());
        const { data } = await axios.get(
          `https://estore-backend.vercel.app/order/${orderId}`,
          {
            headers: {
              authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        dispatch(createSuccess(data));
      } catch (error: any) {
        dispatch(createFail(error.response.data.message));
      }
    };
    if (!userInfo) {
      return navigate("/signin");
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch(payReset());
      }
    } else {
      const loadPayPalScript = async () => {
        const { data: clientId } = await axios.get(
          "https://estore-backend.vercel.app/api/keys/paypal",
          {
            headers: {
              authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        //@ts-ignore
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPayPalScript();
    }
  }, [
    user.access_token,
    userInfo,
    dispatch,
    navigate,
    order,
    orderId,
    paypalDispatch,
    successPay,
  ]);
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <Error variant="danger" message="Something went wrong" />
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h6 className="my-3 fs-4">Order {orderId}</h6>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress?.fullName} <br />
                <strong>Address:</strong> {order.shippingAddress?.address} ,{" "}
                {order.shippingAddress?.city} ,{" "}
                {order.shippingAddress?.postalCode},
                {order.shippingAddress?.country}
                {order.isDelivered ? (
                  <Error
                    message={`Delivered Successfully ${order.isDelivered}`}
                    variant="success"
                  />
                ) : (
                  <Error message="Not delivered" variant="danger" />
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>PaymentMethod</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {paymentMethod} <br />
              </Card.Text>
              {order.isPaid ? (
                <Error
                  message={`Paid Successfully ${dateConvert(order.paidAt)}`}
                  variant="success"
                />
              ) : (
                <Error message="Not Paid" variant="danger" />
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              {order.orderItems?.map((item: CartProductType) => (
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
                    <Col>
                      <>Rs {order.itemsPrice}</>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>
                      <>Rs {order.shippingPrice}</>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>
                      <>Rs {order.taxPrice}</>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>
                        <>Rs {order.totalPrice}</>
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {isPending ? (
                        <LoadingSpinner />
                      ) : (
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          />
                        </div>
                      )}
                      {loadingPay && <LoadingSpinner />}
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
