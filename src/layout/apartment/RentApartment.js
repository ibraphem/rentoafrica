import { Container, Row, Col } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FlexiblePayRent from "./FlexiblePayRent";
import FullPayRent from "./FullPayRent";

const RentApartment = ({ rentDataDetail }) => {

  return (
    <section className="gauto-booking-form" style={{ padding: "20px" }}>
      <Container>
        <Row>
          <Col lg={7}>
            <div className="booking-form-left">
              <div className="single-booking">
                <h3>Do you like this apartment? Get Started</h3>

                {/* <Alerts showAlert={showAlert} message={errMsg} closeAlert={() => setShowAlert(false)} /> */}

                <Tabs defaultActiveKey="tenant" id="fill-tab-example" className="mb-3 tabClass" fill>
                  <Tab eventKey="tenant" title="Full Rent Pay">
                  
                      <FullPayRent rentDataDetail={rentDataDetail}/>
                
                  </Tab>
                  <Tab eventKey="corporate" title="Flexible Rent Pay">
                    <FlexiblePayRent rentDataDetail={rentDataDetail}/>
                  </Tab>
               
                </Tabs>

                
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RentApartment;
