import React,{ useState,useEffect } from "react";
import { Container, Columns, Card, Button } from "react-bulma-components";
import { Link } from "react-router-dom";
import {flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { createSingerMutation, deleteSingerMutation } from "../queries/mutations";
import { getSingersQuery ,getDatesQuery} from "../queries/queries";
import Swal from "sweetalert2";

import {Table, Breadcrumb, Modal} from 'react-bootstrap';

import {toBase64, nodeServer} from "../Function.js";

const Singer = props => {

	const [show, setShow] = useState(false);
  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);


	console.log(props);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [dateId, setDateId] = useState("");
	const fileRef = React.createRef();
	const [imagePath, setImagePath] = useState("");

	const nameChangeHandler = e => {
		setName(e.target.value);
	};

	const descriptionChangeHandler = e => {
	setDescription(e.target.value);

	};



	const deleteSingerHandler = e => {
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

			props.deleteSingerMutation({
			variables: {id : id},
			refetchQueries: [{
				query: getSingersQuery
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
	useEffect(()=> {
		console.log(name);
		console.log(description);
		console.log(imagePath);

	});

	const data = props.data;
	const singerData = props.getSingersQuery.getSingers ? props.getSingersQuery.getSingers: [];
	


	const dateOptions=()=> {
		console.log(props);
		let dateData = props.getDatesQuery;
		if(dateData.loading){
			return<option>Loading Dates..</option>

		}else {
			return dateData.getDates.map(date =>{
				console.log(date);
				return(
					<option key={date.id} value={date.id}>{date.name}</option>
					)
			});
		}
	}



	const addSinger = e => {

		Swal.fire({
		  position: 'top-end',
		  icon: 'success',
		  title: 'Singer Added',
		  showConfirmButton: false,
		  timer: 2500
		})

		e.preventDefault();
		let newSinger = {
			name: name,
			description: description,
			imageLocation: imagePath
		};
		console.log(newSinger);

		props.createSingerMutation({


			variables : newSinger,
			refetchQueries: [{
				query: getSingersQuery
			}]

		});
		setName("");
		setDescription("");
		setDateId("");
	};


	const imagePathhandler = e => {
		// console.log(fileRef.current.files[0]);
		toBase64(fileRef.current.files[0]).then(encodedFile => {
			// console.log(encodedFile);
			setImagePath(encodedFile);
		})
	}

	//add a new key value pair field for newSinger. Create a key
	//imageLocation and assign the value of the imagePath state as 
	//its
	return (
	<Container id="contain">
			<Columns size>
			
				<Columns.Column size={12}>
					<Card>
							<Breadcrumb>
							  <Breadcrumb.Item  href="./user">Users</Breadcrumb.Item>
							  <Breadcrumb.Item active href="./singer">
							    Singers
							  </Breadcrumb.Item>
							 
							   <Button  variant="primary" 
									 onClick={handleShow}
       							 id="creates" variant="primary" size="lg" block>
					   			 Create Singers
					 		 </Button>
							  
						</Breadcrumb>

						<Card.Content>
							<div className="table is-fullwidth is-bordered">
								<Table striped bordered hover className="table is-fullwidth is-bordered">
								{/*loadingMessage*/}
									<thead>
										<th>Image</th>
										<th>Name</th>
										<th>Description</th>
										<th>Action</th>
										<th></th>

									</thead>
									<tbody>
									{singerData.map(singer =>{
										console.log(nodeServer()+singer.imageLocation);
									
										return(
										<tr>
											<td>
												<img id="imgloc" src={nodeServer() +singer.imageLocation}/>
											</td>
											<td>{singer.name}</td>
											<td>{singer.description}</td>
									
											<td>
											<Link to={"/singer/update/" +singer.id}>
												<Button color="dark" fullwidth>
													Update
												</Button>
											</Link>
											</td>
											<td>
												<Button
													id={singer.id}
													onClick={deleteSingerHandler}
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

					<Columns.Column>
					 <Modal show={show} onHide={handleClose}>
					        <Modal.Header closeButton>
					          <Modal.Title>Create Singer</Modal.Title>
					        </Modal.Header>
					        <Modal.Body>
					        	
					        	 <Card>
					

						<Card.Content>
							<form onSubmit={addSinger}>
								<div className="field">
									<label className="label" htmlFor="name">
										Name
									</label>
									<input
										id="name"
										className="input"
										type="text"
										onChange={nameChangeHandler}
										value={name}
										
									/>
								</div>

								<div className="field">
									<label className="label" htmlFor="description">
										Description
									</label>
									<input
										id="description"
										className="input"
										type="text"
										onChange={descriptionChangeHandler}
										value={description}
										
										
									/>
								</div>

								<div className="field">

									<label className="label" htmlFor="image">Add Image
									</label>
									<div className="control">
										<input id="image" type="file" accept="image/png" className="input" ref={fileRef } onChange={imagePathhandler}/>
									</div>

								</div>

							

								<Button
									type="submit"
									color="dark"
									fullwidth={true}
								>
									Add new Singer
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
	graphql(createSingerMutation, { name: "createSingerMutation"}),
	graphql(deleteSingerMutation, { name: "deleteSingerMutation"}),
	graphql(getSingersQuery,{ name: "getSingersQuery"}),
	graphql(getDatesQuery,{ name: "getDatesQuery"})
	)(Singer);


