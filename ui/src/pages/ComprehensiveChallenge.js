import React, { useState, useEffect } from "react";
import "./ChallengeSet1.css";
import * as core from "@material-ui/core";
//FIX THIS DATA FOR EACH FILE
//CHALLENGE 1 = CAESAR CHALLENGE
/*----------------------------------------------------------------------------- */
import { Challengedata } from "./ComprehensiveChallengeData";
/*----------------------------------------------------------------------------- */
// import {useLocation, Link, useParams} from 'react-router-dom';
import PropTypes from "prop-types";
import Terminal from "../components/Terminal";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import useFetchAuth from "../useFetchAuth";
import GenericErrorPage from "./error-pages/genericErrorPage";
import Spinner from "../components/Spinner";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <core.Box style={{ padding: 0 }} p={3}>
        <core.Typography>{children}</core.Typography>
      </core.Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function ComprehensiveChallenge() {
  const [value, setValue] = React.useState(0);
  const handleChange = (events, newValue) => {
    setValue(newValue);
    setPath(Challengedata[newValue].itembox1);
  };

  const { data, error, loading } = useFetchAuth(
    "api/user/environments",
    "POST",
    { challengeSetSlug: "ciphers", challengeSlug: "comprehensive-challenge" }
  );
  const [txt, setMarkdown] = useState("");
  const [path, setPath] = useState("");
  const [first, setFirst] = useState(0);

  //LEARN THIS FOR FUTURE WORK:
  //USESTATE HOOK WILL TRIGGER WHEN THE ASSIGNED FUNCTION IS CALL (EXAMPLE BELOW IS SETMARKDOWN/ SETPATH)
  //USEEFFECT HOOK WILL TRIGGER THE WHEN THE VARIABLE AT THE [] AT BOTTOM IS UPDATE. IN THIS CASE IS "PATH VARIABLE"

  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        setMarkdown(text);
      });
  }, [path]);
  //this is to set first frim rendering for mardown. Without this, it will redner html on first run
  if (loading) return <Spinner />;
  if (error) return <GenericErrorPage />;
  if (!first) {
    setPath(Challengedata[0].itembox1);
    setFirst(first + 1);
  }
  return (
    <div style={{ display: "flex", flexDirection: "row", position: "fixed" }}>
      <div className="ChallengeSet1">
        <core.AppBar position="static" color="default">
          <core.Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="simple auto tabs example"
          >
            {Challengedata.map((item, index) => {
              return (
                // <core.Tab key={item.index} label={item.label} {...a11yProps(item.index)} component={Link} to={`${item.topic}/${item.label}`} />
                <core.Tab
                  key={index}
                  label={item.label}
                  {...a11yProps(item.index)}
                />
              );
            })}
          </core.Tabs>
        </core.AppBar>

        {/* <ReactMarkdown source={Challengedata[value].itembox1}/> */}

        <TabPanel
          className="box1"
          value={value}
          index={value}
          style={{ overflowY: "scroll", marginTop: "5px", marginLeft: "5px" }}
        >
          {/* {Challengedata[value].itembox1}  */}
          <ReactMarkdown
            remarkPlugins={[gfm]}
            children={txt}
            style={{ marginLeft: "10px" }}
          />
        </TabPanel>
      </div>
      <Terminal id={data.id} />
    </div>
  );
}
