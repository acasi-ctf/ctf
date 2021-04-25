import React from "react";
import "./Home.css";
import useFetchAuth from "../useFetchAuth";
import GenericErrorPage from "./error-pages/genericErrorPage";
import Spinner from "../components/Spinner";
import UserNotAuthorized from "./error-pages/userNotAuthorized";

export default function Home() {
  const { data: authorizationInfo, error, loading } = useFetchAuth();
  debugger;
  if (error) return GenericErrorPage;
  if (loading) return Spinner;
  if (authorizationInfo.length === 0) return UserNotAuthorized;

  return (
    <div>
      <div className="Home">
        <h1>Home</h1>
      </div>
    </div>
  );
}
