const express =require('express');
const mongoose = require('mongoose');

const app = express();

//analize the incoming objects
const bodyParser = require("body-parser");

mongoose.connect(
	"mongodb+srv://lcfajarda:FLxFKGWK9l0RyCvx@myfirstmongodb-5hvah.mongodb.net/capstone_3?retryWrites=true&w=majority", 
	{
	useCreateIndex: true,
	useNewUrlParser:true

	}
);

mongoose.connection.once("open", ()=>{
	console.log("Now connected to the Mongodb server")
})

app.use(bodyParser.json({ limit: "15mb"}));

//allow users to access a folder in the server by serving the static date
//syntax app.use("/path", exprees.static("folder to serve"))
app.use("/images",express.static("images"));


const server = require("./queries/queries")

server.applyMiddleware({ app })

//server initialization


app.listen(5000, ()=> {
	console.log(`🚀  Server ready at http://localhost:5000${server.graphqlPath}`);
})

