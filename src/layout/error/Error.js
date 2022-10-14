import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../error/Error.css"


const Error = ({errorCode, errorTitle, errorDesc}) => {
    return (
        <section className="gauto-notfound-area section_70">
        <Container>
          <Row>
            <Col md={12}>
              <div className="notfound-box">
                <h2>
                  {errorCode}
                </h2>
                <h3>{errorTitle}</h3>
                <p>{errorDesc}</p>
                <Link to="/" className="gauto-btn">
                  Back To Home
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
};

export default Error;