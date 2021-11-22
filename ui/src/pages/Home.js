import React from "react";
import "../style/Home.css";
import PreLoginPage from "./error-pages/preLoginPage";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (!isAuthenticated) return <PreLoginPage />;
  return (
    <div className="row">
      <div className="col-12"><h1>Home</h1></div>
    </div>
  );
}
