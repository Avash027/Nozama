/***
 * @description : Accepts all the necessary details of products and sends the details to submit handler
 * @arguments products details and functions to set product details
 * convertImageToBase64 - to convert the image uploaded to base 64 format
 * @returns React Component
 * @async no
 */

const AddProduct = ({
  name,
  setName,
  brand,
  setBrand,
  category,
  setCategory,
  description,
  setDescription,
  price,
  setPrice,
  stock,
  setStock,
  convertImageToBase64,
  AddProductSubmitHandler,
}) => {
  return (
    <div>
      <div className="product-add">
        <label className="product-add-label">Name</label>
        <br />
        <input
          type="text"
          className="product-add-input"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />

        <br />

        <label className="product-add-label">Brand</label>
        <br />
        <input
          type="text"
          className="product-add-input"
          placeholder="Product Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required={true}
        />
        <br />

        <label className="product-add-label">Category</label>
        <br />
        <input
          type="text"
          className="product-add-input"
          placeholder="Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required={true}
        />
        <br />

        <label className="product-add-label">Description</label>
        <br />
        <input
          type="text"
          className="product-add-input"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />
        <br />

        <label className="product-add-label">Price</label>
        <br />
        <input
          type="number"
          className="product-add-input"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required={true}
        />
        <br />

        <label className="product-add-label">Current Stock</label>
        <br />
        <input
          type="number"
          className="product-add-input"
          placeholder="Product Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required={true}
        />
        <br />

        <input
          className="product-add-fileinput"
          type="file"
          name="Upload the image"
          id="imguploader"
          accept="image/png, image/jpeg , image/webp"
          onChange={convertImageToBase64}
        />

        <button
          onClick={AddProductSubmitHandler}
          className="button button-primary"
        >
          Add the product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
