import { useState } from "react";
import Dropzone from "react-dropzone";
import { Col, Row, Button } from "reactstrap";
import { fileToBase64 } from "../../utils/format";


const AgentRentUploads = ({props}) => {
  const [otherImages, setOtherImages] = useState([]);
  const [profileImg, setProfileImg] = useState("")

  const handleImage = (acceptedFiles) => {
    // console.log(acceptedFiles[0].name);

    for (let i = 0; i < acceptedFiles?.length; i++) {
      fileToBase64(acceptedFiles[i], async (base64String, fileName) => {
        setOtherImages((otherImages) => [...otherImages, base64String]);
      });
    }
  };

  const handleProfileImg = (acceptedFiles) => {
    fileToBase64(acceptedFiles[0], async (base64String, fileName) => {
        // console.log(base64String);
        setProfileImg(base64String);
      });
  } 

  const submitListing = () => {
   
  }

  // const remove = (file) => {
  //   console.log(file);
  //   let images = [...otherImages];
  //   const res = images?.filter((image) => image != file);
  //   console.log(res);
  //   setOtherImages(res);
  // };

  //   console.log(otherImages);
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
                  {profileImg.length === 0 && (
                    <div className="dz-message">
                      <span className="dz-message-text">Drag and drop file</span>
                      <span className="dz-message-or">or</span>
                      <Button color="info">SELECT</Button>
                    </div>
                  )}
                
                    <div className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                      <div className="dz-image">
                        {profileImg !== "" && (
                            <img src={profileImg} alt="preview" />
                        )}
                      
                      </div>
                    </div>
              
                </div>
              </section>
            )}
          </Dropzone>
        </Col>
        <Col sm="12">
          <label className="form-label">Apartment Images</label>
          <Dropzone onDrop={(acceptedFiles) => handleImage(acceptedFiles)} accept={[".jpg", ".png"]}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                  <input {...getInputProps()} />
                  {otherImages.length === 0 && (
                    <div className="dz-message">
                      <span className="dz-message-text">You may drag or select between 5 to 20 images</span>
                      <span className="dz-message-or">or</span>
                      <Button color="warning">SELECT</Button>
                    </div>
                  )}
                  {otherImages.map((file, index) => (
                    <div key={file} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                      <div className="dz-image">
                        <img src={file} alt="preview" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </Dropzone>
        </Col>
      </Row>
      <div className="actions clearfix">
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
