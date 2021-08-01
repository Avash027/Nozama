import { fireEvent, render, screen } from "@testing-library/react";

import UserProfile from "../UserProfile";
import { Provider } from "react-redux";
import store from "../../store";
import { createMemoryHistory } from "history";

const MockUserProfile = () => {
  const history = createMemoryHistory();
  return (
    <Provider store={store}>
      <UserProfile history={history}></UserProfile>
    </Provider>
  );
};

describe("UserProfile", () => {
  test("Name Input is visible", () => {
    render(<MockUserProfile />);
    const nameInput = screen.getByTestId("user-profile-name");
    expect(nameInput).toBeVisible();
  });

  test("Email Input is visible", () => {
    render(<MockUserProfile />);
    const emailInput = screen.getByTestId("user-profile-email");
    expect(emailInput).toBeVisible();
  });

  test("password Input is visible", () => {
    render(<MockUserProfile />);
    const passwordInput = screen.getByTestId("user-profile-password");
    expect(passwordInput).toBeVisible();
  });

  test("repassword Input is visible", () => {
    render(<MockUserProfile />);
    const repasswordInput = screen.getByTestId("user-profile-repassword");
    expect(repasswordInput).toBeVisible();
  });

  test("password Input is empty", () => {
    render(<MockUserProfile />);
    const passwordInput = screen.getByTestId("user-profile-password");
    expect(passwordInput.value).toBeFalsy();
  });

  test("repassword Input is empty", () => {
    render(<MockUserProfile />);
    const repasswordInput = screen.getByTestId("user-profile-repassword");
    expect(repasswordInput.value).toBeFalsy();
  });

  test("button is visible", () => {
    render(<MockUserProfile />);
    const buttonElem = screen.getByTestId("user-profile-button");
    expect(buttonElem).toBeVisible();
  });

  test("button is diabled", () => {
    render(<MockUserProfile />);
    const buttonElem = screen.getByTestId("user-profile-button");
    expect(buttonElem.disabled).toBeTruthy();
  });

  test("Name Input is showing correc text", () => {
    render(<MockUserProfile />);
    const nameInput = screen.getByTestId("user-profile-name");
    fireEvent.change(nameInput, { target: { value: "Avash" } });
    expect(nameInput.value).toBe("Avash");
  });

  test("email Input is showing correc text", () => {
    render(<MockUserProfile />);
    const emailInput = screen.getByTestId("user-profile-email");
    fireEvent.change(emailInput, { target: { value: "Avash" } });
    expect(emailInput.value).toBe("Avash");
  });

  test("password Input is showing correc text", () => {
    render(<MockUserProfile />);
    const passwordInput = screen.getByTestId("user-profile-password");
    fireEvent.change(passwordInput, { target: { value: "Avash" } });
    expect(passwordInput.value).toBe("Avash");
  });

  test("repassword Input is showing correc text", () => {
    render(<MockUserProfile />);
    const repasswordInput = screen.getByTestId("user-profile-repassword");
    fireEvent.change(repasswordInput, { target: { value: "Avash" } });
    expect(repasswordInput.value).toBe("Avash");
  });

  test("button is not diabled after entering text", () => {
    render(<MockUserProfile />);
    const buttonElem = screen.getByTestId("user-profile-button");

    const nameInput = screen.getByTestId("user-profile-name");
    fireEvent.change(nameInput, { target: { value: "Avash" } });

    const emailInput = screen.getByTestId("user-profile-email");
    fireEvent.change(emailInput, { target: { value: "Avash" } });

    const passwordInput = screen.getByTestId("user-profile-password");
    fireEvent.change(passwordInput, { target: { value: "Avash" } });

    const repasswordInput = screen.getByTestId("user-profile-repassword");
    fireEvent.change(repasswordInput, { target: { value: "Avash" } });

    expect(buttonElem.disabled).toBeFalsy();
  });
});
