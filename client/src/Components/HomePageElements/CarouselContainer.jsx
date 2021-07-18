import CarouselElements from "./CarouselElements";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="slider-container">
      {products.map((product) => (
        <CarouselElements
          product={product}
          key={product._id}
        ></CarouselElements>
      ))}
    </Slider>
  );
};

export default CarouselContainer;
