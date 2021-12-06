import React from "react";
import "../style/Home.css";
import PreLoginPage from "./error-pages/preLoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import {Button, Card, Nav} from "react-bootstrap";

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (!isAuthenticated) return <PreLoginPage />;
  return (
    <div className="container-fluid mt-3 mb-3">
      <div className="row">
        <div className="col-12">
          <h2>Welcome to Capture the Flag!</h2>
          <p>Capture the flag is a web-based application that allows you to start learning the basics of cyber literacy. Here we have a collection of activities that you can interact with, whether it's a familiar game written by one of our high school contributors or a security challenge written by some of our more experienced developers, we invite you to interact with our application and any feedback is welcome. This is a Learning platform, so if you don't succeed at first, keep trying! No one has ever accomplished anything great by just giving up.</p>
        </div>
        <hr/>
        <div className="col-12">
          <h3>Trending challenges</h3>
          <div className="challengesCol cHomeCol">
            <div className="container">
              <div className="row flexWrap">
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c001.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Caesar Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c002.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Letter to Number Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c003.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Morse Code Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c004.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Reverse Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>


        

              </div>
            </div>
          </div>

          <h3>Most Popular</h3>
          <div className="challengesCol cHomeCol">
            <div className="container">
              <div className="row flexWrap">
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c001.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Caesar Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c002.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Letter to Number Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c003.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Morse Code Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c004.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Reverse Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>       

              </div>
            </div>
          </div>

          <h3>Java Games</h3>
          <div className="challengesCol cHomeCol">
            <div className="container">
              <div className="row flexWrap">
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c001.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Caesar Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c002.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Letter to Number Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c003.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Morse Code Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-12">
                  <Nav.Link href="#">
                    <Card>
                      <Card.Img variant="null" src="challenges/c004.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                        <Card.Text className="text-center">
                          Reverse Cipher
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Nav.Link>
                </div>       

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
