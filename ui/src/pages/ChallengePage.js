import React, { useState, useEffect } from "react";
import "../style/ChallengePage.css";
import * as core from "@material-ui/core";

import PropTypes from "prop-types";
import Terminal from "../components/Terminal";

import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import {useParams} from "react-router-dom";
import fetchAuth from "../util/fetchAuth";

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

export default function ChallengePage() {
	//value variable control which is the chosen/selected tab in appbar
	const [value, setValue] = React.useState(0);
	// A function callback to update the value and the API path when an item is
	// clicked on TabMode.
	const handleChange = (event, newValue) => {
		setValue(newValue);
		const temp=`/api/challenge-sets/${csSlug}/challenges/${cSlug}`.toString()+'/docs/'
		+fetchData.documentation[newValue].path;
		setPath(temp);
	};

	const [txt, setMarkdown] = useState("");
	const [path, setPath] = useState("");
	const [fetchData, setData] = useState(0);

	let {csSlug, cSlug, envId} = useParams();

	// Trigger on clicking new Menu Items
	useEffect(() => {
		fetch(`/api/challenge-sets/${csSlug}/challenges/${cSlug}`)
			.then((res) => res.json())
			.then((json) => {
							// console.log(json);
							setValue(0);
							setData(json);
							const temp=`/api/challenge-sets/${csSlug}/challenges/${cSlug}`.toString()
							+'/docs/'+json.documentation[0].path;
							// console.log(temp);
							setPath(temp);
							setDat([]);
						});
	}, [csSlug, cSlug]);

	const [data, setDat] = useState([]);

	// this useEffect gets triggered when path hook is updated
	// update the documents in the component that display markdown
	useEffect(() => {
		if(!path.includes(`play/${csSlug}/${cSlug}`)){
			fetch(path)
			.then((res) => res.text())
			.then((text) => {
				setMarkdown(text);
			});
		}
	}, [path,csSlug,cSlug]);

	useEffect(() => {
		setTimeout(async () => {
			const resp = await fetchAuth(`/api/user/environments/${envId}/services`);
			console.log(await resp.json());
		}, 2500);
	}, [data, envId]);

	return (
		<div style={{
			display: "grid",
			height: "100%"
		}}>
			<div className="left-column">
				<core.AppBar position="static" color="default">
					<core.Tabs value={value} indicatorColor="primary" onChange={handleChange}
						textColor="primary" variant="scrollable" scrollButtons="auto" aria-label="simple auto tabs example" >
						{fetchData && fetchData.documentation.map((item, index) => {
							return (
								<core.Tab key={index} label={item.name}  {...a11yProps(item.index)} />
							);
						})}
					</core.Tabs>
				</core.AppBar>

				<TabPanel className="box1" value={value} index={value}
					style={{ overflowY: "scroll", margin: "5px" }}>
					<ReactMarkdown remarkPlugins={[gfm]} children={txt} style={{
						margin: "5px"
					}} />
				</TabPanel>
			</div>
			<div className="right-column">
				<Terminal key={envId} id={envId} />
			</div>
		</div>
	);
}
