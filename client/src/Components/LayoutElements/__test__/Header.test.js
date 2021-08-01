import { screen, render, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../../store";

const MockHeader = () => {
  return (
    <Provider store={store}>
      <Header></Header>
    </Provider>
  );
};

describe("Header", () => {
  test("title is visible", () => {
    render(<MockHeader></MockHeader>);
    const headerTitle = screen.getByText("Nozama");
    expect(headerTitle).toBeVisible();
  });

  test("search bar is empty", () => {
    render(<MockHeader />);
    const emptyInput = screen.getByPlaceholderText("Phones,Laptops");
    expect(emptyInput).toBeVisible();
  });

  test("search bar takes the input", () => {
    render(<MockHeader />);
    const Input = screen.getByPlaceholderText("Phones,Laptops");
    fireEvent.change(Input, { target: { value: "Phone" } });
    expect(Input.value).toBe("Phone");
  });

  test("search button is visible", () => {
    render(<MockHeader />);
    const searchButton = screen.getByTestId("test-searchButton");
    expect(searchButton).toBeVisible();
  });

  test("search button is disabled when no text is in search bar", () => {
    render(<MockHeader />);
    const searchButton = screen.getByTestId("test-searchButton");
    expect(searchButton).toHaveStyle(`pointer-events:none`);
  });

  test("search button is enabled when text is in search bar", () => {
    render(<MockHeader />);
    const searchButton = screen.getByTestId("test-searchButton");
    const Input = screen.getByPlaceholderText("Phones,Laptops");
    fireEvent.change(Input, { target: { value: "Phone" } });

    expect(searchButton).toHaveStyle(`pointer-events:auto`);
  });
});
