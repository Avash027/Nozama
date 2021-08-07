export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_BRAND":
      return { ...state, brand: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_STOCK":
      return { ...state, stock: action.payload };
    case "SET_FILES":
      return { ...state, files: action.payload };

    default:
      return state;
  }
};

export const initialState = {
  name: "",
  brand: "",
  category: "",
  description: "",
  price: 0,
  stock: 0,
  files: "",
};
