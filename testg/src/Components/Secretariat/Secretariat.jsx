import Nav from "../Nav.jsx";
import Footer from "../Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/secretariat.css";

const secretariatSections = [
  {
    title: "Executive",
    members: [
      { name: "Shashwat Saini", role: "Secretary General", img: "/img/shashwatsaini.jpg" },
      { name: "Suraj S.", role: "Director General", img: "/img/suraj.jpg" },
      { name: "Aditya N.", role: "Charge d'affaires", img: "/img/adityan.jpg" },
    ],
  },
  {
    title: "Outreach",
    members: [
      { name: "Vijayalakshmi K", role: "Head of Outreach", img: "/img/VijayalakshmiK.jpg" },
      { name: "Akash A. Nair", role: "Under-Secretary-General: Outreach", img: "/img/fatman.jpg" },
      { name: "Thanushree", role: "Under-Secretary-General: Outreach", img: "/img/Thanushree.JPG" },
    ],
  },
  {
    title: "Graphics & Technicals",
    members: [
      { name: "Uddhav Bhat", role: "Head of Technicals", img: "/img/uddhavN.jpg" },
      { name: "Akshay M. Davanageri", role: "Head of Graphics", img: "/img/assket.jpg" },
      {name: "Sunaina Mohapatra", role:"Under-Secretary-General: Graphics", img:"/img/SunainaMohapatra.jpg"}
    ],
  },
  {
    title: "Socials",
    members: [
      { name: "Purab Mohit Jha", role: "Under-Secretary-General: Socials", img: "/img/Purab Mohit Jha.jpg" },
      { name: "Rudra Dubey", role: "Under-Secretary-General: Socials", img: "/img/Rudra Dubey.JPG" },
    ],
  },
  {
    title: "Finance",
    members: [
      {name : "Aditya Bidappa", role:"Under-Secretary-General: Finance",img:"/img/biddapa_aditya.jpg"},
      {name: "Snehalini Dutta ", role:"Under-Secretary-General: Finance",img:"/img/SnehaliniDutta.jpg"}
    ]
  },
  {
    title: "Delegate Affairs",
    members: [
      { name: "Anudeep B. J.", role: "Under-Secretary-General: Delegate Affairs", img: "/img/anudeepbj.jpg" },
      { name: "K Sai Suchith", role: "Under-Secretary-General: Delegate Affairs", img: "/img/K Sai Suchith.JPG" },
    ],
  },
  {
    title: "Documentation",
    members: [
      { name: "Clifford Thiyam", role: "Under-Secretary-General: Documentation", img: "/img/Clifford.jpg" },
    ],
  },
  {
    title: "Sponsorships",
    members: [
      { name: "Devesh M.", role: "Under-Secretary-General: Sponsorships", img: "/img/devesh.jpg" },
    ],
  },
];

const Secretariat = () => {
  return (
    <div>
      <Nav />
      <div className="container secretariat-container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h2 className="display-5 secretariat-title">The Secretariat</h2>
          </div>
        </div>

        {secretariatSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="secretariat-section">
            <h3 className="text-center section-title">{section.title}</h3>
            <div className="row row-cols-1 row-cols-md-2 justify-content-center g-4">
              {section.members.map((member, index) => (
                <div className="col" key={index}>
                  <div className="card secretariat-card">
                    <div className="row g-0">
                      <div className="col-md-6 text-center">
                        <img src={member.img} className="img-fluid rounded-start member-img" alt={member.name} />
                      </div>
                      <div className="col-md-6">
                        <div className="card-body text-center">
                          <h5 className="card-title text-center">{member.name}</h5>
                          <p className="card-text text-center">
                            {member.role.includes(':') ? (
                            <>
                              {member.role.split(':')[0]}:
                              <br />
                              {member.role.split(':')[1].trim()}
                            </>
                            ) : (
                              member.role
                          )}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <div className="row justify-content-center">
                <div className="col-md-2 text-center">
                    <img src="/img/separator2.png" className="separator-img" alt="Separator" />
                </div>
            </div>
            <br />
          </div>
        ))}

      </div>
      <Footer />
    </div>
  );
};

export default Secretariat;
