import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Tooltip, Dialog, DialogContent } from "@material-ui/core";
import useFetchAuth from "../useFetchAuth";
import {Nav, Navbar } from "react-bootstrap";

export default function AppBarActions() {
  const [open, setOpen] = React.useState(false);
  const { data: environments, loading, error } = useFetchAuth(
    "/api/user/environments"
  );
  const {
    user,
    loginWithPopup,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  let authComponent = isAuthenticated ? (
    <>
      <Tooltip title="Logout" aria-label="logout">
        <Avatar
          src={user.picture}
          onClick={() =>
            logout({
              returnTo: window.location.protocol + "//" + window.location.host,
            })
          }
        />
      </Tooltip>
    </>
  ) : (
    <>
      <Button
      className="d-none"
        disableElevation
        onClick={() => loginWithPopup()}
      >
        Login
      </Button>
    </>
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [displayFlagSubmit, setDisplayFlagSubmit ] = useState(false);
  const handleSubmitFlag = ()=>{
    if(displayFlagSubmit){
      //display field is in open. checkflag + do validation on the field
      setDisplayFlagSubmit(!displayFlagSubmit);
    }else{
      setDisplayFlagSubmit(!displayFlagSubmit);
    }
  }

  return (
    <div className="topNav d-flex align-items-start">

      <Navbar expand="lg" className="p-0 flex-fill">
        <Navbar.Brand href="/home"><img src="logo.svg" alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="https://wsu.co1.qualtrics.com/jfe/form/SV_88hZcsQMzabAMOq" target="_blank">Report Issue</Nav.Link>
            <Nav.Link href="https://wsu.co1.qualtrics.com/jfe/form/SV_3HSX4XrAlj1L7mu" target="_blank">Anonymous Survey</Nav.Link>
            {/* <Nav.Link onClick={handleClickOpen}>Show environments (Testing Purposes)</Nav.Link> */}
            <input type="text" className={displayFlagSubmit? "inputFlag inputFlag-enable":"inputFlag inputFlag-disable"}/>
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

      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          {environments.map((e) => {
            return (
              <>
                <p>{e.id}</p>
              </>
            );
          })}
        </DialogContent>
      </Dialog>
      </div>
  );
}
