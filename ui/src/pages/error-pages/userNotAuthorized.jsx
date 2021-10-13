import React from "react";
// import Container from '@material-ui/core/Container'
import { Button } from "react-bootstrap";

export default function UserNotAuthorized() {
  // return <h1>Please log in</h1>;

    return <div className="challengesWrap">
              <div className="container">
                <div className="row mt-30">
                  <div className="col-lg-8 col-md-7 mainContent">
                    <div className="grayCol">
                      <h2>How Wireless Technology Is Changing Business</h2>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
                      
                      <ul className="actionLink">
                        <li className="mr77"><a href="">Learn More</a></li>
                        <li><a href="">Try Challenges</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5">
                    <div className="grayCol signinCol">
                      <h2>Sign In</h2>
                      <form action="">
                        <div className="inputControl">
                          <input type="text" placeholder="Email"/>
                          <input type="passsword" placeholder="Password"/>
                        </div>
                        <p className="rememberMeCol form-check">
                          <input type="checkbox" id="rememberMe" className="form-check-input"/>
                          <label htmlFor="rememberMe" className="m-0 form-check-label"> Remember me</label>
                        </p>
                        <Button className="butn primaryBtn" variant="primary"> Sign in</Button>
                        <Button className="butn secondaryBtn"  variant="secondary"><img src="google.svg" alt="google"/> Sign in with Google</Button>
                        <p className="loginAction mb-0">
                          <a href="">Can't log in?</a>
                          <a href="">Create Account</a>
                        </p>
                      </form>
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

              <div className="challengesCol">
                <div className="container">
                  <div className="row flexWrap">
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <img src="challenges/thumb01.jpg" alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                             <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                             <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                      <img src="challenges/thumb02.png" alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                             <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                             <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                      <img src="challenges/thumb04.png" alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                              <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                              <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <img src="challenges/thumb01.jpg" alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                             <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                             <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                      <img src="challenges/thumb02.png" alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                             <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                             <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                      <img src="challenges/thumb03.jpg" alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                              <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                              <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <img src="challenges/thumb01.jpg" alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                             <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                             <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                      <img src="challenges/thumb02.png"  alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                             <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                             <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                      <img src="challenges/thumb03.jpg"  alt="thumb"/>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, </p>
                        <div className="cardAction">
                          <a href="/">Play</a>
                          <div className="btnGroup">
                              <button className="bubbleBtn"><img src="bell.svg" alt="bell"/></button>
                              <button className="bubbleBtn"><img src="like.svg" alt="like"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer">
                <ul className="footerNav">
                  <li><a href="">Our Story</a></li>
                  <li><a href="">Vision and mission</a></li>
                  <li><a href="">Team</a></li>
                  <li><a href="">Partners</a></li>
                  <li><a href="">Terms of service</a></li>
                </ul>
                <div className="container">
                  <div className="row mt-30">
                  <div className="col col-sm-12">
                      <p>cyberliteracyforall.com. all rights reserved.</p>
                    </div>

                    <div className="col col-sm-12">
                      <ul className="socialNav">
                        <li><a href=""><img src="social/fb.png" alt="facebook"/></a></li>
                        <li><a href=""><img src="social/insta.png" alt="instagram"/></a></li>
                        <li><a href=""><img src="social/pin.png" alt="pin"/></a></li>
                        <li><a href=""><img src="social/twitter.png" alt="twitter"/></a></li>
                      </ul>
                    </div>

                    <div className="col col-sm-12">
                      <ul>
                        <li> <a href="">terms and conditions</a></li>
                        <li className="ml-6"> <a href="">privacy policy</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>;

}
