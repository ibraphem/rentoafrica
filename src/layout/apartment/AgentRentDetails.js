import { Row, Col, FormGroup, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateDetails } from "../../redux/slices/apartmentListingSlice";
import { propertyConditions, propertyTypes, furnishing, toilets } from "../../mock/apartments";
import { enlistDetailSchema } from "../../utils/formValidationSchema";

const AgentRentDetails = ({props}) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.apartmentListing?.details);

  const initialValues = {
    propertyName: details?.propertyName,
    propertyType: details?.propertyType,
    propertyCondition: details?.propertyCondition,
    furnishedStatus: details?.furnishedStatus,
    toilets: details?.toilets,
    propertyAmount: details?.propertyAmount,
    description: details?.description,
  };
  
    const handleSubmit = async (values) => {
      dispatch(updateDetails(values));
      props.next();
    };

  return (
    <Formik enableReinitialize initialValues={initialValues} validationSchema={enlistDetailSchema} onSubmit={(values) => handleSubmit(values)}>
      { ({errors,touched}) => (
      <Form>
        <Row className="gy-2">
          <Col md="6">
            <FormGroup>
            <label className="form-label" htmlFor="Property title">
              Title
            </label>
            <div className="form-control-wrap">
              <Field name="propertyName" type="text" className="form-control" placeholder="2 Bedroom Flat at Abule-Egba" />
              {errors.propertyName && touched.propertyName && <span className="invalid">{errors?.propertyName}</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
            <label className="form-label" htmlFor="Property type">
            Property Type
            </label>
            <div className="form-control-wrap">
              <Field
                name="propertyType"
                as="select"
                className="form-control form-select"
              >
                <option label="Select apartment type" selected="true" disabled="disabled" value=""></option>
                {propertyTypes?.map((apartment) => (
                  <option
                    label={apartment?.text}
                    value={apartment?.value}
                    key={apartment?.value}
                    selected={apartment?.value === details?.propertyType.toString()}
                  ></option>
                ))}
              </Field>
              {errors.propertyType && touched.propertyType && <span className="invalid">{errors.propertyType}</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="Property Condition">
              Condition
            </label>
            <div className="form-control-wrap">
            <Field
                name="propertyCondition"
                as="select"
                className="form-control form-select"
              >
                <option label="Select apartment Condition" selected="true" disabled="disabled" value=""></option>
                {propertyConditions?.map((apartment) => (
                  <option
                    label={apartment?.text}
                    key={apartment?.value}
                    value={apartment?.value}
                    selected={apartment?.value === details?.propertyCondition?.toString()}
                  ></option>
                ))}
              </Field>
              {errors.propertyCondition && touched.propertyCondition && (
                <span className="invalid">{errors?.propertyCondition}</span>
              )}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="Furnishing">
            Furnishing
            </label>
            <div className="form-control-wrap">
            <Field
                name="furnishedStatus"
                as="select"
                className="form-control form-select"
              >
                <option label="Select an option" value="" selected="true" disabled="disabled"></option>
                {furnishing?.map((apartment) => (
                  <option
                    label={apartment?.type}
                    value={apartment?.id}
                    key={apartment?.id}
                    selected={apartment?.id === details?.furnishedStatus?.toString()}
                  ></option>
                ))}
              </Field>
              {errors.furnishedStatus && touched.furnishedStatus && (
                <span className="invalid">{errors?.furnishedStatus}</span>
              )}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="toilets">
            Toilet/Bathroom
            </label>
            <div className="form-control-wrap">
            <Field
                name="toilets"
                as="select"
                className="form-control form-select"
              >
                 <option label="Select an option" value="" selected="true" disabled="disabled"></option>
                {toilets?.map((apartment) => (
                  <option
                    label={apartment?.type}
                    value={apartment?.id}
                    key={apartment?.id}
                    selected={apartment?.id === details?.toilets?.toString()}
                  ></option>
                ))}
              </Field>
              {errors.toilets && touched.toilets && <span className="invalid">{errors?.toilets}</span>}
              </div>
          </FormGroup>
        </Col>
        <Col md="6">
            <FormGroup>
            <label className="form-label" htmlFor="rent fee">
              Rent fee
            </label>
            <div className="form-control-wrap">
              <Field name="propertyAmount" type="text" className="form-control" />
              {errors.propertyAmount && touched.propertyAmount && (
                <span className="invalid">{errors?.propertyAmount}</span>
              )}
            </div>
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
            <label className="form-label" htmlFor="rent fee">
              Description
            </label>
            <div className="form-control-wrap">
            <Field component="textarea" className="form-control form-control-sm" name="description"></Field>
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
      </Form>
      )}
    </Formik>
  );
};

export default AgentRentDetails;
