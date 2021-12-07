import React, { useState, useEffect } from "react";
import "../style/Home.css";
import PreLoginPage from "./error-pages/preLoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import {Button, Card, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom'

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  //const [dataLength, setDataLength] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [trendingChallengeData, setTrendingChallengeData] = useState([]);
  const [topChallengeData, setTopChallengeData] = useState([]);
  const [gameChallengeData, setGameChallengeData] = useState([]);
  useEffect(()=>{
    fetch('/api/trending-challenges')
    .then(res => res.json())
    .then(
      (data) => {
        setIsLoaded(true);
        setTrendingChallengeData(data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  },[]);

  useEffect(()=>{
    fetch('/api/top-challenges')
    .then(res => res.json())
    .then(
      (data) => {
        setIsLoaded(true);
        setTopChallengeData(data);
        console.log('Top Challenge Data =>');
        console.log(data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  },[]);

  useEffect(()=>{
    fetch('/api/challenge-sets/games/challenges')
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        setIsLoaded(true);
        setGameChallengeData(data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  },[]);

  if (!isAuthenticated) return <PreLoginPage />;
  return (
    <div className="container-fluid mt-3 mb-3">
      <div className="row">
        <div className="col-12">
          <h2>Welcome to Capture the Flag!</h2>
          <p>Capture the flag is a web-based application that allows you to start learning the basics of cyber literacy. Here we have a collection of activities that you can interact with, whether it's a familiar game written by one of our high school contributors or a security challenge written by some of our more experienced developers, we invite you to interact with our application and any feedback is welcome. This is a Learning platform, so if you don't succeed at first, keep trying! No one has ever accomplished anything great by just giving up.</p>
        </div>
        <hr/>
        <div className="col-12">
          <h3>Trending challenges</h3>
          <div className="challengesCol cHomeCol">
            <div className="container">
              <div className="row flexWrap">
              {trendingChallengeData.map((trending, trendingIndex) => (
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Link to={"/play/"+trending.challengeSet.slug+"/"+trending.challenge.slug}>
                    <Card>
                      <Card.Img variant="null" src={"challenges/c00"+ (trendingIndex === 0 ? 2 : trendingIndex) +".jpg"} alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center" key={trendingIndex}>
                        {trending.challenge.name}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
                  ))}
              </div>
            </div>
          </div>

          <h3>Most Popular</h3>
          <div className="challengesCol cHomeCol">
            <div className="container">
              <div className="row flexWrap">
              {topChallengeData.map((popular, topIndex) => (
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Link to={"/play/"+popular.challengeSet.slug+"/"+popular.challenge.slug}>
                    <Card>
                    <Card.Img variant="null" src={"challenges/c00"+ (topIndex === 0 ? 2 : topIndex) +".jpg"} alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center" key={topIndex}>
                        {popular.challenge.name}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
                  ))}

              </div>
            </div>
          </div>

          <h3>Java Games</h3>
          <div className="challengesCol cHomeCol">
            <div className="container">
              <div className="row flexWrap">
              {gameChallengeData.map((javagame, gameIndex) => (
                <div className="col-xl-3 col-lg-6 col-md-12">
                   <Link to={"/play/games/"+javagame.slug}>
                    <Card>
                      <Card.Img variant="null" src={"challenges/c00"+ (gameIndex === 0 ? 2 : gameIndex) +".jpg"} alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center" key={gameIndex}>
                        {javagame.name}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
                  ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
