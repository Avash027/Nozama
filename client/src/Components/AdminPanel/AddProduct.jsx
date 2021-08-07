/***
 * @description : Accepts all the necessary details of products and sends the details to submit handler
 * @arguments products details and functions to set product details
 * convertImageToBase64 - to convert the image uploaded to base 64 format
 * @returns React Component
 * @async no
 */

const AddProduct = ({
  dispatch,
  state,
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
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "SET_NAME", payload: e.target.value })
          }
          required={true}
        />

        <br />

        <label className="product-add-label">Brand</label>
        <br />
        <input
          type="text"
          className="product-add-input"
          placeholder="Product Brand"
          value={state.brand}
          onChange={(e) =>
            dispatch({ type: "SET_BRAND", payload: e.target.value })
          }
          required={true}
        />
        <br />

        <label className="product-add-label">Category</label>
        <br />
        <input
          type="text"
          className="product-add-input"
          placeholder="Product Category"
          value={state.category}
          onChange={(e) =>
            dispatch({ type: "SET_CATEGORY", payload: e.target.value })
          }
          required={true}
        />
        <br />

        <label className="product-add-label">Description</label>
        <br />
        <input
          type="text"
          className="product-add-input"
          placeholder="Product Description"
          value={state.description}
          onChange={(e) =>
            dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
          }
          required={true}
        />
        <br />

        <label className="product-add-label">Price</label>
        <br />
        <input
          type="number"
          className="product-add-input"
          placeholder="Product Price"
          value={state.price}
          onChange={(e) =>
            dispatch({ type: "SET_PRICE", payload: e.target.value })
          }
          required={true}
        />
        <br />

        <label className="product-add-label">Current Stock</label>
        <br />
        <input
          type="number"
          className="product-add-input"
          placeholder="Product Stock"
          value={state.stock}
          onChange={(e) =>
            dispatch({ type: "SET_STOCK", payload: e.target.value })
          }
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
