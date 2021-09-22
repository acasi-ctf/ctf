import React from "react";
import "./Home.css";
import UserNotAuthorized from "./error-pages/userNotAuthorized";
import {useAuth0} from "@auth0/auth0-react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Card1 from "../components/temp/card1";
import Card2 from "../components/temp/card2";
import Card3 from "../components/temp/card3";

export default function Home() {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();

    if (!isAuthenticated) return <UserNotAuthorized/>;
    return (
        <>
            {/*TODO Landing Page Welcome */}

            <Box sx={{flexGrow: 1}} >
                <p class={"introText"}>
                    Welcome to Cyber Literacy For All. This is where we are going to put a really heartfelt
                    introduction that
                    will help users understand how our program can aid them in learning the many facets of hacking.
                </p>
            </Box>
            <Box sx={{flexGrow: 1}} id={"trendingChallengeCards"}>
                <Grid container spacing={2}>
                    <Grid item xs={12} class="trendingTitle">
                        <h1>Trending Challenges</h1>
                    </Grid>
                </Grid>
                <Grid  container justifyContent="space-evenly" alignItems={"center"}>
                    <Grid item xs={4}>
                        <Card1/>
                    </Grid>
                    <Grid item xs={4}>
                        <Card2/>
                    </Grid>
                    <Grid item xs={4}>
                        <Card3/>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
