import React from "react";
import "../style/Home.css";
import PreLoginPage from "./preLoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import GameCards from "../dynamic_pages/Components/GameCards";
import TopChallengeCards from "../dynamic_pages/Components/TopChallengeCards";
import TrendingChallengeCards from "../dynamic_pages/Components/TrendingChallengeCards";

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (!isAuthenticated) return <PreLoginPage />;
  return (
    <div className="row">
      <h2>Most Popular Challenges</h2>
      <div className="col-12">
        <TopChallengeCards/>
      </div>
      <h2>Trending Challenges</h2>
      <div className="col-12">
        <TrendingChallengeCards/>
      </div>
      <h2>Games</h2>
      <div className="col-12">
        <GameCards/>
      </div>
    </div>
  );
}
