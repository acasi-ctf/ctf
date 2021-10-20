import React from "react";
import "../style/Home.css";
import UserNotAuthorized from "./error-pages/userNotAuthorized";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (!isAuthenticated) return <UserNotAuthorized />;
  return (
    <div>
      <div className="Home">
        <h1>Home</h1>
      </div>
    </div>
  );
}
