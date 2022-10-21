import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Row,
  Col,
} from "../../components/Component";
import Layout from "../../layout/Index";
import ApartmentTable from "../../shared/ApartmentTable";
import { apartmentData } from "../../mock/apartments";

const ApartmentListing = () => {
    return (
        <Layout>
        <Head title="DASHBOARD"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Listed Apartment
                </BlockTitle>
                <BlockDes className="text-soft">
                  <p>You have listed a total of 33 Apartments so far.</p>
                </BlockDes>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
  
          <Block>
            <Row className="g-gs">
              <Col md="4">
                <div className="nk-order-ovwg-data sell">
                  <div className="amount">15</div>
                  <div className="info">
                    <strong>Total Apartment Listed</strong>
                  </div>
                </div>
              </Col>
  
              <Col md="4">
                <div className="nk-order-ovwg-data buy">
                  <div className="amount">9</div>
                  <div className="info">
                    <strong>Closed Transaction</strong>
                  </div>
                </div>
              </Col>
  
              <Col md="4">
                <div className="nk-order-ovwg-data sell">
                  <div className="amount">3</div>
                  <div className="info">
                    <strong>Declined</strong>
                  </div>
                </div>
              </Col>
            </Row>
          </Block>
  
          <Block>
            <Block>
            <ApartmentTable apartmentData={apartmentData}/>
            </Block>
          </Block>
        </Content>
      </Layout>
    );
};

export default ApartmentListing;