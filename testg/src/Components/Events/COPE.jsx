import { useState } from "react";
import Nav from "../Nav.jsx";
import Footer from "../Footer.jsx";
import "../../style/cope.css";

const images = [
    "/img/COPE1pic2.jpg",
    "/img/COPE1pic1.jpg",
    "/img/COPE1pic3.jpg",
    "/img/COPE1pic4.jpg",
    "/img/COPE1pic5.jpg",
];

const COPE = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="container-fluid p-0">
            <Nav />
            <div className="container" style={{ marginTop: "10%" }}>
                <div className="row cope-about-container">
                    <div className="col-12 text-center">
                        <h1 className="cope-title">COPE Edition I: The Conference of Public Exchange</h1>
                    </div>
                    <div className="col-12 content">
                        <div className="card cope-about-card w-75 mx-auto">
                            <div className="cope-card-body">
                                <p className="cope-card-text text-justify">
                                    MUNSOC proudly unveils the triumph of COPE Edition I, the Conference of Public Exchange—an intra-collegiate debate competition held on March 22nd & 23rd, 2024. Across three dynamic committees: the Vidhan Soudha, the Lok Sabha, and the United Nations General Assembly, participants immersed themselves in timely discussions, delving into issues shaping both our nation and the global landscape. Infused with our society's core values, COPE Edition I emerged as an unequivocal success on multiple fronts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" alt="separator" />
            </div>
            <br />

            {/* GALLERY SECTION */}
            <div className="container cope-gallery">
                <div className="row text-center">
                    <h1 className='display-5' style={{fontFamily:'museo',fontWeight:"bold"}}>Gallery</h1>
                </div>
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

            {/* MODAL FOR VIEWING IMAGES */}
            {selectedImage && (
                <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Enlarged" className="modal-img" />
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>✖</button>
                    </div>
                </div>
            )}
            <br />
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" alt="separator" />
            </div>
            <br />
            <Footer />
        </div>
    );
};

export default COPE;
