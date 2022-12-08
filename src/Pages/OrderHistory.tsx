import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Error from "../Components/Error";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { MapState } from "../Redux/Products/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrdersFail,
  fetchAllOrders,
  fetchAllOrdersSuccess,
} from "../Redux/Order/Action";
import { UserStateTypes } from "../Redux/User/UserTypes";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

function OrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  const { loading, error, allOrders } = useSelector(
    (state: MapState) => state.order
  );

  useEffect(() => {
    const getMyOrders = async () => {
      dispatch(fetchAllOrders());
      try {
        const { data } = await axios.get(
          "https://estore-backend.vercel.app/api/order/mine",
          {
            headers: {
              authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        dispatch(fetchAllOrdersSuccess(data));
      } catch (error: any) {
        dispatch(fetchAllOrdersFail(error.response.data.message));
      }
    };
    getMyOrders();
  }, [user, dispatch]);
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error variant="danger" message="Something went wrong" />
      ) : (
        <Table className="" hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>{`Rs ${order.totalPrice}`}</td>
                <td>{order.isPaid ? order.paidAt?.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliverdAt?.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderHistory;
