import React,{useState} from "react";
import logo from "./../logo.svg";
import {  Hero,Section,Container,Media,Heading,Content,Image, Columns,  Button } from "react-bulma-components";
import { getSingersQuery} from "../queries/queries";
import {flowRight as compose } from "lodash";
import Swal from "sweetalert2";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import {Jumbotron,Card,Form} from 'react-bootstrap';
import ControlledCarousel from './ControlledCarousel';

import { createTransactionMutation } from "../queries/mutations";
import { getUsersQuery} from "../queries/queries";
import Example from "./Calendar";

import {toBase64, nodeServer} from "../Function.js";

const Index = props => {
	const data = props.data;
  const singerData = props.getSingersQuery.getSingers ? props.getSingersQuery.getSingers: [];
	const userData = props.getUsersQuery.getUsers ? props.getUsersQuery.getUsers: [];
	
  const [userId,setUserId] = useState("");
  const [singerId,setSingerId] = useState("");
  const [date,setDate] = useState("");
  const [status,setStatus] = useState("");


  const userIdChangeHandler = e => {
    console.log(e.target.value);
    setUserId(e.target.value);
  };


  const singerIdChangeHandler = e => {
    console.log(e.target.value);
    setSingerId(e.target.value);
  };


   const dateChangeHandler = e => {
    console.log(e.target.value);
    setDate(e.target.value);
  };


console.log(userId);


const addTransaction = e => {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'User Added',
      showConfirmButton: false,
      timer: 2500
    })

    e.preventDefault();

    let newTransaction = {
      date: date
    
    
      
    };
    console.log(newTransaction);

    props.createTransactionMutation({


      variables : newTransaction,
      

    });

  };
	return (

<Hero size="fullheight" className="dj" >

<ControlledCarousel/>

<section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Book Now!
      </h1>
      <h2 class="subtitle">
        book Now!
      </h2>
    </div>
  </div>
</section>
<Columns >
   {singerData.map(singer =>{

       return(
        <Form onSubmit={addTransaction}>
        <Card id="hcard" className="shadow" style={{ width: '58rem' }}>
        <Columns>
            <Columns.Column>
          <Card.Img variant="top"  id="imgsingers" src={nodeServer() +singer.imageLocation} class="fadeIn"/>
            </Columns.Column>
          <Columns.Column>
          <Card.Body>
          
            <Card.Title>{singer.name}</Card.Title>
                     <input type="hidden" value={props.id}/>
            <Card.Text>
             {singer.description}
            </Card.Text>
            <input type ="hidden" />
            <input type ="hidden" value={singer.Id} />

           
            <div>
              <Link to= {"/booking/" +singer.id}>
            <Button type="submit" id="book" variant="primary"> Book Now</Button>
              </Link>
            </div>
          </Card.Body>
           </Columns.Column>
        </Columns>
        </Card>

      </Form>

    	);
		})}

  
   </Columns>
</Hero>
		);
};

export default compose(
  graphql(getSingersQuery,{ name: "getSingersQuery"}),
  graphql(getUsersQuery,{ name: "getUsersQuery"}),

  graphql(createTransactionMutation, { name: "createTransactionMutation"}),
	)(Index);

