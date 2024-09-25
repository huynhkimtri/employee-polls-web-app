import "../config/setupTests";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import PollForm from "../components/PollForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { saveQuestion } from "../utils/API";

const mockStore = configureStore([]);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../utils/API", () => ({
  saveQuestion: jest.fn(),
}));

describe("PollForm Snapshot Test", () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = mockStore({
      auth: { currentUser: { id: "user1" } },
    });

    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders correctly", () => {
    expect(
      render(
        <Provider store={store}>
          <Router>
            <PollForm />
          </Router>
        </Provider>
      )
    ).toMatchSnapshot();
  });
});

describe("PollForm Submission", () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = mockStore({
      auth: { currentUser: { id: "user1" } },
    });

    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    saveQuestion.mockResolvedValue({
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "user1",
    });
  });

  it("should render the PollForm and handle form submission", async () => {
    render(
      <Provider store={store}>
        <Router>
          <PollForm />
        </Router>
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Option 1"), {
      target: { value: "Option One" },
    });
    fireEvent.change(screen.getByPlaceholderText("Option 2"), {
      target: { value: "Option Two" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /Create Poll/i }));

    // Wait for the saveQuestion function to be called
    await waitFor(() => {
      expect(saveQuestion).toHaveBeenCalledWith({
        optionOneText: "Option One",
        optionTwoText: "Option Two",
        author: "user1",
      });
    });

    // Verify that the success message is displayed
    expect(
      await screen.findByText(/poll created successfully!/i)
    ).toBeInTheDocument();
  });
});

describe("PollForm Submission failed", () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = mockStore({
      auth: { currentUser: { id: "user1" } },
    });

    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    saveQuestion.mockRejectedValue(new Error("Failed to create poll"));
  });

  it("should render the PollForm and handle form submission failure", async () => {
    render(
      <Provider store={store}>
        <Router>
          <PollForm />
        </Router>
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Option 1"), {
      target: { value: "Option One" },
    });
    fireEvent.change(screen.getByPlaceholderText("Option 2"), {
      target: { value: "Option Two" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /Create Poll/i }));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(
        screen.getByText(/failed to create poll. please try again./i)
      ).toBeInTheDocument();
    });

    // Verify that saveQuestion was called with the correct data
    expect(saveQuestion).toHaveBeenCalledWith({
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "user1",
    });
  });
});
