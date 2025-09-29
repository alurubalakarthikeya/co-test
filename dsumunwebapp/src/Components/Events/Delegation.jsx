import Nav from "../Nav.jsx";
import Footer from "../Footer.jsx";
import "../../style/delegation.css";

const Delegation = () => {
    return (
        <div className="container-fluid p-0">
            <Nav />
            <div className="container-fluid delegation-header text-center">
                <h1 className="display-5" style={{ fontFamily: 'museo', marginTop: "7%", fontWeight:"bold" }}>Our Delegation</h1>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h2 className="text-center" style={{fontFamily:"museo", fontWeight:"bold"}}>MUNSOC Delegation at BITSMUN'24, at BITS Pilani Goa Campus</h2>
                        
                        {/* Carousel as Image Container */}
                        <div id="carouselExampleIndicators2" className="carousel slide my-4" style={{ maxHeight: "600px", overflow: "hidden" }}>
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner" style={{ maxHeight: "600px" }}>
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="/img/carouselbits1.jpeg" alt="First slide" style={{ objectFit:"contain", height: "600px" }} />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="/img/carouselbits2.jpg" alt="Second slide" style={{ objectFit: "contain", height: "600px" }} />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        {/* Card below Carousel */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <p className="card-text text-justify" style={{fontSize:"20px"}}>
                                MUNSOC takes great pride in highlighting its esteemed participation at BITSMUN’24, hosted by the Birla Institute of Technology & Science, Goa, from February 16th to 18th, 2024. This marked a significant milestone for our society as we delved into the world of diplomacy, faced intense competition, and forged enduring memories.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" />
            </div>
            <br/>
            <br/>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h2 className="text-center" style={{fontFamily:"museo", fontWeight:"bold"}}>MUNSOC Delegation at Unicon'24, at PES University Electronic City Campus</h2>
                        {/* Carousel as Image Container */}
                        <div id="carouselExampleIndicators1" className="carousel slide my-4" style={{ maxHeight: "600px", overflow: "hidden" }}>
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner" style={{ maxHeight: "600px" }}>
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="/img/carouselpes1.jpeg" alt="First slide" style={{ objectFit:"contain", height: "600px" }} />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="/img/carouselpes2.jpeg" alt="Second slide" style={{ objectFit: "contain", height: "600px" }} />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        {/* Card below Carousel */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <p className="card-text text-justify" style={{fontSize:"20px"}}>
                                    MUNSOC takes great pride in announcing the triumphant participation of its delegation at Unicon’24, hosted by PESU Electronic City Campus on March 8th and 9th, 2024. Boasting an expansive representation across five committees, our delegation emerged as one of the largest on campus, leaving an indelible mark in every session of this prestigious event.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" />
            </div>
            <br/>
            <br/>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h2 className="text-center" style={{fontFamily:"museo", fontWeight:"bold"}}>MUNSOC Delegation at  Pecon '24, organized by PES MUN Society and PES University</h2>
                        
                        {/* Carousel as Image Container */}
                        <div id="carouselExampleIndicators3" className="carousel slide my-4" style={{ maxHeight: "600px", overflow: "hidden" }}>
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner" style={{ maxHeight: "600px" }}>
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="/img/Peacon5.jpg" alt="First slide" style={{ objectFit:"contain", height: "600px" }} />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="/img/Peacon1.jpg" alt="Second slide" style={{ objectFit: "contain", height: "600px" }} />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        {/* Card below Carousel */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <p className="card-text text-justify" style={{fontSize:"20px"}}>
                                    Our delegation was honored to attend Pecon '24, organized by PES MUN Society and PES University. Representing the largest delegation in our society's history, we had a strong presence across all committees, with eighteen delegates participating.

                                    The delegation comprised of Aditya Bidappa M.V., Akash Nair A. Nair, Arjit kulkarni, Anaga Balakrishna, Anudeep B J B.J., Ateendra Girish, Bibi K. Kubra, B.N. Jayesh, Clifford T., K. Sai Suchith, Lakshmi V., Shashwat Saini, Srijita Choudhury, Suraj S., Thanushree B.R., Venkat Nivas Reddy K., Vijayalakshmi Iyer, and Yash Choudhary.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" />
            </div>
            <br/>
            <br/>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h2 className="text-center" style={{fontFamily:"museo", fontWeight:"bold"}}>MUNSOC Delegation at DSIMUN 3.0, Dayananda Sagar College of Engineering</h2>
                        
                        {/* Carousel as Image Container */}
                        <div id="carouselExampleIndicators4" className="carousel slide my-4" style={{ maxHeight: "600px", overflow: "hidden" }}>
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner" style={{ maxHeight: "600px" }}>
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="/img/DSIMUN1.jpg" alt="First slide" style={{ objectFit:"contain", height: "600px" }} />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="/img/DSIMUN2.jpg" alt="Second slide" style={{ objectFit: "contain", height: "600px" }} />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        {/* Card below Carousel */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <p className="card-text text-justify" style={{fontSize:"20px"}}>
                                Our delegation had the privilege of attending DSIMUN 3.0, Dayananda Sagar College of Engineering, BANGALORE. With active participation across all three committees, our delegates engaged in insightful discussions on critical global issues.

                                The delegation included Aditya Bidappa, Lakshmi V., Lakshmi Shree C., Venkat Nivas Reddy, Vinuraj Vamshi, and Vijayalakshmi Iyer. 

                                Special commendation is extended to Head Delegate Vijayalakshmi Iyer, for her exceptional contributions in the Disarmament and International Security Committee that earned her a Verbal Mention.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" />
            </div>
            <br/>
            <br/>
            <Footer />
        </div>
    );
};

export default Delegation;
