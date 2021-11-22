import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";
//replacing individual import by import all and reference by "UI." For example: UI.Card
import * as UI from "@material-ui/core" ;

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useParams, Link, NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 230,
    maxHeight: 332,
    marginRight: "20px",
    display: "inline-block",
    marginTop:"20px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ChallengeCard(props) {
  const classes = useStyles();
  // const { ChallengeSet } = useParams();
  // console.log(props.data)
  return (
    // link to homepage for now. Will link to path later in future
    <Link to={'/'}>
      <UI.Card className={classes.root}>
        <UI.CardHeader 
          title={props.data.name} 
          titleTypographyProps={{variant:'h6'}}
          style={{ textAlign: 'center' }}
        />
        <UI.CardMedia component="img" height="194" 
                      image={props.img?props.img:"challenges/c002.jpg"}/>
        <UI.CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom  >
            {props.data.description}
          </Typography>
        </UI.CardContent>
        <UI.CardActions>
          {/* <Button size="small">Continue</Button> */}
        </UI.CardActions>
      </UI.Card>
    </Link>
  );
}
