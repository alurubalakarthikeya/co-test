import Nav from "../Nav.jsx";
import Footer from "../Footer.jsx";
import "../../style/others.css"

const Others = () => {
    return(
        <div className="container-fluid p-0">
            <Nav/>
            <div className="container-fluid">
                <div className="row text-center">
                    <h1 className='display-5 others-title' style={{fontFamily:'museo',fontWeight:"bold"}}>Others</h1>
                </div>
                <div className="container-fluid my-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            <h2 className="text-center" style={{ fontFamily: "Museo", fontWeight: "bold"}}>
                                Our inaugural event and seminar on 'Dive Into Diplomacy' at Dayananda Sagar University
                            </h2>
                        
                            {/* Carousel as Image Container */}
                            <div id="carouselExampleIndicators" className="carousel slide my-4" style={{ maxHeight: "600px", overflow: "hidden" }}>
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img className="d-block w-100" src="/img/carouselinaugral1.jpeg" alt="First slide" style={{ objectFit: "contain", height: "600px" }} />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src="/img/carouselinaugral2.jpeg" alt="Second slide" style={{ objectFit: "contain", height: "600px" }} />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src="/img/carouselinaugral3.jpeg" alt="Third slide" style={{ objectFit: "contain", height: "600px" }} />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                            {/* Card below Carousel */}
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <p className="card-text text-justify" style={{fontSize:"20px"}}>
                                        MUNSOC is proud to announce its inaugural event, a seminar on diplomacy. Our chief guest, Mr. Pavan, M.A. (Political Science), LL.B., LLM. (Ph.D.), spoke to the students about the various practices under law, and their applications in our day-to-day lives. The talk later revolved around international law and the UN; its various organs and agencies, and ultimately came full circle with the ins and outs of a model United Nations conference.
                                    </p>
                                </div>
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
            <Footer/>
        </div>
    );
};

export default Others;
