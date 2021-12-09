import React, { useState, useEffect } from "react";
import '../style/Games.css'
import PreLoginPage from "./error-pages/preLoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import {Button, Card, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';

export default function Games() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gameData, setGameSetData] = useState([]);    

    useEffect(()=>{
        fetch('/api/challenge-sets/games/challenges')
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setGameSetData(data);
            console.log(data);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    },[]);

    return (
        <div className="row">
            <div className="challengesCol selection">
                <div className="container-fluid">
                    <div className="row flexWrap">
                        {gameData.map((gameSet, gameIndex) => (
                            <div className="col-lg-4 col-md-6">
                                <Link to={"/play/games/"+gameSet.slug}>
                                    <Card>
                                        <Card.Img variant="null" src={"challenges/c00"+ (++gameIndex === 5 ? 1 : gameIndex) +".jpg"} alt="thumb" className="mw-100"/>
                                        <Card.Body className="p-0">
                                        <Card.Text className="text-center">
                                        {gameSet.name}
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>               
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}