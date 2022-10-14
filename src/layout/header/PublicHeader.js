import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaHome,
  FaHouseDamage,
  FaPhoneAlt,
  FaSignInAlt,
} from "react-icons/fa";
import "../../assets/css/publicStyles/header.css"
import { useSelector } from "react-redux";
import MobileHeader from "./MobileHeader";
const PublicHeader = () => {
    const favRent = useSelector((state) => state?.favoriteRent?.rent);
    return (
        <div className="headerContainer" style={{position: "fixed", top: 0, width:"100vw", zIndex: 50000, backgroundColor:"#fff"}}>
        <section className="gauto-header-top-area" style={{position: "relative"}}>
          <Container>
            <Row>
              <Col md={6}>
                <div className="header-top-left">
                  <p>
                    Need help? <FaPhoneAlt /> call: +234 703 1259 185
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="header-top-right">
                  <Link to="/login">
                    <FaSignInAlt />
                    Login
                  </Link>
                  <Link to="/register/agent">
                    <FaHouseDamage/>
                    Enlist Property and Earn
                  </Link>
          
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <header className="gauto-main-header-area bg-white">
          <Container>
            <Row>
              <Col md={3}>
                <div className="site-logo">
                  <a href="/">
                    {/* <img src={Logo} alt="gauto" /> */}
                    RENTO LOGO
                  </a>
                </div>
              </Col>
             <Col lg={5} sm={9}></Col>
              <div className="col-lg-4">
                <div className="header-action">
                  <Link to="/register/corporate">
                    <FaHome /> Enjoy Rento with your staffs
                  </Link>
                </div>
              </div>
            </Row>
          </Container>
        </header>
        <section className="gauto-mainmenu-area" >
          <Container>
            <Row>
              <Col lg={9}>
                <div className="mainmenu">
                  <nav>
                    <ul id="gauto_navigation">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Col>
              <Col lg={3} sm={12}>
                <div className="main-search-right">
                  <MobileHeader />
                  <div className="header-cart-box">
                    <div className="login dropdown">
                      {favRent?.length > 0 && (
                        <Link to="/favorites" className="cart-icon" id="dropdownMenu1">
                        <span>{favRent?.length}</span>
                      </Link>
                      )}
                      
                    </div>
                  </div>
                 
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
};

export default PublicHeader;