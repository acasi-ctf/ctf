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
import {useParams} from "react-router-dom";

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
	const handleChange = (event, newValue) => {
		setValue(newValue);
		const temp=`/api/challenge-sets/${csSlug}/challenges/${cSlug}`+'/'+fetchData.documentation[value].path;
		console.log(temp)
		setPath(temp);
	};

	const [txt, setMarkdown] = useState("");
	const [path, setPath] = useState("");
	// const [first, setfirst] = useState(0);
	const [fetchData, setData] = useState(0);
	let {csSlug, cSlug} = useParams();

	console.log('testing');
	console.log(`${csSlug}-${cSlug}`);
	
	useEffect(() => {
		fetch(`/api/challenge-sets/${csSlug}/challenges/${cSlug}`)
			.then((res) => res.json())
			.then((json) => {console.log(json);
							setData(json);
							setValue(0);});
	}, [csSlug, cSlug]);

	//Testing git commit for automatically add initials
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
	// if (!first) {
	// 	setPath(ChallengeSet1Data[0].itembox1);
	// 	setfirst(first + 1);
	// }

	return (
		<div style={{ display: "flex", flexDirection: "row", position: "fixed" }}>
			<div className="ChallengeSet1">
				<core.AppBar position="static" color="default">
					<core.Tabs value={value}indicatorColor="primary" onChange={handleChange}
						textColor="primary" variant="scrollable" scrollButtons="auto" aria-label="simple auto tabs example" >
						{fetchData && fetchData.documentation.map((item, index) => {
							return (
								<core.Tab key={index} label={item.name}  {...a11yProps(item.index)} />
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