import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MapState } from "../../Redux/Products/ProductType";
import { UserStateTypes } from "../../Redux/User/UserTypes";

function EditUser() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const updateUserDetails = async (e: React.FormEvent) => {
    e?.preventDefault();
    try {
      const { data } = await axios.put(
        `https://estore-backend.vercel.app/api/admin/user/${id}`,
        {
          name,
          email,
          role,
        },
        {
          headers: {
            authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      toast.success(data.message);
      navigate("/admin/userlist");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `https://estore-backend.vercel.app/api/admin/user/${id}`,
          {
            headers: {
              authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setLastUpdate(data.updatedAt);
        setCreatedAt(data.createdAt);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    fetchUser();
  }, [id, user.access_token, navigate]);
  return (
    <div>
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      <h1 className="my-3">Edit User</h1>
      <Form className="" onSubmit={updateUserDetails}>
        <h4 className="text-break">Id {id}</h4>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createdAt">
          <Form.Label>Created At</Form.Label>
          <Form.Control
            type="text"
            required
            value={createdAt.substring(0, 10)}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="last-update">
          <Form.Label>Last Update</Form.Label>
          <Form.Control
            type="text"
            required
            value={lastUpdate.substring(0, 10)}
            readOnly
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" variant="warning">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditUser;
