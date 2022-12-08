import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import { Button, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AppBar from "./Components/AppBar";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import LoadingSpinner from "./Components/LoadingSpinner";

const Search = lazy(() => import("./Pages/Search"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
const UserList = lazy(() => import("./Pages/Admin/UserList"));
const EditUser = lazy(() => import("./Pages/Admin/EditUser"));
const OrderList = lazy(() => import("./Pages/Admin/OrderList"));
const ProductList = lazy(() => import("./Pages/Admin/ProductList"));
const EditProduct = lazy(() => import("./Pages/Admin/EditProduct"));
const AddProduct = lazy(() => import("./Pages/Admin/AddProduct"));
const Order = lazy(() => import("./Pages/Order"));
const OrderHistory = lazy(() => import("./Pages/OrderHistory"));
const Profile = lazy(() => import("./Pages/Profile"));
const Shipping = lazy(() => import("./Pages/Shipping"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const PaymentMethod = lazy(() => import("./Pages/PaymentMethod"));
const PlaceOrder = lazy(() => import("./Pages/PlaceOrder"));
const Cart = lazy(() => import("./Pages/Cart"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const Product = lazy(() => import("./Pages/Product"));
const Home = lazy(() => import("./Pages/Home"));

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
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
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          isSideBarOpen
            ? "d-flex flex-column site-container active-cont min-vh-100"
            : "d-flex flex-column site-container min-vh-100"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />

        <header className="font-weight-bolder fw-bold">
          <AppBar
            setIsSideBarOpen={setIsSideBarOpen}
            isSideBarOpen={isSideBarOpen}
          />
        </header>

        <div
          className={
            isSideBarOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : " side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item className="d-flex justify-content-between">
              <strong>Categories</strong>
              <Button
                size="sm"
                variant="warning"
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
              >
                <i className="">x</i>
              </Button>
            </Nav.Item>
            {categories.map((category: string) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setIsSideBarOpen(false)}
                >
                  <Nav.Link className="text-warning">{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main className="">
          <Container>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/shipping"
                  element={
                    <ProtectedRoute>
                      <Shipping />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <PaymentMethod />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/placeorder"
                  element={
                    <ProtectedRoute>
                      <PlaceOrder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order/:id/"
                  element={
                    <ProtectedRoute>
                      <Order />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orderhistory"
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/search" element={<Search />} />
                {/*Admin Routes*/}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <Dashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/userlist"
                  element={
                    <AdminRoute>
                      <UserList />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/edituser/:id"
                  element={
                    <AdminRoute>
                      <EditUser />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/orderlist"
                  element={
                    <AdminRoute>
                      <OrderList />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/productlist"
                  element={
                    <AdminRoute>
                      <ProductList />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/editproduct/:id"
                  element={
                    <AdminRoute>
                      <EditProduct />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/addproduct"
                  element={
                    <AdminRoute>
                      <AddProduct />
                    </AdminRoute>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
