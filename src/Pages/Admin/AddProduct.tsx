import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MapState } from "../../Redux/Products/ProductType";
import { UserStateTypes } from "../../Redux/User/UserTypes";

function AddProduct() {
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCount] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [newImage, setNewImage] = useState<any>();
  const [numOfReviews, setReviews] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const restAllFields = () => {
    setName("");
    setPrice("");
    setBrand("");
    setCategory("");
    setCount(0);
    setDescription("");
    setRating(0);
    setReviews(0);
  };
  const selectImageHandler = (e: React.BaseSyntheticEvent) => {
    setNewImage(e.target.files[0]);
  };
  const addProduct = async (e: React.FormEvent) => {
    e?.preventDefault();
    try {
      const imgdata = new FormData();
      imgdata.append("file", newImage);
      imgdata.append("upload_preset", "estore");

      await axios
        .post("https://api.cloudinary.com/v1_1/dlnbatnlc/image/upload", imgdata)
        .then((res) => {
          setImageUrl(res.data.url);
          axios.post(
            `https://estore-backend.vercel.app/api/admin/product`,
            {
              name,
              price,
              brand,
              description,
              category,
              countInStock,
              rating,
              numOfReviews,
              image: res.data.url,
            },
            {
              headers: {
                authorization: `Bearer ${user.access_token}`,
              },
            }
          );
          restAllFields();
          toast.success("Producted Added");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Image not uploaded please try again!!");
        });
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add New Product</title>
      </Helmet>
      <h1 className="my-3">Add New Product</h1>
      <Form className="" onSubmit={addProduct}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            required
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Reviews">
          <Form.Label>Reviews</Form.Label>
          <Form.Control
            type="number"
            required
            value={numOfReviews}
            onChange={(e) => setReviews(parseInt(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="count-in-stock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            required
            value={countInStock}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="uploadImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            required
            onChange={(e) => selectImageHandler(e)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" variant="warning">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddProduct;
