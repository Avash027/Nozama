import { screen, render } from "@testing-library/react";

import DeleteProductItem from "../DeleteProductItem";

const mockFn = jest.fn();

const mockProduct = {
  _id: "aaa",
  name: "product",
};

const MockDeleteProduct = () => {
  return (
    <DeleteProductItem product={mockProduct} deleteProductHandler={mockFn} />
  );
};

describe("DeleteProductItem", () => {
  test("should have visible product name", () => {
    render(<MockDeleteProduct></MockDeleteProduct>);
    const nameElement = screen.getByText("product");
    expect(nameElement).toBeVisible();
  });

  test("should have visible product id", () => {
    render(<MockDeleteProduct></MockDeleteProduct>);
    const idElement = screen.getByText("aaa");
    expect(idElement).toBeVisible();
  });

  test("should have visible delete button", () => {
    render(<MockDeleteProduct></MockDeleteProduct>);
    const deleteElement = screen.getByTestId("delete-button");
    expect(deleteElement).toBeVisible();
  });
});
