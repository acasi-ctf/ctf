import React from "react";

import ChallengeSetsNotFound from "../../pages/error-pages/ChallengeSetsNotFound";
import Spinner from "../../components/Spinner";
import useFetch from "../Services/useFetch";
import ChallengeCard from "../Components/ChallengeCard";

export default function TrendingChallengeCards() {
  const {data: trendingChallenges, error, loading } = useFetch(
    "/api/trending-challenges"
  );

  if (error) throw error;
  if (loading) return <Spinner />;
  if (trendingChallenges.length === 0) return <ChallengeSetsNotFound />;

  function renderChallengeSetCard() {
    return (
      <div>
        <ul>
          {trendingChallenges.map((challenge) => {
            return <ChallengeCard data={challenge.challenge} />;
          })}
        </ul>

      </div>
    );
  }
  return renderChallengeSetCard(trendingChallenges);
}
