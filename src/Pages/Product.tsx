import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Card,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import Rating from "../Components/Rating";
import { fetchSingleRequest } from "../Redux/SingleProduct/SingleProductAction";
import { useSelector, useDispatch } from "react-redux";
import { MapState } from "../Redux/Products/ProductType";
import Error from "../Components/Error";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { AddToCart } from "../Redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Product() {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(fetchSingleRequest(slug));
  }, [dispatch, slug]);
  const singleProductData = useSelector(
    (state: MapState) => state.singleProduct
  );

  const addToCart = async () => {
    const product = singleProductData.products;
    const item = { ...product, quantity: 1 };
    dispatch(AddToCart(item));
    navigate("/cart");
  };

  return (
    <div>
      <main className="mt-2">
        {singleProductData.loading ? (
          <LoadingSpinner />
        ) : singleProductData.error ? (
          <Error message="Product not found " variant="danger" />
        ) : (
          <Container className="">
            <Row>
              <Col className="large-image" md={5}>
                <LazyLoadImage
                  alt={singleProductData.products.name}
                  src={singleProductData.products.image}
                  className="img-main"
                />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Helmet>
                      <title>{singleProductData.products.name}</title>
                      {/* <meta
                        name="description"
                        content={singleProductData.products.description}
                      /> */}
                    </Helmet>
                    <h1>{singleProductData.products.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {singleProductData.products.rating &&
                    singleProductData.products.numOfReviews ? (
                      <Rating
                        rating={singleProductData.products.rating}
                        numOfReviews={singleProductData.products.numOfReviews}
                      />
                    ) : (
                      singleProductData.products.rating && (
                        <Rating
                          rating={singleProductData.products.rating}
                          numOfReviews={0}
                        />
                      )
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price : Rs {singleProductData.products.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description : {singleProductData.products.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>Rs {singleProductData.products.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row gap={2}>
                          <Col>Status:</Col>
                          <Col>
                            {singleProductData.products.countInStock &&
                            singleProductData.products.countInStock > 0 ? (
                              <Badge bg="success">InStock</Badge>
                            ) : (
                              <Badge bg="danger">Unavailable</Badge>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {singleProductData.products.countInStock &&
                      singleProductData.products.countInStock > 0 ? (
                        <div className="d-grid p-2">
                          <Button
                            onClick={addToCart}
                            variant="warning"
                            size="sm"
                          >
                            Add To Cart
                          </Button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </main>
    </div>
  );
}

export default Product;
