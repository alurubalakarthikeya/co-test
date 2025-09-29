import Nav from "../../Nav.jsx";
import Footer from "../../Footer.jsx";
import "../../../style/dsumun2.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import Eb from "./Eb.jsx";
import { Link as ScrollLink} from "react-scroll";
import {
    faGlobe,
    faHouseUser,
    faPerson,
    faPeopleGroup,
  } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import TermsModal from "./TermsModal.jsx";


Modal.setAppElement("#root");

const DSUMUN2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Check if the device is mobile based on screen width
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const openPdf = () => {
        if (isMobile) {
            window.open(pdfUrl, "_blank");
        } else {
            setIsOpen(true);
        }
    };

    const pdfUrl = "/DSUMUN IIBrochure.pdf";
    const images = [
        "/img/G20Logo.png",
        "/img/UNSC.png",
        "/img/DISEC.png",
        "/img/United_Nations_Human_Rights_Council_Logo.svg",
        "/img/AIPPM.svg",
        "/img/InternationalPress.svg",
    ];

    const registrationLinks = {
        "International_Individual": "https://rzp.io/rzp/sFPDeOZx",
        "International_Delegation": "https://rzp.io/rzp/6uP88Fs",
        "National_Individual": "https://rzp.io/rzp/T5hYyvpz",
        "National_Delegation": "https://rzp.io/rzp/pb7JANa",
        "DSU_Individual": "https://rzp.io/rzp/G8Qi2NwH",
    };

    const [studentType, setStudentType] = useState("");
    const [participantType, setParticipantType] = useState("");

    const getRegistrationLink = () => {
        const key = `${studentType}_${participantType}`;
        return registrationLinks[key] || "#";
    };

    const committeeNames = ["","UNSC", "DISEC", "UNHRC", "AIPPM","IPC"];
    const agendas = [
        "Mini-agendas, a new RoP, double delegate team",
        "The Situation in Cyprus",
        "Nuclear Proliferation with special emphasis on the Middle East",
        "The Myanmar Crisis",
        "Assessing policy reforms for gender justice in marriage",
        "International Press Corps"
    ];

    const links = [];

    return (
        <div className="container-fluid p-0 dsumun2">
            {/* Nav Bar */}
            <Nav />
            <div className="container-fluid p-0">
                <div className="dsumun2-Banner">
                {/* Video Background */}
                    <div className="video-background">
                        <video autoPlay muted loop playsInline>
                            <source src="/img/Earth.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                        </video>
                        <div className="video-overlay"></div>
                    </div>

                    {/* Content Row */}
                    <div className="row content dsumun2-landing">
                        {/* Left side - Large Logo */}
                        <div className="col-6 left-logo d-flex flex-column align-items-center">
                            <img src="/img/DSUMUN_II_Logo.png" alt="Logo" className="dsumun2-logo img-fluid"/>
                        </div>

                        {/* Right side - Large Image (Stacked) */}
                        <div className="col-6 right-images d-flex flex-column align-items-center">
                            <img src="/img/MUNSOCLOGO2-white.png" alt="Top Image" className="img-dsu img-fluid" />
                            <div className="divider p-5">
                                <FontAwesomeIcon icon={faX} style={{color: "#74C0FC"}} />
                            </div>
                            <img src="/img/ORG_FOUNDATION.png" alt="Bottom Image" className="img-org img-fluid" />
                        </div>
                    </div>

                    {/* Centered Register Button 
                    <div className="register-dsumun2 text-center">
                        <ScrollLink className="btn btn-register" id="dsumun2_registration_btn" to="registration">
                            Register Now
                        </ScrollLink>

                        <a href="https://drive.google.com/drive/folders/16SWPBO5t5i6Nh9eX3J9NdxYTTG6OOxG6?usp=sharing" className="btn btn-register" id="dsumun2_background_btn">
                            Background Guides
                        </a>
                    </div>
                    */}
                </div>



                <br/>
                <br/>
                <div className="container-md gallery-sep text-center">
                    <img src="/img/separator2.png" width="50px" height="50px" />
                </div>
                <br/>
                <br/>
                <div className="row dsumun2-about-container">
                    <div className="col-12">
                        <h1 className="dsumun2-title">About DSUMUN Edition II</h1>
                    </div>
                    <div className="col-12 col-md-12 content">
                        <div className="card dsumun2-about-card mx-auto">
                            <div className="dsumun2-card-body">
                                <p className="dsumun2-card-text">
                                    It is with great enthusiasm and pride that MUNSOC from DSU,
                                    in collaboration with ORG Foundation, hosts the successor
                                    conference—DSUMUN Edition II: Beyond Borders. Our event
                                    aims to uphold the cornerstone principles of the United
                                    Nations in international relations and world peace, inspiring
                                    both national and international delegations.
                                </p>
                                <p className="dsumun2-card-text">
                                    Staying true to contemporary relevance, our event seeks to
                                    bring together excitement and diplomacy through six distinct
                                    committees, each with its own unique procedures and perspectives on
                                    compelling global agendas.
                                </p>
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
                <div className="committees-dsumun2">
                    <div className="committee-dsumun2-header text-center">
                        <h1 className="committee-header display-5">Our Committees</h1>
                    </div>
                    {Array.from({ length: Math.ceil(images.length / 3) }).map((_, rowIndex) => (
                        <div className="row justify-content-center" key={rowIndex}>
                            {[0, 1, 2].map((offset) => {
                                const index = rowIndex * 3 + offset;
                                if (index >= images.length) return null;
                                return (
                                    <div
                                        className={`col-lg-4 col-md-6 col-sm-10 col-12 d-flex justify-content-center dsumun2-${committeeNames[index]}`}
                                        key={index}
                                    >
                                        <div className={`card dsumun2-card dsumun2-${committeeNames[index]}`}>
                                            <div className="card-inner">
                                                <div className="card-front text-center">
                                                    <img
                                                        src={images[index]}
                                                        className="img-fluid card-img-comittee"
                                                         alt={committeeNames[index]}
                                                    />
                                                    <h4 className="card-title" style={{fontFamily:"museo",fontSize:"30px",marginTop:"10px"}}>
                                                        {committeeNames[index]}
                                                    </h4>
                                                </div>
                                                <div className="card-back text-center">
                                                    <h1 className="agenda-title" style={{ fontFamily: "museo", fontSize: "50px" }}>
                                                        {(committeeNames[index] !== "IPC" && committeeNames[index] !== "") ? "Agenda" : (committeeNames[index] === "" ? "Special Committee":"")}
                                                    </h1>
                                                    <h2 className="agenda-text" style={{ fontFamily: "museo", fontSize: "30px" }}>
                                                        {agendas[index] || ""}
                                                    </h2>

                                                    {/*<div className="comittee-button text-center">
                                                        <a className="btn btn-register" src={links[index]}>Background Guide</a>
                                                    </div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    <div className="committee-dsumun2-broucher text-center">
                        {/*
                        <button
                            className="committee-broucher btn btn-register"
                            style={{ margin: "30px" }}
                            onClick={openPdf}
                        >
                            Brochure
                        </button>
                        */}
                        <a href="https://drive.google.com/drive/folders/16SWPBO5t5i6Nh9eX3J9NdxYTTG6OOxG6?usp=sharing" className="btn btn-register" id="dsumun2_background_btn" style={{width:"300px",fontSize:"20px",margin:"30px"}}>
                            Background Guides
                        </a>

                        {/* Modal for displaying the PDF */}
                        <Modal
                            isOpen={isOpen}
                            onRequestClose={() => setIsOpen(false)}
                            style={{
                                overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                                content: { width: "70%", height: "80%", margin: "auto" },
                            }}
                        >
                        <button
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "10px",
                                padding: "5px 10px",
                                border: "none",
                                background: "red",
                                color: "white",
                                cursor: "pointer",
                            }}
                            className="btn btn-warning"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>

                        {/* Display PDF using iframe */}
                        <iframe
                            src={pdfUrl}
                            width="100%"
                            height="90%"
                            style={{ border: "none" }}
                        />
                        </Modal>
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
            <div className="container-fluid px-0 overflow-hidden mt-5">
                <div className="row text-center">
                    <div className="col-12 col-md-12 mx-auto">
                        <h1 className="dsumun2-prizepool-one text-nowrap w-100">PRIZEPOOL</h1>
                        <h1 className="dsumun2-prizepool-two text-nowrap w-100">Rs. 75,000+</h1>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" />
            </div>
            <Eb />
            {/*  
            <div className="container-fluid dsumun2-registration text-center p-0" id="registration">
                <div className="row justify-content-center mt-4">
                    <div className="registration-header">
                        <h1 className="display-3" style={{ fontFamily: "museo", fontWeight: "bold", margin: "60px 0", color: "white" }}>
                            Registration
                        </h1>
                    </div>

                    <div className="selection-group" style={{ marginBottom: "100px" }} id="student_type">
                        <h1 style={{ fontFamily: "museo", fontWeight: "bold", color: "white", fontSize: "40px" }}>Student Type:</h1>
                        <div className="selection-container">
                            {[
                                { type: "International", icon: faGlobe },
                                { type: "National", icon: faHouseUser },
                                { type: "DSU", src: "img/dsu-no-background-2.png"},
                            ].map((item) => (
                                <ScrollLink
                                    to="participation_type"
                                    key={item.type}
                                    className={`selection-card ${studentType === item.type ? "selected" : ""}`}
                                    onClick={() => {
                                        setStudentType(item.type);
                                        setParticipantType(""); // Reset participation type when student type changes
                                    }}
                                    style={{ width: "200px", height: "250px", margin:"30px", textDecoration:"none"}}
                                >
                                    {
                                        item.type == "DSU"?(
                                        <img src={item.src} className="dsu-logo-college"/>
                                        ):(
                                        <FontAwesomeIcon icon={item.icon} className="icon" />
                                   )}
                                    <h4 className="item-name" style={{ fontFamily: "museo" }}>{item.type}</h4>
                                </ScrollLink>
                            ))}
                        </div>
                    </div>

                    <div className="selection-group" style={{ marginBottom: "100px" }} id="participation_type">
                        <h1 style={{ fontFamily: "museo", fontWeight: "bold", color: "white", fontSize: "40px" }}>Participation Type:</h1>
                        <div className="selection-container">
                            {[
                                { type: "Individual", icon: faPerson },
                                { type: "Delegation", icon: faPeopleGroup },
                            ].map((item) => (
                                <div
                                    key={item.type}
                                    className={`selection-card ${participantType === item.type ? "selected" : ""}
                                        ${studentType === "DSU" && item.type === "Delegation" ? "disabled" : ""}`}
                                    onClick={() => {
                                        if (studentType === "DSU" && item.type === "Delegation") return; // Disable Delegation for DSU
                                        setParticipantType(item.type);
                                    }}
                                    style={{ width: "200px", height: "250px", margin:"30px" }}
                                >
                                    <FontAwesomeIcon icon={item.icon} className="icon" />
                                    <h4 className="item-name" style={{ fontFamily: "museo" }}>{item.type}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="information-dsumun2-note">
                        <h1 style={{ fontFamily: "museo", color: "white", marginBottom:"40px" }}>* Both options must be picked to register</h1>
                    </div>

                    

                    <div className="reminder-dsumun2">
                        <h1 style={{ fontFamily: "museo", color: "white", marginTop:"20px", fontSize:"25px", marginBottom:"40px" }}>Early bird closes on March 10</h1>
                    </div>

                    {studentType && participantType && (
                        <div className="text-center mt-4">
                            <a
                                href={getRegistrationLink()}
                                className="btn btn-register register-dsumun2-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Proceed to Payment
                            </a>
                        </div>
                    )}
                    <div className="information-dsumun2-note-terms">
                        <div>
                            <h1 style={{color:"white",fontFamily: "museo",fontWeight:"bold",marginBottom:"20px"}}>Transportation will be provided to all delegates</h1>
                            </div>
                        <button
                            style={{ fontFamily: "museo", color: "white",marginBottom:"20px" }}
                            onClick={() => setShowModal(true)}
                            className="btn btn-terms"
                        >
                            Terms and Conditions
                        </button>

                        <TermsModal show={showModal} onClose={() => setShowModal(false)} />
                    </div>
                </div>
            </div>
            {/* Gallery Separator */}
            <div className='container gallery-container'>
                <div className='row text-center'>
                    <h1 className='gallery-header display-5' style={{fontFamily:'museo',fontWeight:"bold"}}>Gallery</h1>
                </div>
                {/*
                <div className='row justify-content-center'>
                    <div className="row text-center">
                        <div className="col-md-6">
                            <img className="gallery-img-dsumun" src={images[0]} alt="First slide" onClick={() => setSelectedImage(images[0])}/>
                            <img className="gallery-img-dsumun" src={images[5]} alt="First slide" onClick={() => setSelectedImage(images[5])} />
                        </div>
                        <div className="col-md-6">
                            <img className="gallery-img-dsumun" src={images[1]} alt="Second slide" onClick={() => setSelectedImage(images[1])} />
                            <img className="gallery-img-dsumun" src={images[2]} alt="Third slide" onClick={() => setSelectedImage(images[2])} />
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-6">
                            <img className="gallery-img-dsumun" src={images[3]} alt="Fourth slide" onClick={() => setSelectedImage(images[3])} />
                        </div>
                        <div className="col-md-6">
                            <img className="gallery-img-dsumun" src={images[4]} alt="Fifth slide" onClick={() => setSelectedImage(images[4])} />
                        </div>
                    </div>
                </div>
                */}<br/>
                <div className='row text-center'>
                    <h3 className='gallery-header display-7' style={{fontFamily:'museo',fontWeight:"bold"}}>Coming soon</h3>
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

export default DSUMUN2;
