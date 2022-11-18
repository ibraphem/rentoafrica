import React from "react";
import { Col, Row } from "react-bootstrap";
import CardLoader from "../../components/loaders/CardLoader";
import Error from "../error/Error";
import PropertyCard from "./PropertyCard";

const Properties = ({ rentData, title, isfavScreen, cancel, loading }) => {
  const shadow = [1, 2, 3, 4, 5, 6];


  return (
   
        <>
        <Row id="scrollableDiv">
          {rentData?.length < 1 && loading ? (
             shadow?.map((shad)=> (
              <Col lg={4} key={shad}>
              <CardLoader/>
            </Col>
            ))
          ): rentData?.length < 1 && !loading ? (
            <Error errorTitle="No Apartment was found" errorDesc="We couldn't do find any property on your rent request list. Browse through our enlisted properties and apply for rent."/>
          ):
          (
          
            rentData?.map((data) => (
              <Col lg={4} key={data?.propertyId}>
                <PropertyCard data={data} isfavScreen={isfavScreen} cancel={cancel} />
              </Col>
            ))
            
          )
          }
           
        
        </Row>
        </>
     
  );
};

export default Properties;
