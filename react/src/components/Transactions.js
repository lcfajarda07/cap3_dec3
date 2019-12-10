import React from "react";
import { createTransactionMutation } from "../queries/mutations";
import { graphql } from "react-apollo";
import {flowRight as compose } from "lodash";



const Transaction = props => {
	console.log(props);
	return (
		<div>
			<p>Hello from the transaction component</p>
		
		</div>
	);
};

export default compose(
	graphql(createTransactionMutation, { name: "createUserMutation"}),
	)(Transaction);

