import React from "react";
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

  let buttonStyle = { marginLeft: "15px" };
  let authComponent = isAuthenticated ? (
    <>
      <Tooltip title="Logout" aria-label="logout">
        <Avatar
          src={user.picture}
          style={buttonStyle}
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
        variant="contained"
        color="white"
        disableElevation
        style={buttonStyle}
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

  return (
    <div className="d-flex topNav">

      <Navbar  expand="xl">
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://wsu.co1.qualtrics.com/jfe/form/SV_88hZcsQMzabAMOq" target="_blank">Report Issue</Nav.Link>
            <Nav.Link href="https://wsu.co1.qualtrics.com/jfe/form/SV_3HSX4XrAlj1L7mu" target="_blank">Anonymous Survey</Nav.Link>
            <Nav.Link onClick={handleClickOpen}>Show environments (Testing Purposes)</Nav.Link>
            
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
                </DialogContent> *
              </Dialog> 
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      {/* <Button
        variant="contained"
        color="white"
        disableElevation
        href="https://wsu.co1.qualtrics.com/jfe/form/SV_88hZcsQMzabAMOq"
        target="_blank"
      >
        {" "}
        Report Issue
      </Button>

      <Button
        variant="contained"
        color="white"
        style={buttonStyle}
        disableElevation
        href="https://wsu.co1.qualtrics.com/jfe/form/SV_3HSX4XrAlj1L7mu"
        target="_blank"
      >
        {""}
        Anonymous Survey
      </Button>

      <Button
        variant="contained"
        color="white"
        style={buttonStyle}
        disableElevation
        onClick={handleClickOpen}
      >
        Show environments (Testing Purposes)
      </Button> */}

      {/* <Dialog
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
        </DialogContent> *
      </Dialog>  */}

      {authComponent}
    </div>
  );
}
