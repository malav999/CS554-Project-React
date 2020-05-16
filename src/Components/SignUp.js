import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "./Navbars/ExamplesNavbar.js";
import TransparentFooter from "./Footers/TransparentFooter.js";

import { Redirect } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import SocialSignIn from './SocialSignin'
import Axios from "axios";
//css helper function

function SignUp() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  let { currentUser } = useContext(AuthContext);
  const [pwMatch, setpwMatch] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { displayName, email, passwordOne, passwordTwo } = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setpwMatch('Password do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(email.value, passwordOne.value, displayName.value)
      let token = await currentUser.getIdToken()
      const { temp } = await Axios.post("http://localhost:8000/api/adduser", {
        email: email.value, userName: displayName.value,
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': 'multipart/form-data',
          'authtoken': token
        }
      });

      // let temp = await Axios.post("http://localhost:8000/api/adduser", { email: email.value, userName: displayName.value })
      console.log(temp)

    } catch (error) {
      alert(error);
    }
  }
  if (currentUser) {
    console.log(currentUser)
    return <Redirect to='/account' />
  }
  return (
    <>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../assets/img/test2.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <form onSubmit={handleSignUp}>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        name="displayName"
                        placeholder="Display Name"
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        id='email'
                        name="email"
                        type="email"
                        placeholder="Email"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="passwordOne"
                        required
                        name="passwordOne"
                        type="password"
                        placeholder="Password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="passwordTwo"
                        required
                        name="confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      size="lg"
                      id="submitButton" name="submitButton" type="submit"
                    >
                      Sign Up
                  </Button>
                    <SocialSignIn />

                  </CardFooter>
                </form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>

      {/* <div>
        <h1>Sign Up page</h1>
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label>
              Name:
            <input
                className="form-control"
                required
                name="displayName"
                type="text"
                placeholder="Name"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
            <input
                className="form-control"
                required
                name="email"
                type="email"
                placeholder="Email"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
            <input
                className="form-control"
                id="passwordOne"
                required
                name="passwordOne"
                type="password"
                placeholder="Password"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Confirm Password:
            <input
                className="form-control"
                id="passwordTwo"
                required
                name="confirm-password"
                type="password"
                placeholder="password"
              />
            </label>
          </div>
          <button id="submitButton" name="submitButton" type="submit">
            Sign Up
        </button>
        </form>
        <br />
       
      </div> */}

    </>
  );
}

export default SignUp;
