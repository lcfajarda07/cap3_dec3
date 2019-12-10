const mongoose = require("mongoose")
const Schema = mongoose.Schema  //use mongoose's Schema as our basis

//Actual Schema
const statusSchema = new Schema({
	status:{
		type: String,
		
		
	}

	
	},
	{
		timestamps: true
})

//export the model as a module
module.exports = mongoose.model("Status", statusSchema);
//this creates a model called "task" using the schema "singerSchema" and exports it to be used by index.js

