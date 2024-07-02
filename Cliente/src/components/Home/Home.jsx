import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';
import '../../styles/Home.css';

const Home = () => {
    return (
        <Container className="my-4 home-container">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-img"
                        src="https://www.saam.com/wp-content/uploads/2020/12/STI_30dic2020.jpg"
                        alt="Puerto 1"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-img"
                        src="https://www.mundomaritimo.cl/noticias/get_image/35239/798"
                        alt="Puerto 2"
                    />
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default Home;
