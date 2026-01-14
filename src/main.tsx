import { StrictMode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { Toaster } from "react-hot-toast";
import ProtectedWrapper from "./components/ProtectedWrapper/ProtectedWrapper.tsx";
import SocketProvider from "./contexts/socket/SocketProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ProtectedWrapper>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ProtectedWrapper>
        <Toaster />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
