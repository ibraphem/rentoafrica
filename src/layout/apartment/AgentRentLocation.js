import {useState, useEffect} from 'react';
import { lgas } from '../../mock/lgas';
import { states } from '../../mock/state';
import { useFormik } from "formik";
import { enlistLocationSchema } from "../../utils/formValidationSchema";
import { Row, Col, FormGroup, Button  } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { updateLocation } from '../../redux/slices/apartmentListingSlice';


const AgentRentLocation = ({props}) => {
    const [allLGAs, setAllLGAs] = useState([])
    const dispatch = useDispatch()

      const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        dispatch(updateLocation())
        props.next()
      };
    
      const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
          state: "",
          area: "",
          address: "",
          phone: "",
        },
        validationSchema: enlistLocationSchema,
        onSubmit,
      });

      useEffect(() => {
        if(values?.state.length > 0) {
          const lga = lgas.filter((lga) => lga?.state_id === values?.state)
          setAllLGAs(lga)
        }
      }, [values?.state])
    

    return (
        <form className="content clearfix" onSubmit={ handleSubmit} autoComplete="off">
        <Row className="gy-2">
          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="first-name">
                State
              </label>
              <div className="form-control-wrap">
                <select
                  className="form-control form-select"
                  name="state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option label="Select apartment type" value=""></option>
                  {states?.map((state) => (
                    <option label={state?.name} value={state?.id} key={state?.id}></option>
                  ))}
                </select>
                {errors.state  && touched.state && <span className="invalid">{errors.state}</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="last-name">
                LGA/Area
              </label>
              <div className="form-control-wrap">
                <select
                  className="form-control form-select"
                  name="area" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option label="Select an Option" value=""></option>
                  {allLGAs?.map((lga) => (
                    <option label={lga?.name} value={lga?.id} key={lga?.id}></option>
                  ))}
                </select>
                {errors.area && touched.area  && <span className="invalid">{errors?.area}</span>}
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
                />
                {errors.address && touched.address &&  <span className="invalid">{errors?.address}</span>}
              </div>
            </FormGroup>
          </Col>

          <Col md="6">
            <FormGroup>
              <label className="form-label" htmlFor="city">
                Contact Phone Number
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="i.e Landlord, care-taker or facility manager contact"
                />
                {errors.phone && touched.phone &&  <span className="invalid">{errors?.phone}</span>}
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