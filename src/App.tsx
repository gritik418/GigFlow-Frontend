import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
