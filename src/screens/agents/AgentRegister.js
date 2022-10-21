import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhone, FaRegEnvelope, FaLock, FaUser } from "react-icons/fa";
import "../../assets/css/publicStyles/auth.css";
import { useFormik } from "formik";
import { signupSchema } from "../../utils/formValidationSchema";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import { onboardAgent } from "../../services/onboardingService";
import { useDispatch } from "react-redux";
import { aesEncryption } from "../../utils/encrypt";
import PublicHeader from "../../layout/header/PublicHeader";

const AgentRegister = () => {

  const dispatch = useDispatch()
  const onSubmit = async (values, {resetForm}) => {
    
    dispatch(setLoader({status: true}))
    const body = {
      email: values.email,
      phoneNo: values.phoneNo,
      profileName: values?.name,
      password: aesEncryption(values?.password)
    }
    

    let res = (await(onboardAgent(body)))?.data 
    
    dispatch(setLoader({status: false}))
    if(res) {
      dispatch(setAlertModal({status: true, type: res?.status ? "success" : "failed", message: res?.message}))
      res?.status && resetForm({values: ""})
    }else {
      dispatch(setAlertModal({status: true, type:"failed", message: "OOPS, Something went wrong. Please try again"}))
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      phoneNo: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit,
  });
  // console.log(errors);

  return (
    <>
    <PublicHeader/>
    <section className="gauto-login-area section_70">
      <Container>
        <Row>
          <Col md={12}>
            <div className="login-box">
              <div className="login-page-heading">
                <h3>Sign Up</h3>
              </div>

              <form onSubmit={handleSubmit} autoComplete="off">

              {errors.name && touched.name && (
                    <strong className="text-danger">{errors.name}</strong>
                  )}
                <div className="account-form-group">
                
                  <input
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    type="name"
                    placeholder="Enter Full Name"
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name ? "input-error" : ""
                    }
                  />
                  <FaUser />
                </div>
                
                {errors.phoneNo && touched.phoneNo && (
                    <strong className="text-danger">{errors.phoneNo}</strong>
                  )}
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

                {errors.email && touched.email && (
                    <strong className="text-danger">{errors.email}</strong>
                  )}
                <div className="account-form-group">
                 
                  <input
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "input-error" : ""
                    }
                  />
                  <FaRegEnvelope />
                </div>

                {errors.password && touched.password && (
                    <strong className="text-danger">{errors.password}</strong>
                  )}
                <div className="account-form-group">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? "input-error" : ""
                    }
                  />
                  <FaLock />
                </div>
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

                <p>
                  <button type="submit" className="gauto-theme-btn">
                    Register
                  </button>
                </p>
              </form>
              <div className="login-sign-up">
                <Link to="/login">Have an account? Sign In</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
};

export default AgentRegister;
