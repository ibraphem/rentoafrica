import { Col, Container, Row } from "react-bootstrap";
import hero1 from "../../assets/images/hero1.jpg"
import "../../assets/css/publicStyles/hero.css"
import { FaCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import FindHome from "../../layout/apartment/FindHome";

const Hero = () => {
    
    return (
        <section className="gauto-slider-area fix">
       
          <div className="slide">
            <div
              className=" gauto-main-slide"
              style={{ backgroundImage: `url(${hero1})` }}
            >
              <div className="gauto-main-caption">
                <div className="gauto-caption-cell">
                  <Container>
                    <Row>
                      <Col md={12}>
                          <div className="heroCaption">
                            <h2>No Agency Fee <FaRegTimesCircle color="#ec3323"/></h2>
                            <h2>No Agreement Fee <FaRegTimesCircle color="#ec3323"/></h2>
                            <h2>Flexible Payment <FaCheckCircle color="#00ff00"/></h2>

                          </div>
                          <FindHome/>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </div>
          </div>
    
      </section>
    );
};

export default Hero;