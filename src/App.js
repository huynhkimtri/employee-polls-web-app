import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MainPage from "./pages/MainPage";
import Leaderboard from "./components/Leaderboard";
import PollForm from "./components/PollForm";
import PollDetail from "./components/PollDetail";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";

export const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route element={<MainPage />}>
          <Route index element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add" element={<PollForm />} />
          <Route path="/questions/:id" element={<PollDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

const mapStateToProps = ({ users, polls, auth, loadingBar }) => ({
  users,
  polls,
  auth,
  loadingBar,
});

export default connect(mapStateToProps)(App);
