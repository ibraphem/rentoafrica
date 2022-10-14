import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropertyCard from './PropertyCard';

const Properties = ({rentData, title, isfavScreen}) => {
    return (
        <section className="gauto-offers-area section_70">
            <Container>
            <Row>
          <Col md={12}>
            <div className="site-heading">
              <h2>{title}</h2>
            </div>
          </Col>
        </Row>
        <Row>
            {rentData?.map((data)=>(
                <Col lg={4} key={data?.id}>
                <PropertyCard data={data} isfavScreen={isfavScreen}/>
            </Col>
            ))}
            
        </Row>
            </Container>
        </section>
    );
};

export default Properties;