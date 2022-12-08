import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { UserStateTypes } from "../Redux/User/UserTypes";
import { MapState } from "../Redux/Products/ProductType";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner";

function Profile() {
  const { user,loading}: UserStateTypes = useSelector(
    (state: MapState) => state.user
  );
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async (e: React.FormEvent) => {
    e?.preventDefault();
    dispatch({ type: "UPDATE_REQUEST" });
    try {
        if(password!==cpwd){
            dispatch({type:"UPDATE_FAIL"});
            toast.error("Password not matched!");
        }else{
            const { data } = await axios.put(
                "https://estore-backend.vercel.app/api/users/profile",
                {
                  name,
                  email,
                  password,
                },
                {
                  headers: {
                    authorization: `Bearer ${user.access_token}`,
                  },
                }
              );
              dispatch({type:"UPDATE_SUCCESS"})
              dispatch({type:"SIGNIN_SUCCESS",payload:data})
              toast.success("User Updated Successfully")
        }
      
    } catch (error: any) {
      dispatch({type:"UPDATE_FAIL"});
      toast.error(error.response.data.message);
    }
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-content-center  flex-column small-container "
    >
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      {loading?(<LoadingSpinner/>):(<Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setCpwd(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" variant="warning">
            Update
          </Button>
        </div>
      </Form>)}
    </Container>
  );
}

export default Profile;
