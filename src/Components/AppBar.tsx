import React from "react";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { MapState } from "../Redux/Products/ProductType";
import { CartState } from "../Redux/Cart/CartTypes";
import { useDispatch, useSelector } from "react-redux";
import { UserStateTypes } from "../Redux/User/UserTypes";
import { userSignOut } from "../Redux/User/UserAction";
import { clearAdminData, ClearCart } from "../Redux";
import SearchBox from "./SearchBox";
import { appBarProps } from "../Types/AppBar";

function AppBar({ isSideBarOpen, setIsSideBarOpen }: appBarProps) {
  const cartData: CartState = useSelector((state: MapState) => state.cart);
  const userInfo: UserStateTypes = useSelector((state: MapState) => state.user);
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(userSignOut());
    dispatch(ClearCart());
    dispatch(clearAdminData());
    window.location.href = "/signin";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Button
          size="sm"
          variant="dark"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        >
          <i className="fas fa-bars"></i>
        </Button>
        <LinkContainer to="/">
          <Navbar.Brand>eStore</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav className="me-auto w-100 justify-content-end">
            <Link to={"/cart"} className=" nav-link">
              Cart
              {cartData.cartItems.length > 0 && (
                <Badge pill className="bg-danger">
                  {cartData.cartItems.length}
                </Badge>
              )}
            </Link>
            {userInfo.user?.name ? (
              <NavDropdown title={userInfo.user.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  to="#signout"
                  className="dropdown-item"
                  onClick={signOutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            )}
            {userInfo.user.name && userInfo.user.role === "admin" && (
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
