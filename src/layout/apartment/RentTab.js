import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const RentTab = () => {
    return (
        <section className="gauto-login-area section_70">
        <Container>
          <Row>
            <Col md={12}>
              <div className="login-box">
  
                <Tabs
                  defaultActiveKey="tenant"
                  id="fill-tab-example"
                  className="mb-3 tabClass"
                  fill
                >
                  <Tab eventKey="tenant" title="Pay Once">
                      <p>COOOl</p>
                  </Tab>
                  <Tab eventKey="corporate" title="Flexible Pay">
                    <p>Hot</p>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
};

export default RentTab;