import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../Components/Error";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { getAdminData } from "../../Redux";
import { MapState } from "../../Redux/Products/ProductType";
import { UserDataTypes, UserStateTypes } from "../../Redux/User/UserTypes";

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  const { loading, error, orders, users } = useSelector(
    (state: MapState) => state.admin
  );
  const findUserName = (id: String) => {
    const userName = users.find((user: UserDataTypes) => user._id === id);
    return userName?.name;
  };
  useEffect(() => {
    //@ts-ignore
    dispatch(getAdminData(user.access_token));
  }, [dispatch, user.access_token]);

  return (
    <div>
      <Helmet><title>Orders List</title></Helmet>
      <h1 className="my-3">Orders List</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error variant="danger" message="Something went wrong" />
      ) : (
        <Table className="" hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <>{findUserName(order.user)}</>
                </td>
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

export default OrderList;
