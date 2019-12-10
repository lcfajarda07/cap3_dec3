import {gql} from "apollo-boost";


const createUserMutation = gql`

mutation(
	$firstName : String
	$lastName : String
	$address : String
  $email : String
  $roleId : String
  $username : String
	$password: String
	) {
  createUser (
  	firstName : $firstName 
    lastName : $lastName
  	address : $address
    email : $email
    roleId: $roleId
  	username: $username
  	password : $password
  	){
    firstName
    lastName
    address
    email
    roleId
    username
    password
  }
}
`;
export {createUserMutation};

const createDateMutation = gql`

mutation(
  $name : String

  
  ) {
  createDate (
    name : $name
    
    ){
    name
  }
}
`;
export {createDateMutation};

const createSingerMutation = gql`

mutation(
  $name : String
  $description : String
  $imageLocation : String
 

  
  ) {
  createSinger (
    name : $name
    description : $description
    imageLocation : $imageLocation
    
    ){
    name
    description
    imageLocation
   
  }
}
`;
export {createSingerMutation};

const createTransactionMutation = gql`

mutation(

  $singerId : String
  $date : String

 

  
  ) {
  createTransaction (
   
    singerId : $singerId
    date: $date   
 
    
    ){
   
   singerId
   date
   
  }
}
`;
export {createTransactionMutation};

const deleteUserMutation = gql`

mutation(
  $id : String
  ) {
  deleteUser(
    id : $id
  
    )
}
`;
export {deleteUserMutation};

const deleteDateMutation = gql`
mutation(
$id : String
){
  deleteDate(

  id : $id

  )
}
`;
export {deleteDateMutation};

const deleteSingerMutation = gql`
mutation(
$id : String
){
  deleteSinger(

  id : $id

  )
}
`;
export {deleteSingerMutation};

const updateUserMutation =gql`
mutation($id : ID
 $firstName : String
 $lastName: String
 $address: String
 $email : String
 $roleId :String
 $username: String
 $password: String
 ){
  updateUser(
  id: $id
  firstName: $firstName
  lastName: $lastName
  email : $email
  roleId : $roleId
  address: $address
  username: $username
  password: $password
  ){
    id
    firstName
    lastName
    email
    address
    roleId
    username
    password
  }
 }

`;
export {updateUserMutation};


const updateSingerMutation =gql`
mutation(
    $id: ID
    $name :String
    $description : String
){
  updateSinger(
    id : $id
    name :$name
    description: $description

  ){
      id
      name
      description
  }
}

`;
export {updateSingerMutation};

const loginUserMutation = gql`

mutation(

  $username : String
  $password: String!
  ){
  logInUser(
 
    username: $username
    password: $password
  ){
    id
    username
    password
    firstName
    lastName
    email
    address
  }
  
}
`;
export {loginUserMutation};