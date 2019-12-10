import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Section, Heading, Card, Columns, Container } from "react-bulma-components";

import {flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import Swal from "sweetalert2";

import {updateUserMutation } from "../queries/mutations";
import {getRolesQuery, getUserQuery } from "../queries/queries";

const UpdateUser =props => {

let id = props.match.params.id;

useEffect(() =>{
console.log("firstName : " + firstName)
console.log("lastName :  " + lastName)
console.log("address :  " + address)
console.log("email :  " + email)
})

const user = props.getUserQuery.getUser ? props.getUserQuery.getUser : {};
	console.log(user.roleId);

const [ firstName ,setfirstName ] = useState("");
const [ lastName ,setlastName ] = useState("");
const [ address ,setaddress ] = useState("");
const [ email ,setemail ] = useState("");
const [roleId, setroleId] = useState("");
const [username, setUsername] = useState("");

	if (!props.getUserQuery.loading) {
		const setDefaultValues = () => {
			console.log(user.roleId);
			setroleId(user.roleId);
			setfirstName(user.firstName);
			setlastName(user.lastName);
			setaddress(user.address);
			setUsername(user.username);
			setemail(user.email);
		};		

		if (roleId === "") {
			setDefaultValues();
			console.log("roleId value after setDefault: " + roleId);
		}
	}


const firstNameHandler = e =>{
setfirstName(e.target.value);
}

const lastNameHandler = e =>{
setlastName(e.target.value);
}

const emailChangeHandler = e =>{
	setemail(e.target.value);
}

const addressChangehandler = e => {
	setaddress(e.target.value);
}

const roleIdChangehandler = e =>{
	setroleId(e.target.value);
}

const usernameChangeHandler = e =>{
	setUsername(e.target.value);
}

const formSubmitHandler = e => {
		

		e.preventDefault();
		let updatedUser = {
			id:id,
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			address:address,
			roleId: roleId

		};
		console.log(updatedUser);

		props.updateUserMutation({

			variables : updatedUser
		

		});

		Swal.fire({
			title: "user Updated",
			text: "user has been updated",
			type: "success",
			html: 
			'<a href="/user" class="button is-success">Go back to users </a>',
			showCancelButton: false,			  
			showConfirmButton: false,			  
		});



		
	};


	const roleOptions=()=> {
	console.log(props);
	let roleData = props.getRolesQuery;
	if(roleData.loading){
		return<option>Loading Roles..</option>

	}else {
		return roleData.getRoles.map(role =>{
			console.log(role);
			return(
					<option
						key={role.id}
						value={role.id}
						selected={role.id === roleId ? true : false}
					>
						{role.name}
					</option>
				)
		});
	}
}

return(
		<Container><Columns>
			<Columns.Column size="half" offset="one-quarter">
			<Heading>Update User</Heading>
			<Card>
				<Card.Header.Title>
					User Details
				</Card.Header.Title>
				<Card.Content>
					<form onSubmit= {formSubmitHandler}>
						<label className="label" htmlFor="firstName">
						Firstname
						</label>
						<input type="text"
						onChange={firstNameHandler}
						value={firstName}
						
						 className="input" />

						 <label className="label" htmlFor="firstName">
						Lastname
						</label>
						<input type="text"
						onChange={lastNameHandler}
						value={lastName}
						  className="input" />

						  <label className="label" htmlFor="firstName">
						Address
						</label>
						<input type="text"
						onChange={addressChangehandler}
						value={address}
						 className="input" />

						   <label className="label" htmlFor="email">
						Email
						</label>
						<input type="text"
						onChange={emailChangeHandler}
						value={email}
						 className="input" />

						   <label className="label" htmlFor="email">
						Username
						</label>
						<input type="text"
						onChange={usernameChangeHandler}
						value={username}
						 className="input" />

						 <label className="label" htmlFor="firstName">
						Role Name
						</label>
						<div className="select is-fullwidth">
						<select onChange={roleIdChangehandler} >{roleOptions()}</select>
						</div>
						<button type="submit" className="button is-success is-fullwidth	">
						Update User
						</button>
						<Link to ="/user">
						<button type="button"
						className="button is-danger is-fullwidth">Cancel</button>
						</Link>

					</form>
				</Card.Content>
			</Card>
			 </Columns.Column>
		</Columns></Container>
		);

}
export default compose(
	graphql(getRolesQuery, { name: "getRolesQuery" }),
	graphql(updateUserMutation, { name: "updateUserMutation" }),
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
)(UpdateUser);
