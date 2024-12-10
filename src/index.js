import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter basename="/">
          <ThemeContext>
            <PersistGate loading={<>Loading....</>} persistor={persistor}>
              <App />
            </PersistGate>
          </ThemeContext>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
