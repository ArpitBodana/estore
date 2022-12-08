import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Error from "../../Components/Error";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { getAdminData } from "../../Redux";
import { MapState } from "../../Redux/Products/ProductType";
import { UserStateTypes } from "../../Redux/User/UserTypes";

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  const { loading, error, users } = useSelector(
    (state: MapState) => state.admin
  );
  const deleteUser = async (id: String) => {
    try {
      const { data } = await axios.delete(
        `https://estore-backend.vercel.app/api/admin/user/${id}`,
        {
          headers: {
            authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      toast.info(data.message);
      //@ts-ignore
      dispatch(getAdminData(user.access_token));
      navigate("/admin/userlist");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    //@ts-ignore
    dispatch(getAdminData(user.access_token));
  }, [dispatch, user.access_token]);
  return (
    <div>
      <Helmet>
        <title>Users List</title>
      </Helmet>
      <h1 className="my-3">Users List</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error variant="danger" message="Something went wrong" />
      ) : (
        <Table className="" hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    type="button"
                    variant={"success"}
                    size="sm"
                    onClick={() => navigate(`/admin/edituser/${user._id}`)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Button>
                  {"  "}
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    <i className="fas fa-trash"></i>
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

export default UserList;
