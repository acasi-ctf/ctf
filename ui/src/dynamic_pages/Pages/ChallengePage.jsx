import React from "react";

import ChallengeSetsNotFound from "../../pages/error-pages/ChallengeSetsNotFound";
import Spinner from "../../components/Spinner";
import useFetch from "../Services/useFetch";
import ChallengeCard from "../Components/ChallengeCard";

export default function ChallengeSets() {
  const { data: challengeSets, loading, error } = useFetch(
    "/api/challenge-sets"
  );

  if (error) throw error;
  if (loading) return <Spinner />;
  if (challengeSets.length === 0) return <ChallengeSetsNotFound />;

  function renderChallengeSetCard() {
    return (
      <div>
        <ul>
          {challengeSets.map((cs) => {
            return <ChallengeCard data={cs} />;
          })}
        </ul>
      </div>
    );
  }
  return renderChallengeSetCard(challengeSets);
}
