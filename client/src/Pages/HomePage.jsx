import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import loadable from "@loadable/component";

const Product = loadable(() =>
  import("../Components/HomePageElements/Product")
);
const Loading = loadable(() => import("../Components/Others/Loading"));
const Error = loadable(() => import("../Components/Others/Error"));
const CarouselContainer = loadable(() =>
  import("../Components/HomePageElements/CarouselContainer")
);

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
        <CarouselContainer products={products}></CarouselContainer>
        <div className="home-container">
          {products.map((product) => {
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
