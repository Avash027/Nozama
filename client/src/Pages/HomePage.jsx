import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Components/Product";
import { listProducts } from "../actions/productActions";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  let elementsToBeRendered;

  if (error) {
    elementsToBeRendered = <Error></Error>;
  } else if (loading) {
    elementsToBeRendered = <Loading></Loading>;
  } else {
    elementsToBeRendered = (
      <>
    
      <div className="home-container">
        {products.map((product, idx) => {
          return (
            <div key={product._id} className="home-container-card-container">
              <Product product={product} />
            </div>
          );
        })}
      </div>
      </>
    );
  }

  return <>{elementsToBeRendered}</>;
};

export default HomePage;
