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

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  const { loading, error, products } = useSelector(
    (state: MapState) => state.admin
  );

  const deleteProduct = async (id: String) => {
    try {
      const { data } = await axios.delete(
        `https://estore-backend.vercel.app/api/admin/product/${id}`,
        {
          headers: {
            authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      toast.info(data.message);
      //@ts-ignore
      dispatch(getAdminData(user.access_token));
      navigate("/admin/productlist");
      toast.info("Product Deleted");
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
        <title>Product List</title>
      </Helmet>
      <h1 className="my-3">Product List</h1>
      <div className="d-flex justify-content-end my-3">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => navigate("/admin/addproduct")}
        >
          + Add New Product
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error variant="danger" message="Something went wrong" />
      ) : (
        <Table className="" hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COUNT</th>
              <th>CATEGORY</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{`Rs ${product.price}`}</td>
                <td>{product.countInStock}</td>
                <td>{product.category}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/editproduct/${product._id}`)
                    }
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteProduct(product._id)}
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

export default ProductList;
