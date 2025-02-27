import React from "react";
import { MdError } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light px-4">
          <MdError className="text-danger mb-3" size={100} />
          <h1 className="text-danger fw-bold mb-3">Oops! Something went wrong.</h1>
          <p className="text-muted mb-4 fs-5">
            Try refreshing the page or come back later.
          </p>
          <button className="btn btn-lg btn-primary px-4 py-2" onClick={this.handleReload}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
