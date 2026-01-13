import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ProtectedWrapper from "./components/ProtectedWrapper/ProtectedWrapper";
import ExploreGigsPage from "./pages/ExploreGigsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import MyGigsPage from "./pages/MyGigsPage";
import CreateGigPage from "./pages/CreateGigPage";

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
        <Route
          path="/gigs"
          element={
            <>
              <Navbar />
              <MyGigsPage />
            </>
          }
        />
        <Route
          path="/gigs/explore"
          element={
            <>
              <Navbar />
              <ExploreGigsPage />
            </>
          }
        />
        <Route
          path="/gigs/new"
          element={
            <>
              <Navbar />
              <CreateGigPage />
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
