import React, { useState, useEffect } from "react";
import { useParams, useNavitate } from "react-router-dom";
import useFetch from "../Services/useFetch";

export default function ChallengeSets(props) {
  const [size, setSize] = useState("");
  const  { data: challenges, loading, error } = useFetch(
    "https://discord.com/channels/@me/753680111529754766/832821249695809617"
  );




  function renderChallenges(challenges) {
    return <div key={challenges.id} className={"challengeSet"}>
        <Link to={`/${}`}
    </div>;
  }
}
