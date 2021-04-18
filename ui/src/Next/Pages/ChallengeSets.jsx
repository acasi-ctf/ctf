import React, { useState, useEffect } from "react";
import useFetch from "../Services/useFetch";
import ChallengeCard from "../Components/ChallengeCard";

export default function ChallengeSets() {
  const { data: challengeSets, loading, error } = useFetch(
    "/api/challenge-sets"
  );

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
