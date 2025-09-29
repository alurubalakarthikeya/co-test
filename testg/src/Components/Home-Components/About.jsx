import '../../style/about.css';

const About = () => {
    return (
        <div>
            <div className="container about-us" style={{ paddingLeft: "35px" }} name="about">
                <div className="row aboutus-container">
                    <div className="col-12">
                        <h1 style={{ fontWeight: "bolder", fontFamily: "museo-sans", color: "black", fontSize: "60px", textAlign: "center" }}>
                            About Us
                        </h1>
                    </div>
                    <br />
                    <br />
                    <div className="col-12 col-md-12 home-content">
                        <div className="card home-card w-75 mx-auto">
                            <div className="card-body home-body">
                                <p className="card-text" style={{ fontFamily: "museo-sans" }}>
                                    Established in 2023, the Model United Nations Society at Dayananda Sagar University is committed to raising awareness about global events and influential personalities. Our mission centers on cultivating indispensable skills—diplomacy, leadership, research, and eloquence—crucial in navigating today’s complex world.
                                </p>
                            </div>
                            <div className="card-body home-body">
                                <p className="card-text" style={{ fontFamily: "museo-sans" }}>
                                    In an era fraught with challenges, it is imperative to develop a perspective that accommodates all parties. Attacks on free speech, relics of a bygone era, must be consigned to history. As torchbearers of the next generation, we bear the responsibility of safeguarding principles bestowed upon us by democratic institutions, a free press, and international cooperation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
