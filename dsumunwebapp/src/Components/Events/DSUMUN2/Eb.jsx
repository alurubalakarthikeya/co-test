
import "../../../style/eb.css";

const Eb = () => {
    const committeeNames = ["G20", "UNSC", "DISEC", "UNHRC", "AIPPM", "IPC"];
    const agendas = [
        "Mini-agendas, a new RoP, double delegate team",
        "The Situation in Cyprus",
        "Nuclear Proliferation with special emphasis on the Middle East",
        "The Myanmar Crisis",
        "Assessing policy reforms for gender justice in marriage",
        "International Press Corps"
    ];
    const images = [
        "/img/G20Logo.png",
        "/img/UNSC.png",
        "/img/DISEC.png",
        "/img/United_Nations_Human_Rights_Council_Logo.svg",
        "/img/AIPPM.svg",
        "/img/InternationalPress.svg"
    ];

    const ebImages = [
        "/img/Eb/Chair_G20-min.jpg",
        "/img/Eb/G20_ViceChair-min.jpg",
        "/img/Eb/Aditya Bidappa G20 Rapporteur-min.jpg",
        "/img/Eb/Chair UNSC-min.jpg",
        "/img/Eb/UNSC Vice Chair-min.jpg",
        "/img/Eb/Vijayalakshmi_UNSC-min.jpg",
        "/img/Eb/Chair_DISEC-min.jpg",
        "/img/Eb/Formal .jpg",
        "/img/Eb/AnudeepBJ-min.jpeg",
        "/img/Eb/UNHRC - CHAIR-min.jpg",
        "/img/Eb/UNHRC - vice chair -min.JPG",
        "/img/Eb/UNHRC_Rapporteur-min.jpeg",
        "/img/Eb/AIPPM Speaker-min.jpg",
        "/img/Eb/AIPPM VICE CHAIR, Anshuman_-min.jpg",
        "/img/Eb/Devesh M-min.jpg",
        "/img/Eb/Head of IPC - Snehal Nandi-min.jpg",
        "/img/Eb/IPC Editor-in-Chief-min.jpg"
    ];

    const names = [
        "G.S. Shreya", "Sara Girdhar", "Aditya Bidappa", "Tannmay Kumarr Baid",
        "Aaleya Tiwari", "Vijayalakshmi", "Chinmay D.", "Shreeya S. Amargol",
        "Anudeep B.J.", "Alby Mathew", "Jayany Nunna", "Bilal Ahmed",
        "Darshan C.P.", "Anshuman Pandey", "Devesh Mamadapur",
        "Snehal Nandi", "Smaran Chandrashaker"
    ];


    const rolesMap = {
        G20: ["Speaker", "Deputy Speaker", "Rapporteur"],
        IPC: ["Head of IPC", "Editor-In-Chief"],
    };

    const defaultRoles = ["Chairperson", "Vice Chairperson", "Rapporteur"];
    
    let ebImageIndex = 0; // Counter for unique images

    return (
        <div>
            <div className="container-fluid p-0">
                <div className="row text-center">
                    <div className="eb-header">
                        <h1 style={{ fontFamily: "museo", fontSize: "50px" }}>The Executive Board</h1>
                    </div>
                </div>
                <div>
                {committeeNames.map((committee, index) => (
                    <div className="row text-center my-4 eb-row" key={index}>
                        {/* Mobile View: Title Above EB Cards */}
                        <div className="d-block d-lg-none col-12 d-flex flex-column align-items-center justify-content-center">
                            <h4 className="mobile-committee-title" style={{ fontFamily: "museo", fontSize: "30px" }}>
                                {committee}
                            </h4>
                        </div>
                        {/* Left side - Committee Card (Hidden in Mobile) */}
                        <div className="col-5 d-none d-lg-flex justify-content-center committee-col-eb p-5">
                            <div className={`card dsumun2-card-eb dsumun2-${committee}-eb`}>
                                <div className="card-inner-eb">
                                    <div className="card-front-eb text-center">
                                        <img
                                            src={images[index]}
                                            className="img-fluid card-img-comittee-eb"
                                            alt={committee}
                                        />
                                        <h4 className="card-title-eb" style={{ fontFamily: "museo", fontSize: "30px" }}>
                                            {committee}
                                        </h4>
                                    </div>
                                    <div className="card-back-eb text-center">
                                        <h1 className="agenda-title-eb" style={{ fontFamily: "museo", fontSize: "50px" }}>
                                        {(committeeNames[index] !== "IPC" && committeeNames[index] !== "G20") ? "Agenda" : (committeeNames[index] === "G20" ? "Special Committee":"")}
                                        </h1>
                                        <h2 className="agenda-text-eb" style={{ fontFamily: "museo", fontSize: "30px" }}>
                                            {agendas[index] || ""}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right side - Individual EB Member Cards */}
                        <div className="col-12 col-lg-7 d-flex justify-content-center p-5">
                            <div className="eb-members-container">
                            {(rolesMap[committee] || [...defaultRoles]).map((role, i) => {
                                    const ebImage = ebImages[ebImageIndex] || "/img/default-profile.jpg"; // Fallback
                                    const name = names[ebImageIndex] || "Unknown";
                                    ebImageIndex++; // Ensure unique images
                                    return (
                                        <div
                                            key={i}
                                            className={`eb-member-card text-center ${i === 2 ? 'third-card' : ''}`} 
                                        >
                                            <div className="eb-overlay">
                                                <p className="eb-name">{name}</p>
                                            </div>
                                            <img src={ebImage} alt={role} className="eb-member-card-img"/>
                                            <h5 className="eb-role">{role}</h5>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="container-md gallery-sep text-center">
                            <img src="/img/separator2.png" width="50px" height="50px" />
                        </div>
                        <br />
                        <br />
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Eb;