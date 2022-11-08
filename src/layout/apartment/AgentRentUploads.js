import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { removePropertyPhoto, updateDefaultPhoto, updateDetails, updateLocation, updatePropertyPhotos } from "../../redux/slices/apartmentListingSlice";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import { createProperty } from "../../services/propertyService";
import {  formatImage } from "../../utils/format";

const AgentRentUploads = ({ props }) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.apartmentListing?.details)
  const location = useSelector((state) => state.apartmentListing?.location)
  const defaultPhoto = useSelector((state) => state.apartmentListing?.defaultPhoto);
  const propertyPhotos = useSelector((state) => state.apartmentListing?.propertyPhotos);


  const handleProfileImg = (acceptedFiles) => {
    formatImage(acceptedFiles[0], async (uri) => {
      dispatch(updateDefaultPhoto(uri))
    });
  };
 
  const handleImage = (acceptedFiles) => {
    for (let i = 0; i < acceptedFiles?.length; i++) {
      formatImage(acceptedFiles[i], async (uri) => {
        dispatch(updatePropertyPhotos(uri))
      });
    }
  };

  const submitListing = async() => {
    dispatch(setLoader({status: true}))
    if (defaultPhoto === "") {
      dispatch(setAlertModal({ status: true, type: "failed", message: "Uploading apartment Cover Image is required" }));
      dispatch(setLoader({status: false}))
      return;
    }
    if (propertyPhotos?.length < 5 || propertyPhotos?.length > 20) {
      dispatch(
        setAlertModal({
          status: true,
          type: "failed",
          message: "Other Apartment Images must not be less than 5 or greater than 20",
        })
      );
      dispatch(setLoader({status: false}))
      return;
    }

    const payload = {
      propertyName: details?.propertyName,
      propertyAmount: Number(details?.propertyAmount),
      description: details?.description,
      propertyType: Number(details?.propertyType),
      propertyCondition: Number(details?.propertyCondition),
      furnishedStatus: Number(details?.furnishedStatus),
      contactPersonName: location?.contactPersonName,
      contactPersonPhoneNo: location?.contactPersonPhoneNo,
      contactPersonEmail: location?.contactPersonEmail,
      address: location?.address,
      locationId: Number(location?.locationId),
      toilets: Number(details?.toilets),
      defaultPhoto: defaultPhoto,
      propertyPhotos: propertyPhotos
    }


    const res = (await createProperty(payload))?.data
    console.log(res);

    dispatch(setLoader({status: false}))
    if(res) {
      dispatch(setAlertModal({status: true, type: res?.status ? "success" : "failed", message: res?.message}))
      if(res?.status){
        dispatch(updateDetails({}))
        dispatch(updateLocation({}))
        dispatch(updateDefaultPhoto(""))
        dispatch(updatePropertyPhotos([]))
        props.jump(1)
        
     
      }
      
    }else {
      dispatch(setAlertModal({status: true, type:"failed", message: "OOPS, Something went wrong. Please try again"}))
    }
  };



  return (
    <>
      <Row className="gy-2">
        <Col sm="12">
          <label className="form-label">Upload Apartment cover Image</label>
          <Dropzone onDrop={(acceptedFiles) => handleProfileImg(acceptedFiles)} accept={[".jpg", ".png"]} maxFiles={1}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                  <input {...getInputProps()} />
                  {defaultPhoto.length === 0 && (
                    <div className="dz-message">
                      <span className="dz-message-text">Drag and drop file</span>
                      <span className="dz-message-or">or</span>
                      <Button color="info">SELECT</Button>
                    </div>
                  )}
                  {defaultPhoto !== "" && (
                    <Col md="12">
                      <div className="preview-block">
                        <div className="custom-control custom-checkbox image-control">
                          <label
                            className="icon ni ni-cross-round-fill"
                            htmlFor="imageCheck1"
                            style={{ fontSize: 25, color: "red" }}
                          >
                            {" "}
                          </label>
                          {defaultPhoto !== "" && <img src={defaultPhoto} alt="Default Photo" />}
                        </div>
                      </div>
                    </Col>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </Col>
        <Col sm="12">
          <label className="form-label">Upload Apartment other Images</label>
          <Dropzone onDrop={(acceptedFiles) => handleImage(acceptedFiles)} accept={[".jpg", ".png"]}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                  <input {...getInputProps()} />

                  <div className="dz-message">
                    <span className="dz-message-text">You may drag or select between 5 to 20 images</span>
                    <span className="dz-message-or">or</span>
                    <Button color="warning">SELECT</Button>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          <Row className="g-3 mb-3">
            {propertyPhotos.map((file, index) => (
              <Col md="3" className="col-6" key={index}>
                <div className="preview-block mx-3">
                  <div className="custom-control custom-checkbox image-control" style={{ fontSize: 25, color: "red" }}>
                    <label
                      className="icon ni ni-cross-round-fill"
                      onClick={() => dispatch(removePropertyPhoto(file))}
                      htmlFor="imageCheck1"
                    >
                      {" "}
                    </label>
                    <img src={file} alt="apartment images" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <div className="actions clearfix mt-3">
        <ul>
          <li>
            <Button color="primary" type="submit" onClick={submitListing}>
              Submit
            </Button>
          </li>
          <li>
            <Button color="primary" onClick={props.prev}>
              Previous
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AgentRentUploads;
