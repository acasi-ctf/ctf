import React from "react";
import "./Home.css";
import UserNotAuthorized from "./error-pages/userNotAuthorized";
import {useAuth0} from "@auth0/auth0-react";
import TrendingChallengeCards from "../components/TrendingChallengeCards";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';

export default function Home() {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();

    if (!isAuthenticated) return <UserNotAuthorized/>;
    return (
        <div>


            {/*TODO Landing Page Welcome */}

            <div id="home" class={"introText"}>
                <p>
                    Welcome to Cyber Literacy For All. This is where we are going to put a really heartfelt
                    introduction that
                    will help users understand how our program can aid them in learning the many facets of hacking.
                </p>
            </div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <div>
                        <Grid item xs={12} class="trendingTitle">
                            <h1>Trending Challenges</h1>
                        </Grid>
                        <Grid item xs={12}>

                            <TrendingChallengeCards/>
                        </Grid>
                    </div>
                </Grid>

            </Box>


            {/*TODO Dynamic list of popular challenges.*/}

        </div>
    );
}
