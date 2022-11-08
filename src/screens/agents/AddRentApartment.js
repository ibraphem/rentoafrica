import Head from "../..//layout/head/Head";
import Content from "../../layout/content/Content";
import { Block, BlockHead, BlockHeadContent, BlockDes, BlockTitle, PreviewCard } from "../../components/Component";
import { Steps, Step } from "react-step-builder";
import AgentRentDetails from "../../layout/apartment/AgentRentDetails";
import AgentRentLocation from "../../layout/apartment/AgentRentLocation";
import AgentRentUploads from "../../layout/apartment/AgentRentUploads";
import { Button } from "reactstrap";

const DetailsForm = (props) => {
  return <AgentRentDetails props={props} />;
};

const LocationForm = (props) => {
  return <AgentRentLocation props={props} />;
};

const ImagesUploadForm = (props) => {
  return <AgentRentUploads props={props} />;
};

const Success = (props) => {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center p-3">
      <BlockTitle tag="h6" className="text-center">
        Thank you for enlisting a rent property on RENTO. We will verify this apartment and get back to you.
      </BlockTitle>
    </div>
    <div className="mt-3" style={{textAlign:"center"}}>
     <Button color="primary" type="submit">
     Enlist A new apartment
   </Button>
   </div>
   </>
  );
};

const Header = (props) => {
  return (
    <div className="steps clearfix">
      <ul>
        <li className={props.current >= 1 ? "first done" : "first"}>
          <a href="#wizard-01-h-0" onClick={(ev) => ev.preventDefault()}>
            <span className="number">01</span> <h5>Details</h5>
          </a>
        </li>
        <li className={props.current >= 2 ? "done" : ""}>
          <a href="#wizard-01-h-1" onClick={(ev) => ev.preventDefault()}>
            <span className="number">02</span> <h5>Location</h5>
          </a>
        </li>
        <li className={props.current >= 3 ? "done" : ""}>
          <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
            <span className="current-info audible">current step: </span>
            <span className="number">03</span> <h5>Uploads</h5>
          </a>
        </li>
      </ul>
    </div>
  );
};

const config = {
  before: Header,
};

const AddRentApartment = () => {
  return (
    <>
      <Head title="Add rent apartment" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Apartment</BlockTitle>
              {/* <p>A basic demonstration of wizard form basic.</p> */}
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
              <Steps config={config}>
                <Step component={DetailsForm} />
                <Step component={LocationForm} />
                <Step component={ImagesUploadForm} />
                
              </Steps>
            </div>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default AddRentApartment;
