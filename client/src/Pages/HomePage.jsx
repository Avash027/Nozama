import React, { useEffect, useState } from "react";
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
const PaginationContainer = loadable(() =>
  import("../Components/HomePageElements/PaginationContainer")
);

const PRODUCT_PER_PAGE = 3;

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [currentPage, setCurrentPage] = useState(1);
  const [productsListForPage, setProductsListForPage] = useState([]);

  useEffect(() => {
    document.title = "Nozama";
  }, []);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!products) return;

    //This is to select the products of the particular page
    setProductsListForPage(
      products.filter((product, index) => {
        return (
          index >= (currentPage - 1) * PRODUCT_PER_PAGE &&
          index < currentPage * PRODUCT_PER_PAGE
        );
      })
    );
  }, [currentPage, products]);

  let elementsToBeRendered;

  if (error) {
    elementsToBeRendered = <Error></Error>;
  } else if (loading) {
    elementsToBeRendered = <Loading></Loading>;
  } else if (products) {
    elementsToBeRendered = (
      <>
        <CarouselContainer products={products}></CarouselContainer>
        <div className="home-container">
          {productsListForPage.map((product) => {
            return (
              <div key={product._id} className="home-container-card-container">
                <Product product={product} />
              </div>
            );
          })}
        </div>
        <PaginationContainer
          setCurrentPage={setCurrentPage}
          totalPages={Math.floor(
            (products.length + PRODUCT_PER_PAGE - 1) / PRODUCT_PER_PAGE
          )}
        ></PaginationContainer>
      </>
    );
  }

  return <>{elementsToBeRendered}</>;
};

export default HomePage;
