import React,{useState,useEffect} from "react";
import logo from "./../logo.svg";
import { Table,Section,Container,Media,Heading,Content,Image, Columns, Card, Button } from "react-bulma-components";
import { getSingerQuery} from "../queries/queries";
import {flowRight as compose } from "lodash";
import Swal from "sweetalert2";
import { graphql } from "react-apollo";
import Example from "./Calendar";
import {Form,Col,Row} from 'react-bootstrap';
import { createUserMutation} from "../queries/mutations";
import { Link } from "react-router-dom";

import {getUsersQuery,getUserQuery} from "../queries/queries";
import {toBase64, nodeServer} from "../Function.js";

const Booking = props => {
  console.log(props);
	const data = props.data;
  const singer = props.getSingerQuery.getSinger ? props.getSingerQuery.getSinger: [];

	const user = props.getUserQuery.getUser ? props.getUserQuery.getUser: [];

 const [name, setName] = useState("");
  const [description, setDescription] = useState("");


///for create username

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(()=> {
    console.log(lastName);
    console.log(firstName);
    console.log(address);

    console.log(email);
    console.log(username);
    console.log(password);
  
  });
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

<div>
<Columns>

<Columns.Column size={8}>
   <Card id="projbook" className="shadow">
      <Card.Image size="4by3" src={nodeServer() +singer.imageLocation} />

        
      <Card.Content>
        <Media>
         <h3><strong>{singer.name}</strong></h3>
       
        </Media>
        <Content>

          {singer.description}
         
        </Content>
       
    
      

      </Card.Content>
    </Card>
    </Columns.Column>

    <Columns.Column size={4}>

      
        <Card id="dash">
      <Card.Header>
        <Card.Header.Title>Dashboard</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <Media>
        
          <Media.Item>
            <Heading size={4}>Transaction Details</Heading>
       
          </Media.Item>
        </Media>
        <Content>
        Transaction Id: 
        <br/>
         Transaction date:
        <br/>
        User: {user.name}
         <br/>
          Chosen Singer: {singer.name}
          <br />
          Event date:

           <br />
          Status:


          
        </Content>
      </Card.Content>
      <Card.Footer id="footer">
        <Card.Footer.Item renderAs="a" href="/transaction">Proceed</Card.Footer.Item>
        <Card.Footer.Item renderAs="a" href="/">Cancel</Card.Footer.Item>
        
      </Card.Footer>
    </Card>
    </Columns.Column>
   
</Columns>
</div>
		);
};

export default compose(

  graphql(getUsersQuery,{ name: "getUsersQuery"}),
  graphql(createUserMutation,{ name: "createUserMutation"}),
	graphql(getSingerQuery, {
    options: props => {
      // retrieve the wildcard id param
      console.log(props.match.params.id);
      return {
        variables: {
          id: props.match.params.id
        }
      };
    },
    name: "getSingerQuery"
  }),

    graphql(getUserQuery, {
    options: props => {
      // retrieve the wildcard id param
      console.log(props.match.params.id);
      return {
        variables: {
          id: props.match.params.id
        }
      };
    },
    name: "getUserQuery"
  })
	)(Booking);

