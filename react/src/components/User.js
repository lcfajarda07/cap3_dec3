import React,{useEffect,useState} from "react";
import { Container, Columns, Card, Button } from "react-bulma-components";
import { Link } from "react-router-dom";
import {flowRight as compose } from "lodash";
import Swal from "sweetalert2";
import { graphql } from "react-apollo";
import {Table, Breadcrumb, Modal} from 'react-bootstrap';

import {getUsersQuery,getRolesQuery} from "../queries/queries";

import { createUserMutation ,deleteUserMutation} from "../queries/mutations";

const User = props => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const [firstName, setfirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [address, setaddress] = useState("");
	const [email, setemail] = useState("");
	const [roleId, setRoleId] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");


	useEffect(()=> {
		console.log(lastName);
		console.log(firstName);
		console.log(address);
		console.log(roleId);
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
	const roleIdChangeHandler = e => {
	setRoleId(e.target.value);

	};
	const deleteUserHandler = e => {
		console.log("delete");
	let id=e.target.id;
	
			  Swal.fire({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
			  if (result.value) {

			props.deleteUserMutation({
			variables: {id : id},
			refetchQueries: [{
				query: getUsersQuery
			}]
		})

			    Swal.fire(
			      'Deleted!',
			      'Your file has been deleted.',
			      'success'
			    )
			  }
			})

	};
	const addUser = e => {

		Swal.fire({
		  position: 'top-end',
		  icon: 'success',
		  title: 'User Added',
		  showConfirmButton: false,
		  timer: 2500
		})

		e.preventDefault();
		let newUser = {
			firstName: firstName,
			lastName: lastName,
			address:address,
			email:email,
			roleId:roleId,
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
	const data = props.data;
	const userData = props.getUsersQuery.getUsers ? props.getUsersQuery.getUsers: [];
	console.log(props);


	const roleOptions=()=> {
		console.log(props);
		let roleData = props.getRolesQuery;
		console.log(roleData);
		if(roleData.loading){
			return<option>Loading Roles..</option>

		}else {
			return roleData.getRoles.map(role =>{
				console.log(role);
				return(
					<option key={role.id} value={role.id}>{role.name}</option>
					)
			});
		}
	}


	return (
	<Container id="contain">
			<Columns size>
				
  			

				<Columns.Column id="contcol" size={12}>


					<Card>
						<Breadcrumb>
							  <Breadcrumb.Item active href="#">Users</Breadcrumb.Item>
							  <Breadcrumb.Item href="./singer">
							    Singers
							  </Breadcrumb.Item>
							
							  <Button  variant="primary" 
									 onClick={handleShow}
       							 id="create" variant="primary" size="lg" block>
					   			 Create Users
					 		 </Button>
						</Breadcrumb>

						<Card.Content>
							<div className="table is-fullwidth is-bordered">
								<Table striped bordered hover className="table is-fullwidth is-bordered">
								{/*loadingMessage*/}
									<thead>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Address</th>
										<th>Email</th>
										<th>Username</th>
										<th>Role</th>
	
										<th>Action</th>
										<td></td>
									
										
									</thead>
									<tbody>
									{userData.map(user =>{
								let role = user.role;

										return(
										<tr>
											<td>{user.firstName}</td>
											<td>{user.lastName}</td>
											<td>{user.address}</td>
											<td>{user.email}</td>
											<td>{user.username}</td>
											<td>{role? role.name: "unassigned"}</td>
											
											<td>
										
											
											<Link to={"/user/update/" +user.id}>
												<Button color="dark" fullwidth>
													Update
												</Button>
											</Link>
											</td>
											<td>
													<Button
													id={user.id}
													onClick={deleteUserHandler}
													color="primary"
													fullwidth
												>
													Delete
												</Button>
											</td>
											
										</tr>
										);
								 	})}
									</tbody>
								</Table>
							</div>
						</Card.Content>
					</Card>
				</Columns.Column>

				<Columns.Column size={2}>
					
			

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
  				 <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<Card>
						

						<Card.Content>
							<form onSubmit={addUser}>
								<div className="field">
									<label className="label" htmlFor="fName">
										First Name
									</label>
									<input
										id="fName"
										className="input"
										type="text"
										onChange={firstNameChangeHandler}
										value={firstName}
										
									/>
								</div>

								<div className="field">
									<label className="label" htmlFor="lName">
										Last Name
									</label>
									<input
										id="lName"
										className="input"
										type="text"
										onChange={lastNameChangeHandler}
										value={lastName}
										
										
										
									/>
								</div>

								<div className="field">
									<label className="label" htmlFor="address">
										Address
									</label>
									<input
										id="address"
										className="input"
										type="text"
										onChange={addressChangeHandler}
										value={address}
									/>
								</div>

									<div className="field">
									<label className="label" htmlFor="address">
										Email Address
									</label>
									<input
										id="email"
										className="input"
										type="text"
										onChange={emailChangeHandler}
										value={email}
									/>
								</div>
							
								<div className="field">
									<label className="label" htmlFor="role">
										Role
									</label>
									<div className="control">
										<div className="select is-fullwidth">
											<select
												onChange={roleIdChangeHandler}
											>
												<option disabled selected>
													Select Role
												</option>
												{roleOptions()}
											</select>
										</div>
									</div>
								</div>

								<div className="field">
									<label className="label" htmlFor="username">
									Username
									</label>
									<input
										id="username"
										className="input"
										type="text"
										onChange={usernameChangeHandler}
										value={username}
										/>
								</div>	


								<label className="label" htmlFor="password">
									password
									</label>
								<input
								id="password"
								className="input"
								type="password"
								onChange={passwordChangeHandler}
								value={password}
										
									/>
								<Button
									type="submit"
									color="dark"
									fullwidth={true}
								>
									Add new user
								</Button>
							</form>
						</Card.Content>
					</Card>
	



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
				</Columns.Column>
			</Columns>
		</Container>
	);
};

export default compose(
	graphql(createUserMutation, { name: "createUserMutation"}),
	graphql(deleteUserMutation, { name: "deleteUserMutation"}),
	graphql(getUsersQuery,{ name: "getUsersQuery"}),
	graphql(getRolesQuery,{ name: "getRolesQuery"})
	)(User);

