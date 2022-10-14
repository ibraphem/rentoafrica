import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaPhone,
  FaRegEnvelope,
  FaLock,
  FaUser,
  FaUniversity,
  FaExternalLinkAlt,
  FaStickyNote,
  FaAddressCard,
  FaNetworkWired,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import "../assets/css/publicStyles/auth.css";
import { useFormik } from "formik";
import { corporateSignupSchema, passwordValidationSchema } from "../utils/formValidationSchema";
import { setAlertModal, setLoader } from "../redux/slices/modalSlice";
import { onboardCorporate } from "../services/onboardingService";
import { useDispatch } from "react-redux";
import { aesEncryption } from "../utils/encrypt";
import PublicHeader from "../layout/header/PublicHeader";
import { states } from "../mock/state";

const CorporateRegister = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const onSubmit = async (values, { resetForm }) => {
    if(step === 1) {
      setStep(2)
      return
    }
    console.log(values);
    dispatch(setLoader({ status: true }));
    const body = {
      email: values.email,
      phoneNo: values.phoneNo,
      profileName: values?.name,
      password: aesEncryption(values?.password),
      website: values?.website,
      cacNumber: values?.cacRegNo,
      address: values?.address,
      stateId: Number(values?.stateId),
      industryType: Number(values?.industryType)
    };

    let res = (await onboardCorporate(body))?.data;

    dispatch(setLoader({ status: false }));
    if (res) {
      dispatch(setAlertModal({ status: true, type: res?.status ? "success" : "failed", message: res?.message }));
      res?.status && resetForm({ values: "" });
    } else {
      dispatch(
        setAlertModal({ status: true, type: "failed", message: "OOPS, Something went wrong. Please try again" })
      );
    }

    setStep(1)
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      phoneNo: "",
      email: "",
      cacRegNo: "",
      website: "",
      stateId: "",
      address: "",
      industryType: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: step === 1 ? corporateSignupSchema : passwordValidationSchema,
    onSubmit,
  });

  return (
    <>
      <PublicHeader />
      <section className="gauto-login-area section_70">
        <Container>
          <div className="register-box login-box">
            <div className="login-page-heading">
              <h3> {step === 1 ? "Register" : <span onClick={() => setStep(1)}><FaArrowAltCircleLeft/> Go Back</span>}</h3>
            </div>

            <form onSubmit={ handleSubmit} autoComplete="off">
              <Row>
                {step === 1 ? (
                  <>
                    <Col lg={6}>
                      {errors.name && touched.name && <strong className="text-danger">{errors.name}</strong>}
                      <div className="account-form-group">
                        <input
                          value={values.name}
                          onChange={handleChange}
                          id="name"
                          type="name"
                          placeholder="Enter Company Name"
                          onBlur={handleBlur}
                          className={errors.name && touched.name ? "input-error" : ""}
                        />
                        <FaUser />
                      </div>

                      {errors.phoneNo && touched.phoneNo && <strong className="text-danger">{errors.phoneNo}</strong>}
                      <div className="account-form-group">
                        <input
                          value={values.phoneNo}
                          onChange={handleChange}
                          id="phoneNo"
                          type="phoneNo"
                          placeholder="Enter Phone Number"
                          onBlur={handleBlur}
                          // className={errors.email && touched.email ? "input-error" : ""}
                        />
                        <FaPhone />
                      </div>

                      {errors.email && touched.email && <strong className="text-danger">{errors.email}</strong>}
                      <div className="account-form-group">
                        <input
                          value={values.email}
                          onChange={handleChange}
                          id="email"
                          type="email"
                          placeholder="Enter Email"
                          onBlur={handleBlur}
                          className={errors.email && touched.email ? "input-error" : ""}
                        />
                        <FaRegEnvelope />
                      </div>

                      {errors.cacRegNo && touched.cacRegNo && (
                        <strong className="text-danger">{errors.cacRegNo}</strong>
                      )}
                      <div className="account-form-group">
                        <input
                          value={values.cacRegNo}
                          onChange={handleChange}
                          id="cacRegNo"
                          name="cacRegNo"
                          type="text"
                          placeholder="Enter CAC Reg. Mumber"
                          onBlur={handleBlur}
                          className={errors.cacRegNo && touched.cacRegNo ? "input-error" : ""}
                        />
                        <FaUniversity />
                      </div>
                    </Col>
                    <Col lg={6}>
                      {errors.website && touched.website && <strong className="text-danger">{errors.website}</strong>}
                      <div className="account-form-group">
                        <input
                          value={values.website}
                          onChange={handleChange}
                          id="website"
                          type="text"
                          placeholder="Enter website"
                          onBlur={handleBlur}
                          className={errors.website && touched.website ? "input-error" : ""}
                        />
                        <FaExternalLinkAlt />
                      </div>
                      {errors.stateId && touched.stateId && <strong className="text-danger">{errors.stateId}</strong>}
                      <div className="account-form-group">
                        <select
                          name="stateId"
                          onChange={handleChange}
                          placeholder="Select State"
                          onBlur={handleBlur}
                          className={errors.stateId && touched.stateId ? "input-error" : ""}
                        >
                          <option value="">Select State</option>
                          {states?.map((state) => (
                            <option value={state?.id} key={state?.id}>
                              {state?.name}
                            </option>
                          ))}
                        </select>
                        <FaStickyNote />
                      </div>

                      {errors.address && touched.address && <strong className="text-danger">{errors.address}</strong>}
                      <div className="account-form-group">
                        <input
                          value={values.address}
                          onChange={handleChange}
                          id="address"
                          type="text"
                          placeholder="Enter Address"
                          onBlur={handleBlur}
                          className={errors.address && touched.address ? "input-error" : ""}
                        />
                        <FaAddressCard />
                      </div>

                      {errors.industryType && touched.industryType && (
                        <strong className="text-danger">{errors.industryType}</strong>
                      )}
                      <div className="account-form-group">
                        <select
                          name="industryType"
                          onChange={handleChange}
                          placeholder="Select Industry Type"
                          onBlur={handleBlur}
                          className={errors.industryType && touched.industryType ? "input-error" : ""}
                        >
                          <option value="">Select Industry Type</option>
                          <option value="1">Health/Medicine</option>
                          <option value="2">Information Technology</option>
                          <option value="3">Others</option>
                        </select>
                        <FaNetworkWired />
                      </div>
                    </Col>
                  </>
                ) : (
                  <>
                  <h6 className="mb-3">Create your password to complete Sign Up</h6>
                  <Col lg={6}>
                    
                    {errors.password && touched.password && <strong className="text-danger">{errors.password}</strong>}
                    <div className="account-form-group">
                      <input
                        id="password"
                        type="password"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password ? "input-error" : ""}
                      />
                      <FaLock />
                    </div>
                  </Col>
                  <Col lg={6}>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <strong className="text-danger">{errors.confirmPassword}</strong>
                  )}
                <div className="account-form-group">
                 
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "input-error"
                        : ""
                    }
                  />
                  <FaLock />
                </div>
                  </Col>
                  </>
                )}
              </Row>
              <p>
                <button type="submit" className="gauto-theme-btn">
                  {step === 1 ? <>Continue <FaArrowAltCircleRight/></> : "Complete Onboarding"}
                </button>
              </p>
            </form>

            <div className="login-sign-up">
              <Link to="/login">Have an account? Sign In</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CorporateRegister;
