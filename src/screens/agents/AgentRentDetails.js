import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { propertyDetail2 } from "../../services/propertyService";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../components/Component";
import Rent from "../../layout/apartment/Rent";

const AgentRentDetails = () => {
  const [data, setData] = useState({})

  let params = useParams();
  let propertyId = params?.propertyId

  useEffect(() => {
    const fetchPropertyDetail = async() => {
      const res = (await propertyDetail2(propertyId))?.data
      setData(res?.result)
    }

    fetchPropertyDetail()
    }, [propertyId])

    return (
        <>
        <Head title="Details"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Details
                </BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

        <Block>
        <Rent rentDataDetail={data} propertyId={propertyId} otherDetails={true}/>
        </Block>
        
        </Content>
      </>
    );
};

export default AgentRentDetails;