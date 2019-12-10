import React,{useEffect,useState} from "react";
import logo from "./../logo.svg";
import { Hero,Section,Container,Media,Heading,Content,Image, Columns, Card, Button } from "react-bulma-components";
import { getSingersQuery} from "../queries/queries";
import {flowRight as compose } from "lodash";
import Swal from "sweetalert2";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import {Tabs,Tab,Form,Jumbotron,Col,Row} from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import { loginUserMutation } from "../queries/mutations";

const Login = props => {

  console.log(props);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logInSuccess, setLogInSuccess] = useState(false);

  const usernameChangeHandler = e => {
    // console.log(e.target.value);
    setUsername(e.target.value);
  }

  const passwordChangeHandler = e => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  }

  const submitFormhandler = e => {
    e.preventDefault();
    console.log("clicked");
    props.loginUserMutation({
      variables : {
        username : username,
        password : password
      }
    })
    .then(response => {
      console.log(response);  
      let data = response.data.logInUser;
      console.log(data);



        if (data === null){
          Swal.fire({
            title: "Login Failed",
            text: "wrong credentials",
            icon :"error"
          });
        } else {
          //credentials are correct
          //setItem("key", "value")
          localStorage.setItem('username' , data.username);
          localStorage.setItem('userid' , data.id);
          props.updateSession();
          setLogInSuccess(true);
        }
    });
  }
  // useEffect(()=>{
  //   console.log(username);
  //   console.log(password);
  // });

if (!logInSuccess) {
    console.log("something went wrong...");
  } else {
    console.log("successful login");
    return <Redirect to="/" />;
  }



	return (

<Hero size="fullheight" id="wood" >

  <Container>
  <Row  className="justify-content-md-center">
    <Col id="col" >
        <div class="w3-container w3-teal">
     <div class="tabs is-boxed">
  <ul>
    <li class="is-active">
      <a>
        <span></span>
       
        <span>Login</span>
       
      </a>
    </li>
    <li>
      <a>
        <span></span>
         <Link to={"/signup" }>
        <span>SignUp</span>
         </Link>
      </a>
    </li>
 
   
  </ul>
</div>
        </div>

<Form id="loginform" onSubmit={submitFormhandler}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="username" placeholder="Enter username" value={username} onChange={usernameChangeHandler} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={passwordChangeHandler} />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    </Col>

    <Col>

    </Col>
 
  </Row>
  </Container>


</Hero>
		);
};

export default compose(
  graphql(getSingersQuery,{ name: "getSingersQuery"}),
	graphql(loginUserMutation,{ name: "loginUserMutation"}),
	)(Login);

