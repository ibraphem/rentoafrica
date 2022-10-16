import React from "react";

const AgentRentDetails = () => {
  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      propertyType: "",
      propertyCondition: "",
      propertyStatus: "",
      propertyNoOfToilet: "",
      rentFee: "",
      rentFeeUnit: "",
      description: "",
    },
    validationSchema: step === 1 ? corporateSignupSchema : passwordValidationSchema,
    onSubmit,
  });

  return (
    <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
      <Row className="gy-2">
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="first-name">
              Property Type
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select">
                <option label="Select apartment type" value=""></option>
                {apartments?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.firstName && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="last-name">
              Condition
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select">
                <option label="Select apartment condition" value=""></option>
                {apartmentCondion?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.lastName && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="email">
              Furnishing
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select">
                <option label="Select an option" value=""></option>
                {furnishing?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.email && errors.email.type === "required" && (
                <span className="invalid">This field is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="invalid">{errors.email.message}</span>
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
              <select className="form-control form-select">
                <option label="Select an option" value=""></option>
                {toilets?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.phone && <span className="invalid">This field is required</span>}
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
                id="city"
                className="form-control"
                ref={register({ required: true })}
                name="city"
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.city}
              />
              {errors.city && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Rent Fee Unit
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select">
                <option label="Select an option" value=""></option>
                {rentFeeUnit?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.city && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>

        <Col md="12">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Description
            </label>
            <div className="form-control-wrap">
              <textarea type="textarea" className="form-control form-control-sm" placeholder="Write your description" />
              {errors.city && <span className="invalid">This field is required</span>}
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
