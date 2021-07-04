import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

import Error from "../Components/Others/Error";
import Loading from "../Components/Others/Loading";
import SearchItemElement from "../Components/SearchPageElements/SearchItemElement";
import { _findProductsByName } from "../utils/SearchPageutil";

const SearchPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log(products);
    const filteredProducts = _findProductsByName(products, match.params.query);
    setSearchResults(filteredProducts);
  }, [products, match]);

  const redirectHandler = (_id) => {
    history.push(`/product/${_id}`);
  };

  let searchedItems;

  if (!products && error) searchedItems = <Error></Error>;
  else if (products && products.length !== 0) {
    searchedItems = searchResults.map((product) => (
      <SearchItemElement
        key={product._id}
        product={product}
        redirectHandler={redirectHandler}
      />
    ));
  } else if (loading) {
    searchedItems = <Loading></Loading>;
  } else if (!loading && products.length === 0) {
    searchedItems = <h2>No items found</h2>;
  }

  return <div>{searchedItems}</div>;
};

export default SearchPage;
