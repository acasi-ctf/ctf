import React from "react";

import ChallengeSetsNotFound from "../../pages/error-pages/ChallengeSetsNotFound";
import Spinner from "../../components/Spinner";
import useFetch from "../Services/useFetch";
import ChallengeCard from "../Components/ChallengeCard";

export default function TopChallengeCards() {
  const {data: topChallenges, error, loading } = useFetch(
    "/api/top-challenges"
  );

  if (error) throw error;
  if (loading) return <Spinner />;
  if (topChallenges.length === 0) return <ChallengeSetsNotFound />;
  debugger;
  function renderChallengeSetCard() {
    return (
      <div>
        <ul>
          {topChallenges.map((challenge) => {
            return <ChallengeCard data={challenge.challenge} />;
          })}
        </ul>
      </div>
    );
  }
  return renderChallengeSetCard(topChallenges);
}
