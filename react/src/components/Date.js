import React,{useState,useEffect} from "react";
import { Container, Columns, Card, Button } from "react-bulma-components";
import { Link } from "react-router-dom";
import {flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import Swal from "sweetalert2";


import {getDatesQuery} from "../queries/queries";
import { createDateMutation, deleteDateMutation } from "../queries/mutations";


const Date = props => {
const [name, setName] = useState("");

	useEffect(()=> {
		console.log(name);
	
	});

	const nameChangeHandler = e => {
		console.log(e.target.value);
		setName(e.target.value);
	};
	const deleteDateHandler = e => {
		console.log("deleted");
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

			props.deleteDateMutation({
			variables: {id : id},
			refetchQueries: [{
				query: getDatesQuery
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
	const addDate = e => {

		Swal.fire({
		  position: 'top-end',
		  icon: 'success',
		  title: 'Date Added',
		  showConfirmButton: false,
		  timer: 2500
		})

		e.preventDefault();
		let newDate = {
			name: name
			
		};
		console.log(newDate);

		props.createDateMutation({


			variables : newDate,
			refetchQueries: [{
				query: getDatesQuery
			}]

		});
		setName("");
		
	};


	console.log(props);
	const data = props.data;
	const dateData = props.getDatesQuery.getDates ? props.getDatesQuery.getDates: [];

	return (
	<Container id="contain">
			<Columns size>
			
				<Columns.Column size={9}>
					<Card>
						<Card.Header>
							<Card.Header.Title>Dates List</Card.Header.Title>
						</Card.Header>

						<Card.Content>
							<div className="table is-fullwidth is-bordered">
								<table className="table is-fullwidth is-bordered">
								{/*loadingMessage*/}
									<thead>
										<th>Name</th>
										
										<th>Action</th>
									</thead>
									<tbody>

										{dateData.map(date =>{
										return(

										<tr>
											<td>{date.name}</td>
											
											<td>
											<Link>
												<Button color="dark" fullwidth>
													Update
												</Button>
											</Link>
													<Button
													id={date.id}
													onClick={deleteDateHandler}
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
								</table>
							</div>
						</Card.Content>
					</Card>
				</Columns.Column>

					<Columns.Column size={3}>
					<Card>
						<Card.Header>
							<Card.Header.Title>Add Available Dates</Card.Header.Title>
						</Card.Header>

						<Card.Content>
							<form onSubmit={addDate}>
								<div className="field">
									<label className="label" htmlFor="name">
										Dates
									</label>
									<input
										id="name"
										className="input"
										type="date"
										onChange={nameChangeHandler}
										value={name}
										
									/>
								</div>

							

								<Button
									type="submit"
									color="dark"
									fullwidth={true}
								>
									Add new Dates
								</Button>
							</form>
						</Card.Content>
					</Card>
				</Columns.Column>
			</Columns>
		</Container>
	);
};


export default compose(
 	graphql(createDateMutation, { name: "createDateMutation"}),
 	graphql(deleteDateMutation, { name: "deleteDateMutation"}),
	graphql(getDatesQuery,{ name: "getDatesQuery"})
	)(Date);

