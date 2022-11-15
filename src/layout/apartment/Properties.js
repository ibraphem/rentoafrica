import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardLoader from "../../components/loaders/CardLoader";
import PropertyCard from "./PropertyCard";

const Properties = ({ rentData, title, isfavScreen, cancel, loadMore }) => {
  const shadow = [1, 2, 3, 4, 5, 6, 7, 8, 9];


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
        <Row id="scrollableDiv">
          {rentData?.length > 0 ? (
             rentData?.map((data) => (
              <Col lg={4} key={data?.propertyId}>
                <PropertyCard data={data} isfavScreen={isfavScreen} cancel={cancel} />
              </Col>
            ))
          ): 
          (
            shadow?.map((shad)=> (
              <Col lg={4} key={shad}>
              <CardLoader/>
            </Col>
            ))
            
          )
          }
           
        
        </Row>
      </Container>
    </section>
  );
};

export default Properties;
