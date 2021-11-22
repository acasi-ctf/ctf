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
    <div className="homePageContainer">
      <strong className="challengeTitle">Most Popular Challenges</strong>
      <TopChallengeCards/>
      <strong className="challengeTitle">Trending Challenges</strong>
      <TrendingChallengeCards/>
      <strong className="challengeTitle">Games</strong>
      <GameCards/>
    </div>
  );
}
