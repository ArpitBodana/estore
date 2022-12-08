import React, { useEffect } from "react";
import Products from "../Components/Products";
import { fetchProducts } from "../Redux";
import { MapState, ProductState } from "../Redux/Products/ProductType";
import { connect } from "react-redux";
import LoadingSpinner from "../Components/LoadingSpinner";
import Error from "../Components/Error";
import { Helmet } from "react-helmet-async";

type HomeType = {
  fetchProducts: Function;
  productData: ProductState;
};
function Home({ fetchProducts, productData }: HomeType) {
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <Helmet>
        <title>eStore</title>
      </Helmet>
      {productData.loading ? (
        <LoadingSpinner />
      ) : productData.error ? (
        <Error message={`${productData.error}`} variant="warning" />
      ) : (
        <Products products={productData.products} />
      )}
    </div>
  );
}

const mapStateToProps = (state: MapState) => {
  return {
    productData: state.product,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
