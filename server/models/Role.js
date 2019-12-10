const mongoose = require("mongoose")
const Schema = mongoose.Schema  //use mongoose's Schema as our basis

//Actual Schema
const roleSchema = new Schema({
	name:{
		type: String,
		default: "user"
		
	}

	
	},
	{
		timestamps: true
})

//export the model as a module
module.exports = mongoose.model("Role", roleSchema);
//this creates a model called "task" using the schema "singerSchema" and exports it to be used by index.js

