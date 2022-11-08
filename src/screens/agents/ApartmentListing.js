import { useEffect } from "react";
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
import ApartmentTable from "../../shared/ApartmentTable";
import { useDispatch } from "react-redux";
import { getAgentProperties, updatePagination, updateSearchTerm } from "../../redux/slices/agentPropertySlice";
import { useSelector } from "react-redux";

const ApartmentListing = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.agentProperties)
  const params = data?.params
  const result = data?.properties?.data?.result

  const paginate = (pageNumber) => dispatch(updatePagination(pageNumber));

  useEffect(() => {
   dispatch(getAgentProperties())
  }, [params, dispatch])

  const search = (searchTerm) => {
    if(searchTerm === ""){
      dispatch(updateSearchTerm(null))
    }else{
      dispatch(updateSearchTerm(searchTerm))
    }
    
  }
  
    return (
        <>
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
            <ApartmentTable apartmentData={result?.data} loading={data?.loading} search={search} itemPerPage={params?.pageSize} currentItemsLength={result?.data?.length} dataLength={result?.pagination?.rowCount} paginate={paginate} currentPage={result?.pagination?.currentPage}/>
            </Block>
          </Block>
        </Content>
      </>
    );
};

export default ApartmentListing;