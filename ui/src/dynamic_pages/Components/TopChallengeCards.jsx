import React from "react";

import ChallengeSetsNotFound from "../../pages/error-pages/ChallengeSetsNotFound";
import Spinner from "../../components/Spinner";
import useFetch from "../Services/useFetch";
import ChallengeCard from "../Components/ChallengeCard";
import {Card} from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";

export default function TopChallengeCards() {
  const {data: topChallenges, error, loading } = useFetch(
    "/api/top-challenges"
  );
  if (error) throw error;
  if (loading) return <Spinner />;
  if (topChallenges.length === 0) return <ChallengeSetsNotFound />;
  // function renderChallengeSetCard() {
    
    return (
      <ul>
        {topChallenges.map((challenge,idx) => { 
          return <ChallengeCard 
                    data={challenge.challenge} 
                    key={"top"+idx.toString()}
                  />;
        })}
      </ul>
    );
  // }
  // return renderChallengeSetCard(topChallenges);
}
