import React from "react";

import ChallengeSetsNotFound from "../../pages/error-pages/ChallengeSetsNotFound";
import Spinner from "../../components/Spinner";
import useFetch from "../Services/useFetch";
import ChallengeCard from "../Components/ChallengeCard";

export default function GameCards() {
  const { data: challenges, loading, error } = useFetch(
    "/api/challenge-sets/games/challenges"
  );

  if (error) throw error;
  if (loading) return <Spinner />;
  if (challenges.length === 0) return <ChallengeSetsNotFound />;

  function renderChallengeSetCard() {
    return (
      <div>
        <ul>
          {challenges.map((challenge) => {
            return <ChallengeCard data={challenge}/>;
          })}
        </ul>
      </div>
    );
  }
  return renderChallengeSetCard(challenges);
}
