import { screen, render } from "@testing-library/react";
import { useReducer } from "react";
import AddProduct from "../AddProduct";
import { initialState, reducer } from "../../../utils/ProductAddReducer";
const mockFn = jest.fn();

const MockAddProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AddProduct
      state={state}
      dispatch={dispatch}
      convertImageToBase64={mockFn}
      AddProductSubmitHandler={mockFn}
    ></AddProduct>
  );
};

describe("AddProduct elements are visible", () => {
  test("Name input field is visible", () => {
    render(<MockAddProduct></MockAddProduct>);
    const nameElement = screen.getByPlaceholderText("Product Name");
    expect(nameElement).toBeVisible();
  });

  test("Brand input field is visible", () => {
    render(<MockAddProduct></MockAddProduct>);
    const brandElement = screen.getByPlaceholderText("Product Brand");
    expect(brandElement).toBeVisible();
  });

  test("Category input field is visible", () => {
    render(<MockAddProduct></MockAddProduct>);
    const categoryElement = screen.getByPlaceholderText("Product Category");
    expect(categoryElement).toBeVisible();
  });
  test("Price input field is visible", () => {
    render(<MockAddProduct></MockAddProduct>);
    const priceElement = screen.getByPlaceholderText("Product Price");
    expect(priceElement).toBeVisible();
  });
  test("Stock input field is visible", () => {
    render(<MockAddProduct></MockAddProduct>);
    const stockElement = screen.getByPlaceholderText("Product Stock");
    expect(stockElement).toBeVisible();
  });

  test("Button is visible", () => {
    render(<MockAddProduct></MockAddProduct>);
    const buttonElement = screen.getByRole("button", {
      name: "Add the product",
    });
    expect(buttonElement).toBeVisible();
  });
});

describe("Input fields are empty", () => {
  test("Name input field is empty", () => {
    render(<MockAddProduct></MockAddProduct>);
    const nameElement = screen.getByPlaceholderText("Product Name");
    expect(nameElement.value).toBeFalsy();
  });

  test("Brand input field is empty", () => {
    render(<MockAddProduct></MockAddProduct>);
    const brandElement = screen.getByPlaceholderText("Product Brand");
    expect(brandElement.value).toBeFalsy();
  });

  test("Category input field is empty", () => {
    render(<MockAddProduct></MockAddProduct>);
    const categoryElement = screen.getByPlaceholderText("Product Category");
    expect(categoryElement.value).toBeFalsy();
  });
  test("Price input field is empty", () => {
    render(<MockAddProduct></MockAddProduct>);
    const priceElement = screen.getByPlaceholderText("Product Price");
    expect(priceElement.value).toBe(String(0));
  });
  test("Stock input field is empty", () => {
    render(<MockAddProduct></MockAddProduct>);
    const stockElement = screen.getByPlaceholderText("Product Stock");
    expect(stockElement.value).toBe(String(0));
  });
});
