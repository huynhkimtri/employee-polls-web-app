import "../config/setupTests";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "../components/Login";
import { loginWithUsernamePassword } from "../utils/API";

const mockStore = configureStore([]);

jest.mock("../utils/API", () => ({
  loginWithUsernamePassword: jest.fn(),
}));

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { currentUser: null },
    });

    // Simulate failed login
    loginWithUsernamePassword.mockResolvedValue(null);
  });

  it("should render username field, password field, and submit button", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    // Verify that the username field is present
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();

    // Verify that the password field is present
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // Verify that the submit button is present
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("should display an error message when login fails", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(
        screen.getByText(/invalid username or password/i)
      ).toBeInTheDocument();
    });

    // Verify that loginWithUsernamePassword was called with the correct data
    expect(loginWithUsernamePassword).toHaveBeenCalledWith(
      "wronguser",
      "wrongpassword"
    );
  });
});
