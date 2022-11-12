import { Formik, Field, Form } from "formik";
import { lgas } from '../../mock/lgas';
import { states } from '../../mock/state';
import { enlistLocationSchema } from "../../utils/formValidationSchema";
import { Row, Col, FormGroup, Button  } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { updateLocation, updateLocations } from '../../redux/slices/apartmentListingSlice';
import { useSelector } from 'react-redux';


const AgentRentLocation = ({props}) => {
    const dispatch = useDispatch()

    const location = useSelector((state) => state.apartmentListing?.location)
    const locations = useSelector((state) => state.apartmentListing?.locations)


      const handleSubmit = async (values) => {
        dispatch(updateLocation(values))
        props.next()
      };
    
      const   initialValues = {
        stateId: location?.stateId,
        locationId: location?.locationId,
        address: location?.address,
        contactPersonName: location?.contactPersonName,
        contactPersonPhoneNo: location?.contactPersonPhoneNo,
        contactPersonEmail: location?.contactPersonEmail
      }

    return (
      <Formik enableReinitialize initialValues={initialValues} validationSchema={enlistLocationSchema} onSubmit={(values) => handleSubmit(values)}>
        { ({errors,touched, setFieldValue}) => (
        <Form> 
        <Row className="gy-2">
          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="state">
                State
              </label>
              <div className="form-control-wrap">
                <Field
                as="select"
                  className="form-control form-select"
                  name="stateId"
                  // value={values?.stateId}
                  onChange={(e)=>{
                    const { value } = e.target;
                    const lga = lgas.filter((lga) => lga?.state_id === value)
                    setFieldValue("stateId", value);
                    dispatch(updateLocations(lga))
                  }}
                >
                  <option label="Select an option" selected="true" disabled="disabled"  value=""></option>
                  {states?.map((state) => (
                    <option label={state?.name} value={state?.id} key={state?.id} selected={state?.id === location?.stateId }></option>
                  ))}
                </Field>
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
                <Field as="select"
                  className="form-control form-select"
                  name="locationId" 
                >
                  <option label="Select an Option" selected="true" disabled="disabled" value=""></option>
                  {locations?.map((lga) => (
                    <option label={lga?.name} value={lga?.id} key={lga?.id} selected={lga?.id === location?.locationId }></option>
                  ))}
                </Field>
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
                <Field
                  type="text"
                  className="form-control"
                  name="address"
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
                <Field
                  type="text"
                  className="form-control"
                  name="contactPersonName"
                  placeholder="Landlord/Care-Taker's/Property Manager's name"
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
                <Field
                  type="text"
                  className="form-control"
                  name="contactPersonPhoneNo"
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
                <Field
                  type="text"
                  className="form-control"
                  name="contactPersonEmail"
                  placeholder="i.e Landlord, care-taker or facility manager contact"
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
            <Button color="primary" onClick={()=> {props.prev(); dispatch(updateLocation(ref?.current?.values))}}>
              Previous
            </Button>
          </li>
          </ul>
        </div>
      </Form>
       )}
      </Formik>
    );
};

export default AgentRentLocation;