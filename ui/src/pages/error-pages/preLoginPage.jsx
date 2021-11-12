import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form, Nav, Card} from "react-bootstrap";

export default function PreLoginPage() {
  const {
    loginWithPopup,
  } = useAuth0();

return <div className="challengesWrap">
    <div className="container">
      <div className="row mt-30">
        <div className="col-lg-8 col-md-7 mainContent">
          <div className="grayCol">
            <h2>How Wireless Technology Is Changing Business</h2>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
                undoubtable source.</p>

            <Nav className="actionLink">
              <Nav.Item className="mr77">
                <Nav.Link href="#" onClick={() => loginWithPopup()}>Learn More</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" onClick={() => loginWithPopup()}>Try Challenges</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <div className="col-lg-4 col-md-5">
          <div className="grayCol signinCol">
              <h2>Welcome to<br/><span><img src="/logo-dark.svg" alt="logo"/></span></h2>
            <img src="/login.svg" alt="login"/>
            <Button className="butn primaryBtn" onClick={() => loginWithPopup()} variant="primary" type="submit"> Sign In/ Sign Up</Button>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Trending Challenges</h3>
        </div>
      </div>
    </div>

    <div className="challengesCol ">
      <div className="container">
        <div className="row flexWrap">
          <div className="col-lg-4 col-md-6">
            <Nav.Link href="#" onClick={() => loginWithPopup()}>
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
          <div className="col-lg-4 col-md-6">
            <Nav.Link href="#" onClick={() => loginWithPopup()}>
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
          <div className="col-lg-4 col-md-6">
          <Nav.Link href="#" onClick={() => loginWithPopup()}>
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

          <div className="col-lg-4 col-md-6">
          <Nav.Link href="#" onClick={() => loginWithPopup()}>
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
          <div className="col-lg-4 col-md-6">
          <Nav.Link href="#" onClick={() => loginWithPopup()}>
              <Card>
                  <Card.Img variant="null" src="challenges/c003.jpg" alt="thumb" className="mw-100"/>
                  <Card.Body className="p-0">
                  <Card.Text className="text-center">
                  Comprehensive Cipher
                  </Card.Text>
                  </Card.Body>
              </Card>
              </Nav.Link>
          </div>
          <div className="col-lg-4 col-md-6">
          <Nav.Link href="#" onClick={() => loginWithPopup()}>
                  <Card>
                      <Card.Img variant="null" src="challenges/c001.jpg" alt="thumb" className="mw-100"/>
                      <Card.Body className="p-0">
                      <Card.Text className="text-center">
                      Directory Traversal
                      </Card.Text>
                      </Card.Body>
                  </Card>
                  </Nav.Link>

          </div>

          <div className="col-lg-4 col-md-6">
          <Nav.Link href="#" onClick={() => loginWithPopup()}>
              <Card>
                  <Card.Img variant="null" src="challenges/thumb03.jpg" alt="thumb" className="mw-100"/>
                  <Card.Body className="p-0">
                  <Card.Text className="text-center">
                  Web Structure
                  </Card.Text>
                  </Card.Body>
              </Card>
              </Nav.Link>
          </div>

        </div>
      </div>
    </div>

    {/* <div className="challengesCol">
      <div className="container">
        <div className="row flexWrap">
          <div className="col-lg-4 col-md-6">
            <Card>
              <Card.Img variant="null" src="challenges/thumb01.jpg" alt="thumb" className="mw-100"/>
              <Card.Body className="p-0">
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                </Card.Text>
                <div className="cardAction">
                  <Button variant="link">Play</Button>
                  <div className="btnGroup">
                    <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                    <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6">
            <Card>
              <Card.Img variant="null" src="challenges/thumb03.jpg" alt="thumb" className="mw-100"/>
              <Card.Body className="p-0">
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                </Card.Text>
                <div className="cardAction">
                  <Button variant="link">Play</Button>
                  <div className="btnGroup">
                    <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                    <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6">
              <Card>
                <Card.Img variant="null" src="challenges/thumb01.jpg" alt="thumb" className="mw-100"/>
                <Card.Body className="p-0">
                  <Card.Text>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                  </Card.Text>
                  <div className="cardAction">
                    <Button variant="link">Play</Button>
                    <div className="btnGroup">
                      <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                      <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
          </div>

          <div className="col-lg-4 col-md-6">
            <Card>
              <Card.Img variant="null" src="challenges/thumb01.jpg" alt="thumb" className="mw-100"/>
              <Card.Body className="p-0">
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                </Card.Text>
                <div className="cardAction">
                  <Button variant="link">Play</Button>
                  <div className="btnGroup">
                    <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                    <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6">
            <Card>
              <Card.Img variant="null" src="challenges/thumb02.png" alt="thumb" className="mw-100"/>
              <Card.Body className="p-0">
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                </Card.Text>
                <div className="cardAction">
                  <Button variant="link">Play</Button>
                  <div className="btnGroup">
                    <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                    <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6">
            <Card>
              <Card.Img variant="null" src="challenges/thumb04.png" alt="thumb" className="mw-100"/>
              <Card.Body className="p-0">
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                </Card.Text>
                <div className="cardAction">
                  <Button variant="link">Play</Button>
                  <div className="btnGroup">
                    <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                    <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-4 col-md-6">
            <Card>
              <Card.Img variant="null" src="challenges/thumb01.jpg" alt="thumb" className="mw-100"/>
              <Card.Body className="p-0">
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                </Card.Text>
                <div className="cardAction">
                  <Button variant="link">Play</Button>
                  <div className="btnGroup">
                    <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                    <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6">
            <Card>
              <Card.Img variant="null" src="challenges/thumb02.png" alt="thumb" className="mw-100"/>
              <Card.Body className="p-0">
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                </Card.Text>
                <div className="cardAction">
                  <Button variant="link">Play</Button>
                  <div className="btnGroup">
                    <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                    <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6">
            <Card>
              <Card.Img variant="null" src="challenges/thumb04.png" alt="thumb" className="mw-100"/>
              <Card.Body className="p-0">
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                </Card.Text>
                <div className="cardAction">
                  <Button variant="link">Play</Button>
                  <div className="btnGroup">
                    <Button className="bubbleBtn" variant="light"><img src="bell.svg" alt="bell"/></Button>
                    <Button className="bubbleBtn" variant="light"><img src="like.svg" alt="like"/></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div> */}
    <div className="footer">
      <Nav className="justify-content-center footerNav flex-wrap">
        <Nav.Item>
          <Nav.Link href="/home">Our Story</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home">Vision and mission</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home">Team</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home">Partners</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home">Terms of service</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="container">
        <div className="row mt-30">
          <div className="col">
            <p>cyberliteracyforall.com. all rights reserved.</p>
          </div>

          <div className="col">
            <Nav className="socialNav justify-content-center">
              <Nav.Item>
                <Nav.Link href="https://www.facebook.com/" target="blank"><img src="social/fb.png" alt="facebook"/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://www.instagram.com" target="blank"><img src="social/insta.png" alt="instagram"/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://pinterest.com" target="blank"><img src="social/pin.png" alt="pinterest"/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://twitter.com/" target="blank"><img src="social/twitter.png" alt="twitter"/></Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="col">
            <Nav className="footerSubNav">
              <Nav.Item>
                <Nav.Link href="/home">terms and conditions</Nav.Link>
              </Nav.Item>
              <Nav.Item className="ml-6">
                <Nav.Link href="/home">privacy policy</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
    </div>
  </div>;

}
