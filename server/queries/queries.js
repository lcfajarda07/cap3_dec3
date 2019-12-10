const {ApolloServer, gql} = require("apollo-server-express");
const { GraphQLDateTime } = require("graphql-iso-date");
const bcrypt = require("bcrypt");
const uuid = require("uuid/v1");
const fs = require("fs");

// const bcrypt = require("bcrypt");
//mongoose models
 
const Singer = require("../models/Singer");	 
const User = require("../models/User");
const Role = require("../models/Role");
const Status = require("../models/Status");
const Transaction = require("../models/Transaction");

//CRUD
// type Query == Retrieve/ Read
// type Mutation == Create/ Update/Delete
//resolver for date schema to be able to handle date data types
const CustomScalarResolver = {
	Date : GraphQLDateTime
};


const typeDefs = gql`
	#this is a comment
	#the type Query is the root of all GraphQL queries
	#this is used for executing "GET" requests

	scalar Date


	type SingerType{
		id: ID
		name: String
		description: String
		imageLocation : String
		createdAt : Date
		updatedAt : Date
		

	}

	type UserType{
		id: ID!
		firstName: String
		lastName: String
		address: String
		email: String
		roleId: String
		username: String
	    password : String
		createdAt : Date
		updatedAt : Date
		role: RoleType
		
	}

	type RoleType{
		id : ID
		name: String
	}

	type StatusType{
		id : ID
		status: String
	}
	
	type TransactionType{
		id : ID
		userId: String
		singerId : String
		date: String
		isCompleted: Boolean
		createdAt : Date
		updatedAt : Date
		singer:SingerType
		user: UserType
		status: StatusType
	}
	

	type Query {
		#create a query called hello that will expect a 
		#string data type 
		hello : String
	
		getSingers : [SingerType]
		getUsers: [UserType]
		getRoles: [RoleType]
		getStatuses: [StatusType]
		getTransactions: [TransactionType]

		getSinger(id: ID) : SingerType
		getUser(id: ID) : UserType
		getRole(id: ID) : RoleType
		getStatus(id: ID) : StatusType
		getTransaction(id: ID) : TransactionType
	}

	#CUD functionality
	#we are mutating the server/database
	type Mutation {


		createStatus(status: String

		) : StatusType


		createRole(name: String
		) : RoleType

		createSinger(
		name: String
		 description: String
		 imageLocation : String
	
		 ) : SingerType

		 createUser(
		 firstName: String
		 lastName: String
		 roleId: String
		 address: String
		 email: String
		 username: String
		 password: String
		 ) :UserType


		 createTransaction(
		 userId : String
		 singerId : String
		 date : String
		 isCompleted : Boolean
		 ) :TransactionType

	


		  updateSinger(
		 	id: ID
		 	name: String
			description: String
			imageLocation : String
			dateId: String
		 ) : SingerType

		 updateUser(
		 	id:ID
		 	firstName: String
		 	lastName: String
		 	roleId: String
		 	address: String
		 	email: String
		 	username: String
		 	password: String
		 ) : UserType

		  updateRole(
		 	id : ID
		 	name: String
		 ) : RoleType

		   updateStatus(
		 	id : ID
		 	status: String
		 ) : StatusType

		  updateTransaction(
		  	id : ID
		  	userId : String
		  	singerId : String
		  	date : String
		  	isCompleted : Boolean

		  ) : TransactionType

	

		 deleteStatus(id: String): Boolean

		 deleteSinger(id: String): Boolean

		 deleteUser(id: String): Boolean

		 deleteRole(id: String): Boolean

		 deleteTransaction(id: String): Boolean

		 logInUser(
			username : String,
			password: String
		): UserType
	}
`;	 

const resolvers = {
	//what are we going to do when the query is executed
	Query : {
		hello : () => "my first query",
  		
  	
  		getSingers : () => {
  			return Singer.find({})
  		},
  		getUsers: () => {
  			return User.find({})
  		},

  		getRoles: () => {
  			return Role.find({})
  		},

  		getStatuses: () => {
  			return Status.find({})
  		},
  		getTransactions: () => {
  			return Transaction.find({})
  		},

  		getUser: (_,args) => {
  			console.log("nagexecute ka ng getMember query")
  			console.log(args)
  			return User.findById(args.id)

  		},
  		
  		getSinger: (parent,args) => {
  			return Singer.findById(args.id)
  			// return Task.findOne({_id : args.id })
  		},

  		getRole: (parent,args) => {
  			return Role.findById(args.id)
  			// return Task.findOne({_id : args.id })
  		},
  		getStatus: (parent,args) => {
  			return Status.findById(args.id)
  			// return Task.findOne({_id : args.id })
  		},
  		getTransaction: (parent,args) => {
  			return Transaction.findById(args.id)
  		}


	},

	Mutation : {
		

		createSinger : (_,args) => {
			console.log(args)
			let imageString = args.imageLocation;
					//in order to decode the encoded date, we need to remove the text before
					//the encoded string. we need to remove data:image/png; base64, 
					let imageBase = imageString.split(";base64,").pop();
					// console.log("encoded file:" +imageBase);

						//declare the location of the images in the server
						//and assign a unique name for our file using uuid


			let imageLocation = "images/" + uuid() + ".png";
			console.log(imageLocation);
				//syntax fs.writeFile(filename/descriptor)	
				fs.writeFile(imageLocation,imageBase, {encoding : "base64"}, err => {

				});

			let newSinger = Singer({
				name : args.name,
				description : args.description,
				dateId: args.dateId,
				imageLocation: imageLocation
			

			})
			console.log(newSinger)
			return newSinger.save()
		},

		createUser : (_,args) => {
			console.log(args)
			let newUser = User({
				firstName : args.firstName,
				lastName : args.lastName,
				address : args.address,
				email : args.email,
				roleId: args.roleId,
				username: args.username,
				// bycript.hashSync( plain password, # of salt rounds )
				// password: args.password
				password: bcrypt.hashSync(args.password, 10)
				 // bcrypt.hashSync(args.password, 10)
			})
			console.log(newUser)
			return newUser.save()
		},

		createRole : (_,args) => {
			console.log(args)
			let newRole = Role({
				name : args.name
				
			})
			console.log(newRole)
			return newRole.save()
		},


		createStatus : (_,args) => {
			console.log(args)
			let newStatus = Status({
				status : args.status
				
			})
			console.log(newStatus)
			return newStatus.save()
		},

		createTransaction : (_,args) => {
			let newTransaction = Transaction({
				userId : args.userId,
				singerId : args. singerId,
				date: args.date,
				isCompleted: args.isCompleted
			})
			return newTransaction.save()
		},
	

		updateSinger: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = {
				name : args.name ,
				description : args.description}


				return Singer.findOneAndUpdate(condition,updates)
			},
			// findOneAndUpdate(condition, updates)
				


			updateUser: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = { 
				firstName : args.firstName,
				lastName: args.lastName,
				address: args.address,
				email: args.email,
				role: args.roleId,
				username: args.username,
				password: args.password

			}


				return User.findOneAndUpdate(condition,updates)
			

		},


		updateRole: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = {
			 name : args.name
			
			}
			// findOneAndUpdate(condition, updates)

			return Role.findOneAndUpdate(condition,updates)
	
		},

			updateStatus: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = {
			 status : args.status
			
			}
			// findOneAndUpdate(condition, updates)

			return Status.findOneAndUpdate(condition,updates)
	
		},



		
		deleteUser : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return User.findByIdAndDelete(condition)
			.then ((user, err)=>{
				console.log(err);
				console.log(user);
				if (err || !user){
					console.log("delete failed. no user found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},

		deleteSinger : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return Singer.findByIdAndDelete(condition)
			.then ((singer, err)=>{
				console.log(err);
				console.log(singer);
				if (err || !singer){
					console.log("delete failed. no user found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},

	


		deleteRole : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return Role.findByIdAndDelete(condition)
			.then ((role, err)=>{
				console.log(err);
				console.log(role);
				if (err || !role){
					console.log("delete failed. no roles found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},




		logInUser: (_, args) => {
			console.log("trying to log in...");
			console.log(args);

			// returns the member in our members collection
			// with the same value as args.firstName
			return User.findOne({ username: args.username }).then(user => {
				console.log(user);

				if (user === null) {
					console.log("user not found");
					return null;
				}

				console.log(user.password);
				console.log(args.password);

				// compare the hashed version version of args.password
				// with member.password(already hashed)
				// syntax : bcrypt.compareSync(plain_pass, hashed_pass)

				// create a variable called hashedPassword and assign
				// the value of the result of bcrypt.compareSync
				let hashedPassword = bcrypt.compareSync(
					args.password,
					user.password
				);

				// console.log(hashedPassword);

				// if hashedPasword is false, output in the console wrong password
				if (!hashedPassword) {
					console.log("wrong password");
					return null;
				}
				// else output in the console login successful and  return member
				else {
					// successful login
					console.log(user);
					return user;
				}
			});
		}
	},

	// custom type resolver
	//custom Team type resolver
	// TeamType : {
	// 	// declare a resolver for the tasks field inside TeamType
	// 	tasks : (parent, args) => {
	// 		// console.log("getting the task assigned for this team")
	// 		console.log(parent.id)
	// 			return Task.find({ teamId : parent.id })
	// 	}
	// 	// items : (parent, args) => {
	// 	// 	// console.log("getting the task assigned for this team")
	// 	// 	console.log(parent.id)
	// 	// 		return Items.find({ teamId : parent.id })
	// 	// }

	// },

	// DateType : {
	// 	// declare a resolver for the tasks field inside TeamType
	// 	singer : (parent, args) => {
	// 		// console.log("getting the team assigned for this team")
	// 		// console.log(parent.id)
			
	// 			return Date.findOne({ _id : parent.Id })

	// 	}
	// },



	// SingerType : {
	// 	// declare a resolver for the tasks field inside TeamType
	// 	date : (parent, args) => {
	// 		console.log("getting the date assigned for this singer")
	// 		console.log(parent.id)
			
	// 			return Date.findOne({ _id : parent.dateId })

	// 	}
	// },

		UserType : {
		// declare a resolver for the tasks field inside TeamType
		role : (parent, args) => {
			console.log("getting the singer assigned for this user")
			console.log(parent.id)
			
				return Role.findOne({ _id : parent.roleId })

		}
	},

		TransactionType : {
		// declare a resolver for the tasks field inside TeamType
		user : (parent, args) => {
			console.log("getting the singer assigned for this user")
			console.log(parent.id)
			
				return User.findOne({ _id : parent.userId })

		},

		singer : (parent, args) => {
			console.log("getting the singer assigned for this user")
			console.log(parent.id)
			
				return Singer.findOne({ _id : parent.singerId })

		},

		status : (parent, args) => {
			console.log("getting the singer assigned for this user")
			console.log(parent.id)
			
				return Status.findOne({ _id : parent.statusId })

		},



	}



}




//create an instance of the apollo server
//In the most basic sense, the ApolloServer can be started
//by passing schema type defiitions(typeDefs) and the
//resolvers responsible for fetching the data for the declared
//requests/queries

const server = new ApolloServer({
	typeDefs,
	resolvers
})

module.exports = server;