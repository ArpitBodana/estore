import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Error from "../../Components/Error";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { getAdminData } from "../../Redux";
import { MapState } from "../../Redux/Products/ProductType";
import { UserStateTypes } from "../../Redux/User/UserTypes";
import { Chart } from "react-google-charts";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  const { loading, error, products, orders, users } = useSelector(
    (state: MapState) => state.admin
  );
  const userCount = users.length;
  const ordersCount = orders.length;
  const productsCount = products.length;

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const allCat = [...products.map((x: any) => x.category)];
  const countCat = (cat: any) => {
    let counter = 0;
    for (let i of allCat) {
      if (i === cat) {
        counter++;
      }
    }
    return counter;
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(getAdminData(user.access_token));
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://estore-backend.vercel.app/api/products/categories"
        );
        setCategories(data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    fetchCategories();
  }, [dispatch, user.access_token]);
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="my-3">Dashboard</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error variant="danger" message="Something went wrong" />
      ) : (
        <Container>
          <Row>
            <Col md={4}>
              <Card className="mb-3 text-center">
                <Card.Body>
                  <Card.Title>{userCount}</Card.Title>
                  <Card.Text>
                    <Link to="/admin/userlist">
                      <Button variant="light">Users</Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3 text-center">
                <Card.Body>
                  <Card.Title>{productsCount}</Card.Title>
                  <Card.Text>
                    <Link to="/admin/productlist">
                      <Button variant="light">Products</Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3 text-center">
                <Card.Body>
                  <Card.Title>{ordersCount}</Card.Title>
                  <Card.Text>
                    <Link to="/admin/orderlist">
                      <Button variant="light">Orders</Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Chart
                chartType="PieChart"
                data={[
                  ["Products", "CountInStock"],
                  ...products.map((x: any) => [x.name, x.countInStock]),
                ]}
                options={{ title: "Products" }}
                width="100%"
                height="400px"
              />
            </Col>
            <Col md={6}>
              <Chart
                chartType="PieChart"
                data={[
                  ["Category", "CountInStock"],
                  ...categories.map((x: string) => [x, countCat(x)]),
                ]}
                options={{ title: "Categories" }}
                width="100%"
                height="400px"
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Dashboard;
