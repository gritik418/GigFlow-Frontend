import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedWrapper from "./components/ProtectedWrapper/ProtectedWrapper";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <ProtectedWrapper>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </ProtectedWrapper>
  );
}

export default App;
