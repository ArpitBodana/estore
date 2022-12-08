import React from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { ProductType, ProductComponentType } from "../Types/Product";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { AddToCart } from "../Redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Products({ products }: ProductComponentType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCart = async (product: ProductType) => {
    const item = { ...product, quantity: 1 };
    if (product.countInStock < 1) {
      alert("Product is out of stock sorry");
    } else {
      dispatch(AddToCart(item));
      navigate("/cart");
    }
  };
  return (
    <div className="">
      <h1>Featured Products</h1>
      <main className="">
        <Container>
          <Row>
            {products.map((pro: ProductType) => {
              return (
                <Col className="mb-2" key={pro._id} lg={3} sm={6} md={6}>
                  <Card className="p-2 ">
                    <Link to={`/product/${pro._id}`}>
                      <LazyLoadImage
                        alt={pro.name}
                        src={pro.image}
                        className="img-main"
                      />
                    </Link>
                    <Card.Body>
                      <Link
                        to={`/product/${pro._id}`}
                        className="text-decoration-none"
                      >
                        <Card.Title>{pro.name}</Card.Title>
                      </Link>
                      <Rating
                        rating={pro.rating}
                        numOfReviews={pro.numOfReviews}
                      />
                      <Card.Text>Rs {pro.price}</Card.Text>
                      {pro.countInStock === 0 ? (
                        <Button disabled variant="light">
                          Out of Stock
                        </Button>
                      ) : (
                        <Button
                          className="border border-dark"
                          variant="warning"
                          onClick={() => addToCart(pro)}
                        >
                          Add To Cart
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Products;
