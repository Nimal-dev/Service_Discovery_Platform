import React from 'react';
import { Carousel } from 'react-bootstrap';

function HeroSection() {
  return (
    <>
      {/* <!-- Start Hero Section --> */}
      
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
					style={{height:"500px"}}
                    src="img/carousel1.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Welcome to our Service Discovery Platform.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{height:"500px"}}
                    src="img/carousel2.jpg"
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>We Provide a variety of Digital Marketing Services.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{height:"500px"}}
                    src="img/carousel3.jpg"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>A space for young Entrepreneurs to Glow up!</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
	
          
        
      {/* <!-- End Hero Section --> */}
    </>
  );
}

export default HeroSection;
