import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Button, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MapState } from "../../Redux/Products/ProductType";
import { UserStateTypes } from "../../Redux/User/UserTypes";

function EditProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCount] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [newImage, setNewImage] = useState<any>();
  const [numOfReviews, setReviews] = useState(0);
  const [isImage, setIsImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const selectImageHandler = async (e: React.BaseSyntheticEvent) => {
    setNewImage(e.target.files[0]);
    const imgdata = new FormData();
    imgdata.append("file", newImage);
    imgdata.append("upload_preset", "estore");

    await axios
      .post("https://api.cloudinary.com/v1_1/dlnbatnlc/image/upload", imgdata)
      .then((res) => {
        console.log(res.data);
        toast.success("Image Added Now submit data");
        setImageUrl(res.data.url);
        setIsImage(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Image not uploaded please try again!!");
      });
  };
  const updateProduct = async (e: React.FormEvent) => {
    e?.preventDefault();
    try {
      const img = imageUrl ? imageUrl : imageLink;
      await axios.put(
        `https://estore-backend.vercel.app/api/admin/product/${id}`,
        {
          name,
          price,
          brand,
          description,
          category,
          countInStock,
          rating,
          numOfReviews,
          image: img,
        },
        {
          headers: {
            authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      toast.success("Updated Successfully");
      navigate("/admin/productlist");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://estore-backend.vercel.app/api/product/${id}`,
          {
            headers: {
              authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setName(data.name);
        setBrand(data.brand);
        setPrice(data.price);
        setDescription(data.description);
        setCount(data.countInStock);
        setRating(data.rating);
        setCategory(data.category);
        setCreatedAt(data.createdAt);
        setReviews(data.numOfReviews);
        setImageLink(data.image);
      } catch (error) {
        toast.error("Unable to update details");
      }
    };
    fetchProduct();
  }, [id, user.access_token]);
  return (
    <div>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <h1 className="my-3">Edit Product</h1>

      <Row>
        <Col>
          <Image src={imageLink} fluid className="rounded small-image" />
        </Col>
      </Row>
      <h4 className="text-break my-3">Id {id}</h4>
      <Form className="" onSubmit={updateProduct}>
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
          <Form.Label>Change Image</Form.Label>
          <Form.Control type="file" onChange={(e) => selectImageHandler(e)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createdAt">
          <Form.Label>CreatedAt</Form.Label>
          <Form.Control
            type="text"
            required
            readOnly
            value={createdAt.substring(0, 10)}
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

export default EditProduct;
