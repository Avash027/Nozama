const CarouselElements = ({ product }) => {
  return (
    <div className="slider-element" key={product._id}>
      <a href={`/product/${product._id}`} className="slider-element-link">
        <img
          src={product.image}
          className="slider-element-img"
          alt={product.name}
        ></img>

        <h2 className="slider-element-heading">{product.name}</h2>
      </a>
    </div>
  );
};

export default CarouselElements;
