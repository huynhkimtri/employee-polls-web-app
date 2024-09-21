import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Leaderboard from "./components/Leaderboard";
import PollForm from "./components/PollForm";
import PollDetail from "./components/PollDetail";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/add" element={<PollForm />} />
        <Route path="/questions/:id" element={<PollDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
