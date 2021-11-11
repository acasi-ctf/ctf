import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "@material-ui/core";
import {Nav, Navbar } from "react-bootstrap";

export default function AppBarActions(props) {
  const {
    user,
    loginWithPopup,
    logout,
    isAuthenticated,
  } = useAuth0();

  const handleSubmitFlag = () => {
    const inputSubmitFlag = document.getElementById('inputSubmitFlag');
    if (inputSubmitFlag.value !== '') {
      window.alert(`Your flag is: ${inputSubmitFlag.value}`);
      return;
    }

    props.setDisplay(!props.displayInput);
  }

  return (
    <div className="topNav d-flex align-items-start">

      <Navbar expand="lg" className="p-0 flex-fill">
        <Navbar.Brand href="/home"><img src="/logo.svg" alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="https://wsu.co1.qualtrics.com/jfe/form/SV_88hZcsQMzabAMOq" target="_blank">Report Issue</Nav.Link>
            <Nav.Link href="https://wsu.co1.qualtrics.com/jfe/form/SV_3HSX4XrAlj1L7mu" target="_blank">Anonymous Survey</Nav.Link>
            <input id="inputSubmitFlag" type="text"
                   className={props.displayInput? "inputFlag inputFlag-enable":"inputFlag inputFlag-disable"}
                   maxLength="50" minLength="1"/>
            <Nav.Link onClick={handleSubmitFlag}> Submit Flag </Nav.Link>

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
  );
}
