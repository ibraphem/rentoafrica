import { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../components/Component";
import Layout from "../../layout/Index";
import ApartmentTable from "../../shared/ApartmentTable";
import { useParams } from "react-router";
import { apartmentData } from "../../mock/apartments";


const Apartments = () => {
const [houses, setHouses] = useState([])
  let params = useParams();
  let status = params?.status



  useEffect(() => {
    const res = apartmentData?.filter((apartment) => apartment?.status.toLowerCase() === status.toLowerCase())
    setHouses(res)
  }, [status])
  


    
    return (
        <Layout>
        <Head title="DASHBOARD"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  {status.toUpperCase()} APARTMENTS
                </BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <Block>
            <Block>
            <ApartmentTable apartmentData={houses}/>
            </Block>
          </Block>
        </Content>
      </Layout>
    );
};

export default Apartments;