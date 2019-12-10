import React,{useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";


const ControlledCarousel = props => {

	

	return (
		<div >
				<Carousel id="car">
				  <Carousel.Item>
				    <img
				    	
				      className="sing"
				      src="./images/singers.jpg"
				      alt="First slide"
				    />
				   
				  </Carousel.Item>
				  <Carousel.Item>
				    <img
				      className="sing"
				      src="./images/coln.jpg"
				      alt="First slide"
				    />
				    <Carousel.Caption>
				      <h3>Lincoln</h3>
				      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				    </Carousel.Caption>
				  </Carousel.Item>
				  <Carousel.Item>
				    <img
				      className="sing"
				      src="./images/leas.jpg"
				      alt="Third slide"
				    />

				    <Carousel.Caption>
				      <h3>Lea Salonga</h3>
				      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				    </Carousel.Caption>
				  </Carousel.Item>
				  <Carousel.Item>
				    <img
				      className="sing"
				      src="./images/loonie.jpg"
				      alt="Third slide"
				    />

				    <Carousel.Caption>
				      <h3>Marlon Peroramas</h3>
				      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
				    </Carousel.Caption>
				  </Carousel.Item>
				</Carousel>

</div>
	);
};
// export the hooks component
export default ControlledCarousel; //para maaccess siya sa ibang file
