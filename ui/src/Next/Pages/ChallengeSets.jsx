import React, { useState, useEffect } from "react";
import useFetch from "../Services/useFetch";
import ChallengeCard from "../Components/ChallengeCard";
import Spinner from "../Components/Spinner";
import ChallengeSetsNotFound from "./ChallengeSetsNotFound";

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
