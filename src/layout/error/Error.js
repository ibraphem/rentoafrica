import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/publicStyles/error.css"


const Error = ({errorCode, errorTitle, errorDesc, btnText="Go Back Home", redir="/"}) => {
    return (
   
        <Container>
          <Row>
            <Col md={12}>
              <div className="notfound-box">
                <h2>
                  {errorCode}
                </h2>
                <h3>{errorTitle}</h3>
                <p>{errorDesc}</p>
                <Link to={redir} className="gauto-btn">
                  {btnText}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
    
    );
};

export default Error;