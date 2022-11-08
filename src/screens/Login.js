import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey, FaLock, FaRegEnvelope } from "react-icons/fa";
import "../assets/css/publicStyles/auth.css";
import { useFormik } from "formik";
import { signinSchema } from "../utils/formValidationSchema";
import { setAlertModal, setLoader } from "../redux/slices/modalSlice";
import { login } from "../services/onboardingService";
import { useDispatch } from "react-redux";
import { aesEncryption } from "../utils/encrypt";
import PublicHeader from "../layout/header/PublicHeader";
import { saveUser } from "../redux/slices/userSlice";


const Login = () => {

  const dispatch = useDispatch()


  const onSubmit = async(values, {resetForm}) => {
    dispatch(setLoader({status: true}))

    const body = {
      email: values.email,
      password: aesEncryption(values?.password)
    }

    const res = (await(login(body)))?.data 
   
    if(res) {
      if(res?.status) {
        dispatch(saveUser(res?.result))
      }else{
        dispatch(setAlertModal({status: true, type: "failed", message: res?.message}))
      }
    }else {
      dispatch(setAlertModal({status: true, type:"failed", message: "OOPS, Something went wrong. Please try again"}))
    }

    dispatch(setLoader(false))
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit,
  });


    return (
      <>
      <PublicHeader/>
        <section className="gauto-login-area section_70">
        <Container>
          <Row>
            <Col md={12}>
              <div className="login-box">
                <div className="login-page-heading">
                  <FaKey />
                  <h3>Sign In</h3>
                </div>
                <form onSubmit={handleSubmit}>
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
                  <div className="remember-row">
                    <p className="lost-pass">
                      <Link to="/forgot/password" >
                        Forgot Password
                      </Link>
                    </p>
                
                  </div>
                  <p>
                    <button type="submit" className="gauto-theme-btn">
                        Login
                    </button>
                  </p>
                </form>
                {/* <div className="login-sign-up">
                  <Link to="/register">Don't have an account? Sign Up</Link>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      </>
    );
};

export default Login;