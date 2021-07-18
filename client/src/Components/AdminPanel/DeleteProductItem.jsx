/***
 * @description : Display the particular product and also a delete button to remove element from database
 * @arguments product deleteProductHandler
 * @returns React Component
 * @async no
 */

const DeleteProductItem = ({ product, deleteProductHandler }) => {
  return (
    <div className="product-delete-item" key={product._id}>
      <div className="product-delete-name">{product.name}</div>
      <div className="product-delete-id">{product._id}</div>
      <div
        className="product-delete-button-container"
        onClick={(e) => deleteProductHandler(product._id)}
      >
        <div className="product-delete-button">&times;</div>
      </div>
    </div>
  );
};

export default DeleteProductItem;
