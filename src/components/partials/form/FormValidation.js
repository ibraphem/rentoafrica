import {useState} from "react";
import classNames from "classnames";
import { Row, Col, FormGroup, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Component";
import { states } from "../../../mock/state";
import Dropzone from "react-dropzone";

const FormValidationComponent = ({ alter, id }) => {
  const { errors, register, handleSubmit } = useForm();
  const [files4, setFiles4] = useState([]);
  const onFormSubmit = (e) => {
    console.log(e)
  };
  const handleDropChange = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  return (
    <>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
        <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-type">
                Apartment Type
              </Label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    ref={register({
                      required: true,
                    })}
                    className="form-control form-select"
                    id="fv-type"
                    name="type"
                    placeholder="Select an apartment type"
                  >
                    <option label="Select an apartment type" value=""></option>
                    <option value="fv-gq">Mini Flat</option>
                    <option value="fv-tq">1 Bedroom Self contain</option>
                    <option value="fv-ab">2 Bedroom Flat</option>
                  </select>
                  {errors.type && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-state">
                State
              </Label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    ref={register({
                      required: true,
                    })}
                    className="form-control form-select"
                    id="fv-state"
                    name="state"
                    placeholder="Select State"
                  >
                    <option label="Select State" value=""></option>
                    {states?.map((state) => (
                      <option key={state?.id} label={state?.name} value={state?.id}></option>
                    ))}
                  </select>
                  {errors.state && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-state">
                LGA/Area/Location
              </Label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    ref={register({
                      required: true,
                    })}
                    className="form-control form-select"
                    id="fv-state"
                    name="state"
                    placeholder="Select State"
                  >
                    <option label="Select State" value=""></option>
                    {states?.map((state) => (
                      <option key={state?.id} label={state?.name} value={state?.id}></option>
                    ))}
                  </select>
                  {errors.state && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-type">
              No of Toilet/Bathroom 
              </Label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    ref={register({
                      required: true,
                    })}
                    className="form-control form-select"
                    id="fv-type"
                    name="type"
                    placeholder="No of Toilet/Bathroom"
                  >
                    <option label="Select No of Toilet/Bathroom" value=""></option>
                    <option value="fv-gq">1</option>
                    <option value="fv-tq">2</option>
                    <option value="fv-ab">3</option>
                    <option value="fv-gq">4</option>
                    <option value="fv-tq">5</option>
                    <option value="fv-ab">6</option>
                  </select>
                  {errors.type && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
                Address
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="fullname"
                  className="form-control"
                />
                {errors.fullname && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-email">
                Property Owner Phone Number
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="fv-email"
                  name="email"
                  className="form-control"
                />
                {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="invalid">{errors.email.message}</span>
                )}
              </div>
            </FormGroup>
          </Col>
       
          <Col md="6">
            <FormGroup>
              <Label className="form-label">Condition</Label>
              <ul className="custom-control-group g-3 align-center">
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      ref={register({
                        required: true,
                      })}
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={id + " fv-com-email"}
                      name="com"
                      value="email"
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-com-email"}>
                      New
                    </Label>
                    {errors.com && (
                      <span id="fv-com-error" className="invalid">
                        This field is required
                      </span>
                    )}
                  </div>
                </li>
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={id + " fv-com-sms"}
                      name="com"
                      value="sms"
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-com-sms"}>
                      Recently Renovated
                    </Label>
                  </div>
                </li>
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={id + " fv-com-phone"}
                      name="com"
                      value="phone"
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-com-phone"}>
                     Not New
                    </Label>
                  </div>
                </li>
              </ul>
            </FormGroup>
          </Col>

          <Col md="6">
            <FormGroup>
              <Label className="form-label">Furnitures</Label>
              <ul className="custom-control-group g-3 align-center">
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      ref={register({
                        required: true,
                      })}
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={id + " fv-com-email"}
                      name="com"
                      value="email"
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-com-email"}>
                      Furnished
                    </Label>
                    {errors.com && (
                      <span id="fv-com-error" className="invalid">
                        This field is required
                      </span>
                    )}
                  </div>
                </li>
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={id + " fv-com-sms"}
                      name="com"
                      value="sms"
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-com-sms"}>
                      Semi-Furnished
                    </Label>
                  </div>
                </li>
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={id + " fv-com-phone"}
                      name="com"
                      value="phone"
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-com-phone"}>
                     Not Furnished
                    </Label>
                  </div>
                </li>
              </ul>
            </FormGroup>
          </Col>
        
          <Col md="12">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-message">
                Description
              </Label>
              <div className="form-control-wrap">
                <textarea
                  ref={register({
                    required: true,
                  })}
                  type="textarea"
                  className="form-control form-control-sm"
                  id="fv-message"
                  name="message"
                  placeholder="Write your message"
                />
                {errors.message && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>

          <Col md="12">
                <label className="form-label">Dropzone Only Image Upload</label>
                <Dropzone
                  onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles4)}
                  accept={[".jpg", ".png", ".svg"]}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {files4.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button color="primary">SELECT</Button>
                          </div>
                        )}
                        {files4.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={file.preview} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Col>
         
          <Col md="12">
            <FormGroup>
              <Button color="primary" size="lg">
                Save Information
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default FormValidationComponent;
