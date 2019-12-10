import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Section, Heading, Card, Columns, Container } from "react-bulma-components";

import {flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import Swal from "sweetalert2";


import {updateSingerMutation } from "../queries/mutations";
import { getSingerQuery } from "../queries/queries";

const UpdateSinger = props => {
console.log(props);
		
		let id = props.match.params.id;
	const singer = props.getSingerQuery.getSinger ? props.getSingerQuery.getSinger : {};
	console.log(singer);


		useEffect(()=>{
			console.log("name:  " + name);
			console.log("description:  " + description);
		})

		const [name,setName] = useState("");
		const [description,setDescription] = useState("");


		if (!props.getSingerQuery.loading) {
		const setDefaultValues = () => {

			setName(singer.name);
			setDescription(singer.description);

			
		};

		if (name === "" ) {
			setDefaultValues();
			console.log("name value after setDefault: " + name);
		}

		
	}


const nameChangehandler = e => {
	// console.log(e.target.value);
setName(e.target.value);
}
const descriptionChangeHandler = e => {
	setDescription(e.target.value);
}

	const formSubmitHandler = e => {
		

		e.preventDefault();
		let updatedSinger = {
			id:id,
			name:name,	
			description:description

		};
		console.log(updatedSinger);

		props.updateSingerMutation({

			variables : updatedSinger
		

		});

		Swal.fire({
			title: "singerUpdated",
			text: "singer has been updated",
			type: "success",
			html: 
			'<a href="/singer" class="button is-success">Go back to Singer </a>',
			showCancelButton: false,			  
			showConfirmButton: false,			  
		});



		
	};


		return(
	<Container><Columns>
			<Columns.Column size="half" offset="one-quarter">
			<Heading>Update Singer</Heading>
			<Card>
				<Card.Header.Title>
					Singer Details
				</Card.Header.Title>
				<Card.Content>
					<form onSubmit={formSubmitHandler}>
					<div>
						<label className="label" htmlFor="name">
						Singer
						</label>
						<input type="text"
						
						onChange={nameChangehandler}
						value={name}
						className="input" />
					</div>
						<div>
						<label className="label" htmlFor="name">
						Description
						</label>
						<input type="text"
						onChange={descriptionChangeHandler}
						value={description}
						
						className="input" />
					</div>
						
						<button type="submit" className="button is-success is-fullwidth	">
						Update Singer
						</button>


						<Link to ="/singer">
						<button type="button"
						className="button is-danger is-fullwidth">Cancel</button>
						</Link>

					</form>
				</Card.Content>
			</Card>
			 </Columns.Column>
		</Columns></Container>


	);
};
export default compose (
graphql(updateSingerMutation, {name: "updateSingerMutation"}),
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
	})
)(UpdateSinger)