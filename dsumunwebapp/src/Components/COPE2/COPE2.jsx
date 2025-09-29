import React, { useState } from "react";
import Nav from "../Nav.jsx";
import Footer from "../Footer.jsx";
import "../../style/cope.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Modal from "react-modal";

Modal.setAppElement("#root");

const images = [
    "/img/DISEC.png",
    "/img/G20no-bg.png",
    "/img/UNSC.png",
];

// Committee data for COPE2
const committeeNames = ["DISEC", "G20", "UNSC"];
const committeeImages = ["/img/DISEC.png", "/img/G20no-bg.png", "/img/UNSC.png"];
const agendas = [
    "Nuclear Proliferation with special emphasis on the Middle East",
    "Comprehensive Economic Recovery Post-Pandemic: Sustainable Growth Strategies",
    "Addressing Climate Change: A Global Perspective"
];

const COPE2 = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");

    // helper to open PDF modal (keeps previous intent intact)
    const openPdf = (url = "") => {
        setPdfUrl(url);
        setIsOpen(true);
    };

    return (
        <>
            <Nav />

            <div className="container-fluid p-0">
                <div className="cope2-Banner">
                    {/* Video Background */}
                    <div className="video-background">
                        <video autoPlay muted loop playsInline>
                            <source src="/img/Earth.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="video-overlay"></div>
                    </div>

                    {/* Content Row */}
                    <div className="row content cope2-landing">
                        {/* Left side - Large Logo */}
                        <div className="col-6 left-logo d-flex flex-column align-items-center">
                            <img src="/img/COPE2_Logo.png" alt="COPE Logo" className="cope2-logo" />
                        </div>

                        {/* Right side - Large Image (Stacked) */}
                        <div className="col-6 right-images d-flex flex-column align-items-center">
                            <img src="/img/MUNSOCLOGO2-white.png" alt="Top Image" className="img-dsu img-fluid" />
                            <div className="divider p-5">
                                <FontAwesomeIcon icon={faX} style={{ color: "#74C0FC" }} />
                            </div>
                            <img src="/img/G20no-bg.png" alt="Bottom Image" className="img-org img-fluid" />
                        </div>
                    </div>
                </div>

                <div className="container" style={{ marginTop: "10%" }}>
                    <div className="row cope-about-container">
                        <div className="col-12 text-center">
                            <h1 className="cope-title">COPE Edition II: The Conference of Public Exchange</h1>
                        </div>

                        <div className="col-12 content text-center">
                            <div className="card cope-about-card w-90 mx-auto text-center">
                                <div className="cope-card-body text-center">
                                    <p className="cope-card-text text-justify text-center ml-5">
                                        MUNSOC is proud to announce COPE Edition II, the Conference of Public Exchange—our premier intra-MUN, which will be held on October 3rd &amp; 4th, 2025. This edition will feature two dynamic committees: the United Nations General Assembly – DISEC and the Group of 20, where participants will engage in timely discussions on pressing global issues.

                                        Infused with MUNSOC’s core values, COPE Edition II will continue to foster dialogue, critical thinking, and leadership, providing a platform for students to voice their perspectives on matters shaping both our nation and the world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <br />

                <br />
                <br />

                <div className="committees-dsumun2">
                    <div className="committee-dsumun2-header text-center">
                        <h1 className="committee-header display-5">Our Committees</h1>
                    </div>

                    {Array.from({ length: Math.ceil(images.length / 3) }).map((_, rowIndex) => (
                        <div className="row justify-content-center" key={rowIndex}>
                            {[0, 1, 2].map((offset) => {
                                const index = rowIndex * 3 + offset;
                                if (index >= images.length) return null;

                                const committeeName = committeeNames[index] ?? ""; // safe default
                                const agendaText = agendas[index] ?? "";

                                return (
                                    <div
                                        className={`col-lg-4 col-md-6 col-sm-10 col-12 d-flex justify-content-center g-5 ${
                                            committeeName ? `dsumun2-${committeeName}` : ""
                                        }`}
                                        key={index}
                                    >
                                        <div className={`card dsumun2-card ${committeeName ? `dsumun2-${committeeName}` : ""}`}>
                                            <div className="card-inner">
                                                <div className="card-front text-center" style={{maxHeight: "450px"}}>
                                                    <img
                                                        src={images[index]}
                                                        className="img-fluid card-img-comittee cope-com"
                                                        alt={committeeName || `committee-${index}`}
                                                        style={ { maxHeight: "100px" }}
                                                    />
                                                    <h4 className="card-title" style={{ fontFamily: "museo", fontSize: "30px", marginTop: "10px" }}>
                                                        {committeeName || ("Committee " + (index + 1))}
                                                    </h4>
                                                </div>

                                                <div className="card-back text-center">
                                                    <h1 className="agenda-title" style={{ fontFamily: "museo", fontSize: "50px" }}>
                                                        {committeeName && committeeName !== "IPC" ? "Agenda" : committeeName === "" ? "Special Committee" : ""}
                                                    </h1>
                                                    <h2 className="agenda-text" style={{ fontFamily: "museo", fontSize: "30px" }}>
                                                        {agendaText}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    <div className="committee-dsumun2-broucher text-center">
{/*                         <a href="https://drive.google.com/drive/folders/16SWPBO5t5i6Nh9eX3J9NdxYTTG6OOxG6?usp=sharing" className="btn btn-register" id="dsumun2_background_btn" style={{ width: "300px", fontSize: "20px", margin: "30px" }}>
                            Background Guides
                        </a> */}

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

                            <iframe src={pdfUrl} width="100%" height="90%" style={{ border: "none" }} title="PDF Preview" />
                        </Modal>
                    </div>
                </div>
            </div>

            {/* After the top container-fluid (closed above), these are sibling sections */}
            <br />
            <br />

            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" alt="separator" />
            </div>

            <br />
            <br />

            <div className="container-fluid px-0 overflow-hidden mt-5">
                <div className="row text-center">
                    <div className="col-12 col-md-12 mx-auto">
                        <h1 className="dsumun2-prizepool-one text-nowrap w-100">PRIZEPOOL</h1>
                        <h1 className="dsumun2-prizepool-two text-nowrap w-100">Rs. 4,000+</h1>
                    </div>
                </div>
            </div>

            <br />
            <br />

            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" alt="separator" />
            </div>

            <br />
            <br />

            {/* GALLERY SECTION */}
            {/* <div className="container cope-gallery">
                <div className="row text-center">
                    <h1 className='display-5' style={{ fontFamily: 'museo', fontWeight: "bold" }}>Gallery</h1>
                </div>

                <br />

                <div className="row text-center">
                    <div className="col-md-8">
                        <img className="gallery-img" src={images[0]} alt="First slide" onClick={() => setSelectedImage(images[0])} />
                    </div>
                    <div className="col-md-4">
                        <img className="gallery-img" src={images[1]} alt="Second slide" onClick={() => setSelectedImage(images[1])} />
                        <img className="gallery-img" src={images[2]} alt="Third slide" onClick={() => setSelectedImage(images[2])} />
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col-md-6">
                        <img className="gallery-img" src={images[3]} alt="Fourth slide" onClick={() => setSelectedImage(images[3])} />
                    </div>
                    <div className="col-md-6">
                        <img className="gallery-img" src={images[4]} alt="Fifth slide" onClick={() => setSelectedImage(images[4])} />
                    </div>
                </div>
            </div>
 */}
            {/* MODAL FOR VIEWING IMAGES */}
            {/* {selectedImage && (
                <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Enlarged" className="modal-img" />
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>✖</button>
                    </div>
                </div>
            )} */}

            <Footer />
        </>
    );
};

export default COPE2;
