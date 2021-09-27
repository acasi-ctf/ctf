import React, { useState, useEffect } from "react";
import "../../style/ChallengeSet1.css";
import * as core from "@material-ui/core";
import {useGetAPI,useSetAPI} from '../../APIContext';
//FIX THIS DATA FOR EACH FILE

//CHALLENGE 1 = CAESAR CHALLENGE
/*----------------------------------------------------------------------------- */
import { ChallengeSet1Data } from "../challenge-data/ChallengeSet1Data";
/*----------------------------------------------------------------------------- */

import PropTypes from "prop-types";
import Terminal from "../../components/Terminal";

import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import useFetchAuth from "../../useFetchAuth";
import Spinner from "../../components/Spinner";
import GenericErrorPage from "../error-pages/genericErrorPage";

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

export default function CaeserCipher() {
	//value variable control which is the chosen/selected tab in appbar
	const [value, setValue] = React.useState(0);
	const handleChange = (events, newValue) => {
		setValue(newValue);
		setPath(ChallengeSet1Data[newValue].itembox1);
	};

	//ERROR WITH THIS, NOT ABLE TO FETCH AFTER THE FIRST FETCH.
	//ANYTHING COMES AFTER THE FIRST FETCH IS THE SAME AS THE FIRST
	//APIpath is updatable
	let APIpath =useGetAPI();	
	// API POST REQUEST TO THE SERVER
	// when this page in activate (during display), fetch will constantly load
	console.log("Current API path is: ", APIpath);
	const temp = useFetchAuth( APIpath);
	const {data, error, loading} = temp;
	console.log(data);

	//Testing git commit for automatically add initials

	//LEARN THIS FOR FUTURE WORK:
	//USESTATE HOOK WILL TRIGGER WHEN THE ASSIGNED FUNCTION IS CALL (EXAMPLE BELOW IS SETMARKDOWN/ SETPATH)
	//USEEFFECT HOOK WILL TRIGGER THE WHEN THE VARIABLE AT THE [] AT BOTTOM IS UPDATE. IN THIS CASE IS "PATH VARIABLE"
	const [txt, setMarkdown] = useState("");
	const [path, setPath] = useState("");
	const [first, setfirst] = useState(0);
	useEffect(() => {
		fetch(path)
		.then((res) => res.text())
		.then((text) => {
			setMarkdown(text);
		});
	}, [path]);
	// if (loading) return <Spinner />;
	// if (error) return <GenericErrorPage />;

	//this is to set first time rendering for mardown. Without this, it will redner html on first run
	if (!first) {
		setPath(ChallengeSet1Data[0].itembox1);
		setfirst(first + 1);
	}


	return (
		<div style={{ display: "flex", flexDirection: "row", position: "fixed" }}>
			<div className="ChallengeSet1">
				<core.AppBar position="static" color="default">
					<core.Tabs value={value} onChange={handleChange} indicatorColor="primary" 
						textColor="primary" variant="scrollable" scrollButtons="auto" aria-label="simple auto tabs example" >
						{ChallengeSet1Data.map((item, index) => {
							return (
								<core.Tab key={index} label={item.label} {...a11yProps(item.index)} />
							);
						})}
					</core.Tabs>
				</core.AppBar>

				<TabPanel className="box1" value={value} index={value} 
					style={{ overflowY: "scroll", marginTop: "5px", marginLeft: "5px" }}>
					<ReactMarkdown remarkPlugins={[gfm]} children={txt} style={{ marginLeft: "10px" }} />
				</TabPanel>
			</div>
			{/* <Terminal id={data.id} /> */}
		</div>
	);
}