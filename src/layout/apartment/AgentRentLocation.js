import {useState, useEffect} from 'react';
import { lgas } from '../../mock/lgas';
import { states } from '../../mock/state';
import { useFormik } from "formik";
import { enlistLocationSchema } from "../../utils/formValidationSchema";
import { Row, Col, FormGroup, Button  } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { updateLocation, updateLocations } from '../../redux/slices/apartmentListingSlice';
import { useSelector } from 'react-redux';


const AgentRentLocation = ({props}) => {
    const dispatch = useDispatch()
    const location = useSelector((state) => state.apartmentListing?.location)
    const locations = useSelector((state) => state.apartmentListing?.locations)

    console.log(location);

      const onSubmit = async (values) => {
        console.log(values);
        dispatch(updateLocation(values))
        props.next()
      };
    
      const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
          stateId: location?.stateId,
          locationId: location?.locationId,
          address: location?.address,
          contactPersonName: location?.contactPersonName,
          contactPersonPhoneNo: location?.contactPersonPhoneNo,
          contactPersonEmail: location?.contactPersonEmail
        },
        validationSchema: enlistLocationSchema,
        onSubmit,
      });

      useEffect(() => {
        if(values?.stateId?.length > 0) {
          const lga = lgas.filter((lga) => lga?.state_id === values?.stateId)
          dispatch(updateLocations(lga))
        }
      }, [values?.stateId, dispatch])

      // console.log(values);
    

    return (
        <form className="content clearfix" onSubmit={ handleSubmit} autoComplete="off"> 
        <Row className="gy-2">
          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="state">
                State
              </label>
              <div className="form-control-wrap">
                <select
                  className="form-control form-select"
                  name="stateId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option label="Select an option" selected="true" disabled="disabled"  value=""></option>
                  {states?.map((state) => (
                    <option label={state?.name} value={state?.id} key={state?.id} selected={state?.id === location?.stateId }></option>
                  ))}
                </select>
                {errors.stateId  && touched.stateId && <span className="invalid">{errors.stateId}</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="locationId">
                Location
              </label>
              <div className="form-control-wrap">
                <select
                  className="form-control form-select"
                  name="locationId" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option label="Select an Option" selected="true" disabled="disabled" value=""></option>
                  {locations?.map((lga) => (
                    <option label={lga?.name} value={lga?.id} key={lga?.id} selected={lga?.id === location?.locationId }></option>
                  ))}
                </select>
                {errors.locationId && touched.locationId  && <span className="invalid">{errors?.locationId}</span>}
              </div>
            </FormGroup>
          </Col>
       
          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="city">
                Full Address
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter detailed address"
                  defaultValue={location?.address}
                />
                {errors.address && touched.address &&  <span className="invalid">{errors?.address}</span>}
              </div>
            </FormGroup>
          </Col>

          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="city">
                Contact Person Name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  className="form-control"
                  name="contactPersonName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Landlord/Care-Taker's/Property Manager's name"
                  defaultValue={location?.contactPersonName}
                />
                {errors.contactPersonName && touched.contactPersonName &&  <span className="invalid">{errors?.contactPersonName}</span>}
              </div>
            </FormGroup>
          </Col>

          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="city">
                Contact Person Phone Number
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  className="form-control"
                  name="contactPersonPhoneNo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={location?.contactPersonPhoneNo}
                  placeholder="i.e Landlord, care-taker or facility manager contact"
                />
                {errors.contactPersonPhoneNo && touched.contactPersonPhoneNo &&  <span className="invalid">{errors?.contactPersonPhoneNo}</span>}
              </div>
            </FormGroup>
          </Col>

          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="city">
                Contact Person Email (Optional)
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  className="form-control"
                  name="contactPersonEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="i.e Landlord, care-taker or facility manager contact"
                  defaultValue={location?.contactPersonEmail}
                />
                {errors.contactPersonEmail && touched.contactPersonEmail &&  <span className="invalid">{errors?.contactPersonEmail}</span>}
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
            <li>
            <Button color="primary" onClick={props.prev}>
              Previous
            </Button>
          </li>
          </ul>
        </div>
      </form>
    );
};

export default AgentRentLocation;