import React from "react";
import "./Home.css";
import UserNotAuthorized from "./error-pages/userNotAuthorized";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  debugger;
  if (!isAuthenticated)
    return (
      <div className="Home">
        <UserNotAuthorized />
      </div>
    );

  return (
    <div>
      <div className="Home">
        <h1>Home</h1>
      </div>
    </div>
  );
}
