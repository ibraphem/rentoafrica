import { useEffect } from "react";
import Head from "../..//layout/head/Head";
import Content from "../../layout/content/Content";
import { Block, BlockHead, BlockHeadContent, BlockTitle, PreviewCard } from "../../components/Component";
import { Steps, Step } from "react-step-builder";
import AgentRentDetails from "../../layout/apartment/AgentRentDetails";
import AgentRentLocation from "../../layout/apartment/AgentRentLocation";
import AgentRentUploads from "../../layout/apartment/AgentRentUploads";
import { useParams } from "react-router";
import {  propertyDetail2 } from "../../services/propertyService";
import { useDispatch } from "react-redux";
import { overWritePropertyPhotos, updateDefaultPhoto, updateDetails, updateLocation, updatePropertyId } from "../../redux/slices/apartmentListingSlice";


const DetailsForm = (props) => {
  return <AgentRentDetails props={props} />;
};

const LocationForm = (props) => {
  return <AgentRentLocation props={props} />;
};

const ImagesUploadForm = (props) => {
  return <AgentRentUploads props={props} />;
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
  let params = useParams();
  let propertyId = params?.propertyId
  const dispatch = useDispatch()

  const extractValue = (arr, prop) => {
    let extractedValue = arr.map(item => item[prop]);
    return extractedValue;

}



    useEffect(() => {
      if(propertyId) {
        const fetchPropertyDetail = async() => {
          const res = (await propertyDetail2(propertyId))?.data?.result
          console.log(res);
          const details = {
            propertyName: res?.propertyName,
            propertyType: res?.propertyType,
            propertyCondition: res?.propertyCondition,
            furnishedStatus: res?.furnishedStatus,
            toilets: res?.toilets,
            propertyAmount: res?.propertyAmount,
            description: res?.description
          }

          const location = {
            stateId: res?.stateId,
            locationId: res?.locationId,
            address: res?.address,
            contactPersonName: res?.contactPersonName,
            contactPersonPhoneNo: res?.contactPersonPhoneNo,
            contactPersonEmail: res?.contactPersonEmail,
  
          }

          const propertyPhotos = extractValue(res?.propertyPhotos, 'photo')

          dispatch(updatePropertyId(propertyId))
          dispatch(updateDetails(details))
          dispatch(updateLocation(location))
          dispatch(updateDefaultPhoto(res?.defaultPhoto))
          dispatch(overWritePropertyPhotos(propertyPhotos))
        } 
  
        fetchPropertyDetail()
      }

      }, [propertyId, dispatch])

  return (
    <>
      <Head title="Add Apartment"/>
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">{propertyId?.length > 0 ? "Update  Apartment" : "Add  Apartment"}</BlockTitle>
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
