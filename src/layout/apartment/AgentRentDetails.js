import { useFormik } from "formik";
import React from "react";
import { enlistDetailSchema } from "../../utils/formValidationSchema";
import { Row, Col, FormGroup, Button  } from "react-bootstrap";
import { apartmentCondion, apartments, furnishing, rentFeeUnit, toilets } from "../../mock/apartments";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../redux/slices/apartmentListingSlice";
import { useSelector } from "react-redux";

const AgentRentDetails = ({props}) => {
  const dispatch = useDispatch()
  const onSubmit = async (values) => {
    console.log(values);
    dispatch(updateDetails(values))
    props.next()
  };

  const details = useSelector((state) => state.apartmentListing?.details)

  console.log(details);

  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      propertyType: details?.propertyType,
      propertyCondition: details?.propertyCondition,
      furnishing: details?.furnishing,
      propertyNoOfToilet: details?.propertyNoOfToilet,
      rentFee: details?.rentFee,
      rentFeeUnit: details?.rentFeeUnit,
      description: details?.description,
    },
    validationSchema: enlistDetailSchema,
    onSubmit,
  });



  return (
    <form className="content clearfix" onSubmit={ handleSubmit} autoComplete="off">
      <Row className="gy-2">
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
                {apartments?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id} key={apartment?.id} selected={apartment?.id === details?.propertyType }></option>
                ))}
              </select>
              {errors.propertyType  && touched.propertyType && <span className="invalid">{errors.propertyType}</span>}
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
                {apartmentCondion?.map((apartment) => (
                  <option label={apartment?.type} key={apartment?.id} value={apartment?.id} selected={apartment?.id === details?.propertyCondition }></option>
                ))}
              </select>
              {errors.propertyCondition && touched.propertyCondition  && <span className="invalid">{errors?.propertyCondition}</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="email">
              Furnishing
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select" name="furnishing" onChange={handleChange} onBlur={handleBlur}>
                <option label="Select an option" value="" selected="true" disabled="disabled"></option>
                {furnishing?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id} key={apartment?.id} selected={apartment?.id === details?.furnishing}></option>
                ))}
              </select>
              {errors.furnishing && touched.furnishing && <span className="invalid">{errors?.furnishing}</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="phone-no">
              No of Toilet/Bathroom
            </label>
            <div className="form-control-wrap">
              <select
                className="form-control form-select"
                name="propertyNoOfToilet"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option label="Select an option" value="" selected="true" disabled="disabled"></option>
                {toilets?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id} key={apartment?.id} selected={apartment?.id === details?.propertyNoOfToilet}></option>
                ))}
              </select>
              {errors.propertyNoOfToilet && touched.propertyNoOfToilet && <span className="invalid">{errors?.propertyNoOfToilet}</span>}
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
                id="rentFee"
                className="form-control"
                name="rentFee"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={details?.rentFee}
              />
              {errors.rentFee && touched.rentFee &&  <span className="invalid">{errors?.rentFee}</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Rent Fee Unit
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select" name="rentFeeUnit" onChange={handleChange}
                onBlur={handleBlur}>
                <option label="Select an option" value="" selected="true" disabled="disabled"></option>
                {rentFeeUnit?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id} selected={apartment?.id === details?.rentFeeUnit}></option>
                ))}
              </select>
              {errors.rentFeeUnit && touched.rentFeeUnit && <span className="invalid">{errors?.rentFeeUnit}</span>}
            </div>
          </FormGroup>
        </Col>

        <Col md="12">
          <FormGroup>
            <label className="form-label" htmlFor="city"> 
              Description
            </label>
            <div className="form-control-wrap">
              <textarea type="textarea"  onChange={handleChange}
                onBlur={handleBlur} defaultValue={details?.description} id="description" className="form-control form-control-sm" name="description" placeholder="Write your description" />
           
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
