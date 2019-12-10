import React, { useState } from "react";
import { Navbar } from "react-bulma-components";
import { Link } from "react-router-dom";

const NavBar = props => {
	console.log(props)
	const [open, setOpen] = useState(false);
	// const [open, setOpen] = useState(false);
	// let customLink = "";

	// if (!props.username) {
	// 	customLink = customLink = <Link className="navbar-item">Hi Guest</Link>;
	// } else {
	// 	customLink = (
	// 		<Link className="navbar-item"> Hi, </Link>
	// 	);
	// }
	return (
		<Navbar id="nav" color="black" >
			<Navbar.Brand>
				<Link to="/" className="navbar-item">
					<strong id="lcf">LCF Book Event Singers Online</strong>
				</Link>

					<Navbar.Burger
					className="has-text-primary"
					active={open}
					onClick={() => {
						setOpen(!open);
					}}
				/>
			</Navbar.Brand>

			<Navbar.Menu>
				<Navbar.Container position="end">
				
					<Link className="navbar-item" to="/user">
						Users
					</Link>
					<Link className="navbar-item" to="/singer">
						Singers
					</Link>
				
					<Link className="navbar-item" to="/login">
						Login
					</Link>

					<Link className="navbar-item" to="/logout">
						Logout
					</Link>

					<Link className="navbar-item">Hi, {props.username}</Link>
					<Link className="navbar-item">Hi, {props.id}</Link>
					
				
				</Navbar.Container>
			</Navbar.Menu>
		</Navbar>
	);
};
export default NavBar;
