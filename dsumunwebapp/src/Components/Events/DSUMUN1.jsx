import '../../style/dsumun1.css'
import Nav from '../Nav.jsx'
import Footer from '../Footer.jsx';
import { useState } from 'react';

const DSUMUN1 = () => {
    const committees = [
        {
          title: "UNSC",
          image: "/img/UNSC2.png",
          agenda: "Turkey’s Aggression in Syria and Iraq",
        },
        {
          title: "DISEC",
          image: "/img/DISEC2.png",
          agenda: "Cyber Crime Threats During Elections",
        },
        {
          title: "WHO",
          image: "/img/WHO2.png",
          agenda: "Patent Pooling for Medicines",
        },
        {
          title: "Lok Sabha",
          image: "/img/LokSabha2.png",
          agenda: "Manipur Ethnic Violence",
        },
      ];
      const images = [
        "/img/DsuMun1.jpg",
        "/img/DsuMun2.jpg",
        "/img/DsuMun3.jpg",
        "/img/DsuMun4.jpg",
        "/img/DsuMun5.jpg",
        "/img/DsuMun6.jpg",
      ]
      const [selectedImage, setSelectedImage] = useState(null);

    return(
        <div className="container-fluid p-0">
            <Nav/>
            <div className="container" style={{marginTop:"10%"}}>
                <div className="row dsumun-about-container">
                    <div className="col-12">
                        <h1 className="dsumun-title">About DSUMUN</h1>
                    </div>
                    <div className="col-12 col-md-12 content">
                        <div className="card dsumun-about-card w-75 mx-auto">
                            <div className="dsumun-card-body">
                                <p className="dsumun-card-text">
                                    Our inaugural Model UN Conference, DSUMUN Edition 1, harmonizes with our ideas, and extends a warm invitation to both seasoned delegates and newcomers alike. 
                                    Against the backdrop of contemporary events, we are committed to addressing urgent issues across four dynamic committees—the UNSC, DISEC, Lok Sabha, and the WHO—
                                    with unwavering dedication and conscientiousness.
                                </p>
                            </div>
                            <div className="dsumun-card-body">
                                <p className="dsumun-card-text">
                                    MUN simulations engage thousands of students each year in developing public speaking, writing, and research skills while learning about the principles of the UN. 
                                    In addition, they often act as the first entry point into international affairs and concepts—fostering empathy and understanding, championing human dignity and equality, 
                                    promoting progress and prosperity, and upholding justice and accountability.
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
            <div className="container-fluid committee-container">
                <div className="contianer-header text-center">
                    <h1 className="display-5" style={{fontWeight: "bolder",fontFamily: "museo",color: "white",marginBottom: "60px",marginTop: "30px"}}>
                        Our Committees
                    </h1>
                </div>
                <div className="row committees-container">
                    {committees.map((committee, index) => (
                        <div key={index} className="col-12 col-md-3">
                            <div className="card committee-card mb-3">
                                <img src={committee.image} className="card-img-top mx-auto" alt={committee.title} />
                                    <h1 className="card-title" style={{ fontSize: "30px" }}>
                                        {committee.title}
                                    </h1>
                                <div className="card-body agenda-body">
                                    <h1 className="card-text" style={{ fontSize: "50px" }}>Agenda</h1>
                                    <p className="card-text">{committee.agenda}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{ padding: "30px" }}>
                    <a className="btn btn-background" id="background-guide" style={{ fontFamily: "museo-sans", color: "white" }} href="https://drive.google.com/drive/folders/1wwkfdTZe2HdV3tcoynGPf5eH_HKYro51?usp=sharing">
                        Background Guides
                    </a>
                </div>
            </div>
            <br/>
            <br/>
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" />
            </div>
            <br/>
            <br/>
            <div className="container-fluid px-0 overflow-hidden">
                <div className="row text-center">
                    <div className="col-12 col-md-12 mx-auto">
                        <h1 className="prizepool-one text-nowrap w-100">PRIZEPOOL</h1>
                        <h1 className="prizepool-two text-nowrap w-100">Rs. 25,000+</h1>
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
            <div className='container gallery-container'>
                <div className='row text-center'>
                    <h1 className='gallery-header display-5' style={{fontFamily:'museo',fontWeight:"bold"}}>Gallery</h1>
                </div>
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
            </div>
            {selectedImage && (
                <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Enlarged" className="modal-img" />
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>✖</button>
                    </div>
                </div>
            )}
            <br/>
            <br/>
            <div className="container-md gallery-sep text-center">
                <img src="/img/separator2.png" width="50px" height="50px" />
            </div>
            <br/>
            <br/>
            <div className='footer'>
                <Footer/>
            </div>
        </div>
    )
}

export default DSUMUN1;