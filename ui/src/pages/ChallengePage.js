import React, { useState, useEffect } from "react";
import "../style/ChallengePage.css";
import * as core from "@material-ui/core";

import PropTypes from "prop-types";
import Terminal from "../components/Terminal";

import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/Spinner";
import GenericErrorPage from "./error-pages/genericErrorPage";
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

export default function ChallengePage() {
	//value variable control which is the chosen/selected tab in appbar
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
		const temp=`/api/challenge-sets/${csSlug}/challenges/${cSlug}`.toString()+'/docs/'
		+fetchData.documentation[newValue].path;
		setPath(temp);
	};

	const [txt, setMarkdown] = useState("");
	const [path, setPath] = useState("");
	const [fetchData, setData] = useState(0);


	let {csSlug, cSlug} = useParams();

	// Trigger on clicking new Menu Items
	useEffect(() => {
		console.log('testing');
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
							setError(null);
							setLoading(true);
							setRunning(false);
						});
	}, [csSlug, cSlug]);


	const [data, setDat] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [running, setRunning] = useState(false);
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		async function init() {
			try {
				const accessToken = await getAccessTokenSilently();

				const options = {
					method: "POST",
					headers: {
						"Authorization": `Bearer ${accessToken}`,
						"Content-Type": "application/json"
					},
					body:JSON.stringify({
						"challengeSetSlug" :`${csSlug}`,
						"challengeSlug"  :`${cSlug}`
					})
				};

				const response = await fetch("/api/user/environments", options);
				if (response.ok) {
					const json = await response.json();
					setDat(json);
				} else {
					setError(response);
				}
			} catch (e) {
				console.log(e);
				setError(e);
			} finally {
				setLoading(false);
			}
		}
		if (isAuthenticated) {
			if (!running && loading) {
				setRunning(true);
				// noinspection JSIgnoredPromiseFromCall
				init();
			}
		}
	},  [getAccessTokenSilently, isAuthenticated, loading, running, csSlug, cSlug]);




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

	if (loading) return <Spinner />;
	if (error) return <GenericErrorPage />;

	return (
		<div style={{ display: "flex", flexDirection: "row", position: "fixed" }}>
			<div className="ChallengeSet1">
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
					style={{ overflowY: "scroll", marginTop: "5px", marginLeft: "5px" }}>
					<ReactMarkdown remarkPlugins={[gfm]} children={txt} style={{ marginLeft: "10px" }} />
				</TabPanel>
			</div>
			<Terminal key={data.id} id={data.id} />
		</div>
	);
}