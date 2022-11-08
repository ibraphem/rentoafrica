import { useFormik } from "formik";
import React from "react";
import { enlistDetailSchema } from "../../utils/formValidationSchema";
import { Row, Col, FormGroup, Button } from "react-bootstrap";
import { propertyConditions, propertyTypes, furnishing, toilets } from "../../mock/apartments";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../redux/slices/apartmentListingSlice";
import { useSelector } from "react-redux";

const AgentRentDetails = ({ props }) => {
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    console.log(values);
    dispatch(updateDetails(values));
    props.next();
  };

  const details = useSelector((state) => state.apartmentListing?.details);

  // console.log(details);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      propertyName: details?.propertyName,
      propertyType: details?.propertyType,
      propertyCondition: details?.propertyCondition,
      furnishedStatus: details?.furnishedStatus,
      toilets: details?.toilets,
      propertyAmount: details?.propertyAmount,
      description: details?.description,
    },
    validationSchema: enlistDetailSchema,
    onSubmit,
  });

  return (
    <form className="content clearfix" onSubmit={handleSubmit} autoComplete="off">
      <Row className="gy-2">
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Title
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                id="propertyName"
                className="form-control"
                placeholder="2 Bedroom Flat at Abule-Egba"
                name="propertyName"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={details?.propertyName}
              />
              {errors.propertyName && touched.propertyName && <span className="invalid">{errors?.propertyName}</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="first-name">
              Property Type
            </label>
            <div className="form-control-wrap">
              <select
                className="form-control form-select"
                name="propertyType"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option label="Select apartment type" selected="true" disabled="disabled" value=""></option>
                {propertyTypes?.map((apartment) => (
                  <option
                    label={apartment?.text}
                    value={apartment?.value}
                    key={apartment?.value}
                    selected={apartment?.value === details?.propertyType}
                  ></option>
                ))}
              </select>
              {errors.propertyType && touched.propertyType && <span className="invalid">{errors.propertyType}</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="last-name">
              Condition
            </label>
            <div className="form-control-wrap">
              <select
                className="form-control form-select"
                name="propertyCondition"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option label="Select apartment condition" selected="true" disabled="disabled" value=""></option>
                {propertyConditions?.map((apartment) => (
                  <option
                    label={apartment?.text}
                    key={apartment?.value}
                    value={apartment?.value}
                    selected={apartment?.value === details?.propertyCondition}
                  ></option>
                ))}
              </select>
              {errors.propertyCondition && touched.propertyCondition && (
                <span className="invalid">{errors?.propertyCondition}</span>
              )}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="email">
              Furnishing
            </label>
            <div className="form-control-wrap">
              <select
                className="form-control form-select"
                name="furnishedStatus"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option label="Select an option" value="" selected="true" disabled="disabled"></option>
                {furnishing?.map((apartment) => (
                  <option
                    label={apartment?.type}
                    value={apartment?.id}
                    key={apartment?.id}
                    selected={apartment?.id === details?.furnishedStatus}
                  ></option>
                ))}
              </select>
              {errors.furnishedStatus && touched.furnishedStatus && (
                <span className="invalid">{errors?.furnishedStatus}</span>
              )}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="phone-no">
              No of Toilet/Bathroom
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select" name="toilets" onChange={handleChange} onBlur={handleBlur}>
                <option label="Select an option" value="" selected="true" disabled="disabled"></option>
                {toilets?.map((apartment) => (
                  <option
                    label={apartment?.type}
                    value={apartment?.id}
                    key={apartment?.id}
                    selected={apartment?.id === details?.toilets}
                  ></option>
                ))}
              </select>
              {errors.toilets && touched.toilets && <span className="invalid">{errors?.toilets}</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Rent Fee
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                id="propertyAmount"
                className="form-control"
                name="propertyAmount"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={details?.propertyAmount}
              />
              {errors.propertyAmount && touched.propertyAmount && (
                <span className="invalid">{errors?.propertyAmount}</span>
              )}
            </div>
          </FormGroup>
        </Col>

        <Col md="12">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Description
            </label>
            <div className="form-control-wrap">
              <textarea
                type="textarea"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={details?.description}
                id="description"
                className="form-control form-control-sm"
                name="description"
                placeholder="Write your description"
              />
              {errors.description && touched.description && <span className="invalid">{errors?.description}</span>}
            </div>
          </FormGroup>
        </Col>
      </Row>
      <div className="actions clearfix">
        <ul>
          <li>
            <Button color="primary" type="submit">
              Next
            </Button>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default AgentRentDetails;
