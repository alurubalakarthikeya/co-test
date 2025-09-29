import { Link } from "react-router-dom";
import {Link as ScrollLink} from "react-scroll";
import '../style/nav.css';
import { useEffect, useRef } from "react";


const navStyle = {
  backgroundColor: "#00204A",
};

const textStyle = {
  fontFamily: "museo",
  color: "white",
  fontSize: "22px",
};

const Nav = () => {

  const navbarRef = useRef(null);
  const togglerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        togglerRef.current &&
        !togglerRef.current.contains(event.target)
      ) {
        document.querySelector(".navbar-collapse").classList.remove("show");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={navStyle} ref={navbarRef}>
      <div className="container-fluid">
        <Link className="navbar-brand" id="dsu-logo" to="/">
          <img src="/img/logo_white_notext.svg" height="50" width="50" alt="DSU Logo" />
        </Link>
        <Link className="navbar-brand" id="dsu-munsoc" to="/" style={textStyle}>
          DSU MUNSOC
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref={togglerRef}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" id="home-link" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="eventsDropdown-dsumun2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "white" }}
              >
                COPE-II
              </a>
              <ul className="dropdown-menu" aria-labelledby="eventsDropdown">
                <Link className="dropdown-item" to="/cope2" id="dsumun-link" style={{ color: "white" }}>
                  The Event
                </Link>
                <Link className="dropdown-item" to="/cope2/executive-board" id="Eb-link" style={{ color: "white" }}>
                  The Executive Board
                </Link>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="eventsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "white" }}
              >
                Events
              </a>
              <ul className="dropdown-menu" aria-labelledby="eventsDropdown">
                <li>
                  <Link className="dropdown-item" to="/events/dsumun1">
                    DSUMUN
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/events/dsumun2">
                    DSUMUN-II
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/events/cope">
                    COPE
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/events/delegation">
                    Delegation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/events/others">
                    Others
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/secretariat" id="secretariat-link" style={{ color: "white" }}>
                The Secretariat
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <ScrollLink className="nav-link" to="about" id="about-nav" style={{ color: "white" }}>
                  About Us
                </ScrollLink>
            </li>
          </ul>
          <span className="navbar-text d-none" style={{ ...textStyle, padding: "2px" }}>
            The Model United Nations Society
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
