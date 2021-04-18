import React from "react";
import ReactDOM from "react-dom";
import App from "./Next/App";
import { Auth0Provider } from "@auth0/auth0-react";
import ErrorBoundary from "./Next/Services/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Auth0Provider
        domain="acasictf-dev-lg.us.auth0.com"
        clientId="NwK4H7fWWg67IxOQujxId6HHsCkCp44b"
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </ErrorBoundary>
  </React.StrictMode>,

  document.getElementById("root")
);
