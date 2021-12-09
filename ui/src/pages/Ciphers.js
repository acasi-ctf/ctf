import React, { useState, useEffect } from "react";
import '../style/Ciphers.css'
import PreLoginPage from "./error-pages/preLoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import {Button, Card, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';

export default function Ciphers() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ciphersData, setCiphersSetData] = useState([]);    

    useEffect(()=>{
        fetch('/api/challenge-sets/ciphers/challenges')
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setCiphersSetData(data);
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
                        {ciphersData.map((cipherSet, cipherIndex) => (
                            <div className="col-lg-4 col-md-6">
                                <Link to={"/play/ciphers/"+cipherSet.slug}>
                                    <Card>
                                        <Card.Img variant="null" src={"challenges/c00"+ (++cipherIndex === 5 ? 1 : cipherIndex) +".jpg"} alt="thumb" className="mw-100"/>
                                        <Card.Body className="p-0">
                                        <Card.Text className="text-center">
                                        {cipherSet.name}
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