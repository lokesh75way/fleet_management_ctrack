import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "./i18n";
import { PermissionProvider } from "./context/PermissionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./jsx/components/ErrorBoundary/ErrorBoundary";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PermissionProvider>
          <ToastContainer />
          <ThemeContext>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </ThemeContext>
        </PermissionProvider>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>

);

reportWebVitals();
