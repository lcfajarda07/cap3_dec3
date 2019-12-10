const mongoose = require("mongoose")
const Schema = mongoose.Schema  //use mongoose's Schema as our basis

//Actual Schema
const singerSchema = new Schema({
	name:{
		type: String
		
	},
	description :{
		type: String
		
	},
	imageLocation :{
		type: String
		
	}
	
	 },{
		timestamps: true
})

//export the model as a module
module.exports = mongoose.model("Singer", singerSchema);
//this creates a model called "task" using the schema "singerSchema" and exports it to be used by index.js

