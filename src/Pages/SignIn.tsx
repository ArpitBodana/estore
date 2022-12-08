import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MapState } from "../Redux/Products/ProductType";
import {
  requestSignIn,
  signInFail,
  userSignIn,
} from "../Redux/User/UserAction";
import { UserStateTypes } from "../Redux/User/UserTypes";
import LoadingSpinner from "../Components/LoadingSpinner";
import axios from "axios";
import { toast } from "react-toastify";

function SignIn() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const dispatch = useDispatch();
  const userInfo = localStorage.getItem("userInfo");
  const userSignInData: UserStateTypes = useSelector(
    (state: MapState) => state.user
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    try {
      dispatch(requestSignIn());
      const { data } = await axios.post(
        "https://estore-backend.vercel.app/api/signin",
        {
          email,
          password,
        }
      );
      dispatch(userSignIn(data));
      navigate(redirect || "/");
    } catch (error) {
      dispatch(signInFail("Invalid Credentials"));
      toast.error("Invalid email or password");
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-content-center  flex-column small-container "
    >
      <Helmet>
        <title>SignIn</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      {userSignInData.loading && <LoadingSpinner />}
      {!userSignInData.loading && (
        <Form onSubmit={handleSubmit} className="">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" variant="warning">
              Submit
            </Button>
          </div>
          <div className="mb-3">
            New customer?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </Form>
      )}
    </Container>
  );
}

export default SignIn;
