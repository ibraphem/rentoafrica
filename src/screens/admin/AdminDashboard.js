import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../components/Component";
import Layout from "../../layout/Index";

const AdminDashboard = () => {
    return (
        <Layout>
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
      </Layout>
    );
};

export default AdminDashboard;