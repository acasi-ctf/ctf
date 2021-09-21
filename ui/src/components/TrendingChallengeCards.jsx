import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import Card1 from "./temp/card1";
import Card3 from "./temp/card3";
import Card2 from "./temp/card2";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function TrendingChallengeCards() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
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
    );
}
