import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../components/Component";



const AgentDashboard = () => {


  return (
    <>
      <Head title="DASHBOARD"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

      
      </Content>
    </>
  );
};

export default AgentDashboard;
