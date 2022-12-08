import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AddToCart, RequestSearch, SearchFails, SearchSuccess } from "../Redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Col, Row, Button, Card, Image } from "react-bootstrap";
import Rating from "../Components/Rating";
import { MapState } from "../Redux/Products/ProductType";
import { SearchStateType } from "../Redux/Search/SearchTypes";
import LoadingSpinner from "../Components/LoadingSpinner";
import Error from "../Components/Error";
import { LinkContainer } from "react-router-bootstrap";
import { ProductType } from "../Types/Product";
import { Form } from "react-bootstrap";

const prices = [
  {
    name: "Rs 50 - Rs 150",
    value: "50-150",
  },
  {
    name: "Rs 150 - Rs 500",
    value: "150-500",
  },
  {
    name: "Rs 500 - Rs 2000",
    value: "500-2000",
  },
];

const ratings = [
  {
    name: "4 Starts & Up",
    value: 4,
  },
  {
    name: "3 Starts & Up",
    value: 3,
  },
  {
    name: "2 Starts & Up",
    value: 2,
  },
  {
    name: "1 Starts & Up",
    value: 1,
  },
];
function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const { loading, error, products, pages, countProducts }: SearchStateType =
    useSelector((state: MapState) => state.search);
  const addToCart = async (product: ProductType) => {
    const item = { ...product, quantity: 1 };
    if (product.countInStock < 1) {
      alert("Product is out of stock sorry");
    } else {
      dispatch(AddToCart(item));
      navigate("/cart");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(RequestSearch());
      try {
        const { data } = await axios.get(
          `https://estore-backend.vercel.app/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch(SearchSuccess(data));
      } catch (error: any) {
        dispatch(SearchFails(error.message));
      }
    };
    fetchData();
  }, [category, order, price, rating, query, page, dispatch]);
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
  }, [dispatch]);

  const getFilterUrl = (filter: any) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const fileterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${fileterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c: string) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getFilterUrl({ price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p: any) => (
                <li key={p.value}>
                  <Link
                    className={p.value === price ? "text-bold" : ""}
                    to={getFilterUrl({ price: p.value })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg.Customer Reviews</h3>
            <ul>
              {ratings.map((r: any) => (
                <li key={r.value}>
                  <Link
                    className={r.value === rating ? "text-bold" : ""}
                    to={getFilterUrl({ rating: r.value })}
                  >
                    <Rating caption={" & up"} rating={r.value} />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className={"all" === rating ? "text-bold" : ""}
                  to={getFilterUrl({ rating: "all" })}
                >
                  <Rating caption={" & up"} rating={0} />
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <Error variant="danger" message={`${error}`} />
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    <>
                      {countProducts === 0 ? "No" : countProducts} Result
                      {query !== "all" && " " + query}
                      {category !== "all" && ":" + category}
                      {price !== "all" && ":" + price}
                      {rating !== "all" && ": Rating" + rating + "& up"}
                      {query !== "all" ||
                      category !== "all" ||
                      rating !== "all" ||
                      price !== "all" ? (
                        <Button
                          variant="light"
                          onClick={() => navigate("/search")}
                        >
                          <i className="fas fa-times-circle"></i>
                        </Button>
                      ) : null}
                    </>
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <Form.Select
                    size="sm"
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrival</option>
                    <option value="lowest">Price:Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </Form.Select>
                </Col>
              </Row>
              {products.length === 0 && (
                <Error message="No Product Found" variant="dark" />
              )}
              <Row>
                {products.map((pro: any) => (
                  <Col sm={6} lg={4} className="mb-3" key={pro._id}>
                    <Card className="p-2 ">
                      <Link to={`/product/${pro._id}`}>
                        <Image
                          className=""
                          alt={pro.name}
                          fluid
                          src={pro.image}
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
                ))}
              </Row>
              <div>
                {Array.from(Array(pages).keys()).map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx+1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Search;
