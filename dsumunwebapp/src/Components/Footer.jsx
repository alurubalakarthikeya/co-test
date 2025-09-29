import '../style/footer.css';

const Footer = () => {
    return (
        <div className="footer text-center">
            <div className="display-8">© 2025 Copyright: DSU Model United Nations Society</div>
            <div className="display-8">"There is nothing stronger than those two: Patience & Time"</div>
            <div className="social-links mt-2">
                <a
                    href="https://in.linkedin.com/company/dsu-model-united-nations-society"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fa fa-linkedin" style={{ paddingRight: "10px" }}></i>
                </a>
                <a
                    href="https://www.instagram.com/dsu_munsoc/?igsh=MWwydW53a28yeTIyYw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fa fa-instagram"></i>
                </a>
            </div>
            <br />
            <img
                src="/img/logo_white.png"
                width="5%"
                height="35%"
                alt="DSU MUN Logo"
                className='footerlogo'
            />
        </div>
    );
};

export default Footer;
