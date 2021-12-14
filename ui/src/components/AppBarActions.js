import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "@material-ui/core";
import {Nav, Navbar } from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectEnvironmentId, selectFlagSubmissionVisibility} from "../state";
import FlagNotification from "./NotificationToast";
import {useParams} from "react-router-dom";
import fetchAuth from "../util/fetchAuth";

export default function AppBarActions(props) {
  const {
    user,
    loginWithPopup,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const showFlagSubmission = useSelector(selectFlagSubmissionVisibility);
  const environmentId = useSelector(selectEnvironmentId);


  const [displayToast, setDisplayToast] = useState(false);
  const [color, setColor] = useState("black");
  const [msg, setMessage] = useState("");
  const toggleDisplayToast = () => {
    setDisplayToast(!displayToast);
  }


  const handleSubmitFlag =  async (e) => {
    const inputSubmitFlag = document.getElementById('inputSubmitFlag');
    if (inputSubmitFlag.value !== '') {
      let accessToken = await getAccessTokenSilently();
      let ret = await fetchAuth(`/api/user/environments/${environmentId}/submit`, accessToken, "POST", {
        "value": inputSubmitFlag.value,
      });
      //reset the input field
      inputSubmitFlag.value = "";
      if (ret.status === 204) {
        props.setDisplay(!props.displayinput);
        setDisplayToast(true);
        setColor("rgb(37, 190, 58)");
        setMessage("Congratulation! Flag is correct");
      } else if (ret.status === 400) {
        props.setDisplay(!props.displayinput);
        setDisplayToast(true);
        setColor("rgb(156, 55, 55)");
        setMessage("Incorrect flag. Try again");
      }
      else {
        window.alert("Unknown error occurred!");
      }
      return;
    }

    props.setDisplay(!props.displayinput);
    inputSubmitFlag.focus();
  }


  useEffect(()=>{
    const inputSubmitFlag = document.getElementById('inputSubmitFlag');
    inputSubmitFlag.addEventListener('keydown', function(e){
      if(e.code === 'Enter'){
        e.preventDefault();
        document.getElementById('flagSubmitButon').click();
        e.stopPropagation();
      }
    },true);
  },[]);

  return (
    <>
    {/* Notification toast */}
    {displayToast? <FlagNotification display={displayToast} action={toggleDisplayToast} color={color} message={msg}/>:null}
    <div className="topNav d-flex align-items-start">
      <Navbar expand="lg" className="p-0 flex-fill">
        <Navbar.Brand href="/home"><img src="//www.cyberliteracyforall.com/wp-content/uploads/2021/10/cyberliteracyforall.png" alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="https://wsu.co1.qualtrics.com/jfe/form/SV_88hZcsQMzabAMOq" target="_blank">Report Issue</Nav.Link>
            <Nav.Link href="https://wsu.co1.qualtrics.com/jfe/form/SV_3HSX4XrAlj1L7mu" target="_blank">Anonymous Survey</Nav.Link>
            <input id="inputSubmitFlag" type="text"
                   className={props.displayinput? "inputFlag inputFlag-enable":"inputFlag inputFlag-disable"}
                   maxLength="50" minLength="1"/>

            {
              showFlagSubmission
                  ? <Nav.Link id="flagSubmitButon" onClick={handleSubmitFlag}> Submit Flag </Nav.Link>
                  : null
            }

            {isAuthenticated ? (
            <div className="loginUserWrap">
              <span className="ml-0-m">Welcome, User</span>
              <Avatar
                src={user.picture}
                className="avatarBox"
                onClick={() =>
                  logout({
                    returnTo: window.location.protocol + "//" + window.location.host,
                  })
                }
              />
              <span onClick={() =>
                  logout({
                    returnTo: window.location.protocol + "//" + window.location.host,
                  })
                }>logout</span>
            </div>
            ) : (
            <Nav.Link onClick={() => loginWithPopup()} >Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
      </>
  );
}
