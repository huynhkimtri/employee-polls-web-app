import { screen, render } from "@testing-library/react";
import Login from "../components/Login";
import MainPage from "../pages/MainPage";

describe('Login Component', () => {
    it('should render username field, password field, and submit button', () => {
      // Render the Login component
      render(<Login />);
  
      // Check for the presence of the username field
      const usernameField = screen.getByLabelText(/username/i); // Assuming you have a label for the username field
      expect(usernameField).toBeInTheDocument();
  
      // Check for the presence of the password field
      const passwordField = screen.getByLabelText(/password/i); // Assuming you have a label for the password field
      expect(passwordField).toBeInTheDocument();
  
      // Check for the presence of the submit button
      const submitButton = screen.getByRole('button', { name: /submit/i }); // Adjust the button name as needed
      expect(submitButton).toBeInTheDocument();
    });
  });