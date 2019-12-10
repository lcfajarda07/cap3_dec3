

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button, Box } from "react-bulma-components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ApolloClient from "apollo-boost"; //siya maglilink sa backend
import {ApolloProvider} from "react-apollo";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

//components
import User from "./components/User";
import UpdateUser from "./components/UpdateUser";
import UpdateSinger from "./components/UpdateSinger";
import Singer from "./components/Singer";
import Date from "./components/Date";
import NavBar from "./components/Navbar";
import Index from "./components/Index";
import Booking from "./components/Booking";
import Login from "./components/Login";
import ControlledCarousel from "./components/ControlledCarousel";
import Example from "./components/Calendar";
import Transaction from "./components/Transactions";
import FooterPage from "./components/FooterPage";
import Signup from "./components/Signup";



const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

function App() {
  const [username, setUserName] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  // const [position, setPosition] = useState(localStorage.getItem("pas"));
  console.log("this is the value of username: " + username);
  // console.log("this is the value of position: " + position);

  const updateSession = () => {
    setUserName(localStorage.getItem("username"));
    setUserId(localStorage.getItem("userId"));
  };

  const Logout = () => {
    localStorage.clear();
    updateSession();
    return <Redirect to="/login" />;
  };

  const loggedUser = props => {
    // ... (spread operator) retains all the existing props
    // and added a new prop called updateSession
    return <Login {...props} updateSession={updateSession} />;
  };

// //create an istance to all our GraphQL components
// const client = new ApolloClient({uri: " http://localhost:5000/graphql"});


  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <NavBar username={username} id={userId}/>
      <Switch>
         <Route exact path="/user" component={User} />
         <Route exact path="/user/update/:id" component={UpdateUser} />
         <Route exact path="/singer/update/:id" component={UpdateSinger} />
         <Route exact path="/" component={Index} />
         <Route exact path="/singer" component={Singer} />
         <Route exact path="/date" component={Date} />
         <Route exact path="/booking/:id" component={Booking} />
         <Route exact path="/login" component={Login} />
         <Route exact path="/signup" component={Signup} />
         <Route exact path="/calendar" component={Example} />
         <Route exact path="/transaction" component={Transaction} />
         <Route path="/login" render={loggedUser} />
         <Route path="/logout" component={Logout} />
   
      <User/>

      </Switch>
      <FooterPage/>
    </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
