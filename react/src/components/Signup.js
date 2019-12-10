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

import {  createUserMutation } from "../queries/mutations";
import {getUsersQuery} from "../queries/queries";

const SignUp = props => {


  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 

   const firstNameChangeHandler = e => {
    console.log(e.target.value);
    setfirstName(e.target.value);
  };
  const lastNameChangeHandler = e => {
    console.log(e.target.value);
    setlastName(e.target.value);
  };
  const addressChangeHandler = e => {
    console.log(e.target.value);
    setaddress(e.target.value);
  };
  const emailChangeHandler = e => {
    console.log(e.target.value);
    setemail(e.target.value);
  };
  const usernameChangeHandler = e => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = e => {
    setPassword(e.target.value);
  };

  const addUser = e => {
      
    Swal.fire({
		  position: 'top-end',
		  icon: 'success',
		  title: 'Registered Successfully',
		  showConfirmButton: false,
		  timer: 2500
		})

    e.preventDefault();
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      address:address,
      email:email,
   
      username:username,
      password:password
    };
    console.log(newUser);

    props.createUserMutation({
    

      variables : newUser,
      refetchQueries: [{
        query: getUsersQuery
      }]



    });
    setfirstName("");
    setlastName("");
    setaddress("");
    setemail("");
    setUsername("");
    setPassword("");
  };




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
        <Link to={"/login" }>
        <span>Login</span>
         </Link>
      </a>
    </li>
    <li>
      <a>
        <span></span>
         
        <span>SignUp</span>
        
      </a>
    </li>
 
   
  </ul>
</div>
        </div>

       <Form id="form" onSubmit={addUser}>

    
     <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>First Name</Form.Label>
      <Form.Control onChange={firstNameChangeHandler} value={firstName} type="text" placeholder="Enter first name" />
    </Form.Group>

     <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Last Name</Form.Label>
      <Form.Control onChange={lastNameChangeHandler} value={lastName} type="text" placeholder="Enter last name" />
    </Form.Group>
  </Form.Row>


  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control onChange={emailChangeHandler} value={email} type="email" placeholder="Enter email" />
    </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridUsername">
    <Form.Label>User Name</Form.Label>
    <Form.Control onChange={usernameChangeHandler} value={username} placeholder="Enter Username" />
  </Form.Group>

   <Form.Group as={Col} controlId="formGridUsername">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={passwordChangeHandler} value={password} placeholder="Enter Password" />
  </Form.Group>
</Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control onChange={addressChangeHandler} value={address} placeholder="1234 Main St" />
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
   graphql(createUserMutation,{ name: "createUserMutation"}),
	)(SignUp);

