import "../config/setupTests";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import PollForm from "../components/PollForm";
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

const mockStore = configureStore([]);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("PollForm Snapshot Test", () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = mockStore({
      auth: { currentUser: { id: "user1" } },
      // Add other initial state if needed
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
