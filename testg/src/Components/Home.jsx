import Nav from "./Nav.jsx";
import About from "./Home-Components/About.jsx";
import Footer from "./Footer.jsx";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import '../style/home.css';

const Home = () => {


    return (
        <div>
            <Nav />
            <div className="container-fluid">
                <div className="row vh-100">
                    {/* Left Column */}
                    <div className="col-md-6 left-col" style={{maxHeight:"100vh"}}>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                        {/* Logo and DSUMUNSOC - Moved Up */}
                            <div>
                                <img
                                    src="/img/MUNSOCLOGO2-white.png"
                                    alt="DSUMUN II"
                                    className="img-fluid mb-2 home-logo"
                                />
                            </div>
                            <br/>
                            <br/>
                        {/* DSUMUN II - Moved Down */}
                            <div className="dsumun2-home-img" style={{marginBottom:"40px"}}>
                                <img src="/img/DSUMUN_II_Logo.png" style={{width:"80%"}}/>
                            </div>

                        {/* Animated Register Button Container */}
                            <div style={{ position: 'relative'}}>
                                <svg
                                    className="button-sketch"
                                    viewBox="0 0 300 100"
                                    style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '140%',
                                    height: '200%',
                                    pointerEvents: 'none'
                                    }}
                                >
                                </svg>
                                <Link to="/cope2" className="btn btn-register" id="home-btn">
                                    Register Now
                                </Link>
                                

                        
                            </div>
                            {/*
                            <div className="reminder-dsumun2">
                                <h1 style={{ fontFamily: "museo", color: "white", marginTop:"20px", fontSize:"25px" }}>Early bird closes on March 10</h1>
                            </div>
                            */}
                        </div>
                    </div>
                

                    {/* Right Column */}
                    <div className="col-lg-6 p-0 carousel-container">
                        <Carousel fade interval={3000}>
                            {[1, 2,3,4,5,6].map((item) => (
                                <Carousel.Item key={item}>
                                    <img
                                        className="d-block w-100" // Makes the image take full width
                                        src={`/img/DsuMun${item}.jpg`}
                                        alt={`Slide ${item}`}
                                        style={{
                                            objectFit: "cover", // Ensures the images cover the container without distortion
                                            height: "100vh" // Adjust the height as needed for uniformity
                                        }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>

                <div className="container-md mx-auto text-center">
					<img src="./img/separator2.png" style={{width: "50px", height:"50px"}}/>
				</div>

                <div className="row" style={{paddingTop: "50px", paddingBottom: "50px"}}>
                    <About/>
                </div>

                <div className="container-md mx-auto text-center">
					<img src="./img/separator2.png" style={{width: "50px", height:"50px"}}/>
				</div>

            </div>
            <Footer/>
        </div>
    );
};

export default Home;