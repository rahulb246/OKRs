// import ErrorBoundary from "react-error-boundary";
import React from "react";
import "./styles.css";
import OKRs from "./components/OKRs";

const ErrorComponent = () => {
  return <h1>Something went wrong</h1>;
};

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" }
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    console.log(error, info);
    const { children } = this.props;

    return hasError ? <ErrorComponent /> : children;
  }
}

export default function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <OKRs />
      </ErrorBoundary>
    </div>
  );
}
