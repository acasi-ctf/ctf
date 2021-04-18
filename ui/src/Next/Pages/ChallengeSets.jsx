import React, { useState, useEffect } from "react";
import useFetch from "../Services/useFetch";
import ChallengeCard from "../Components/ChallengeCard";

export default function ChallengeSets() {
  const [size, setSize] = useState("");
  const { data: challengeSets, loading, error } = useFetch(
    "https://ctf.gorence.io/api/challenge-sets"
  );
  debugger;
  function renderChallengeSetCard(cs) {
    return (
      <div>
        <ul>
          {challengeSets}
          {/*{challengeSets.map((cs) => {
            return <ChallengeCard props={cs} />;*/}
          })}
        </ul>
      </div>
    );
  }
}
