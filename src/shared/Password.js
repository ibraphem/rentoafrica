import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import "../assets/css/publicStyles/auth.css";
import { useFormik } from "formik";
import { setAlertModal, setLoader } from "../redux/slices/modalSlice";
import { useDispatch } from "react-redux";
import { aesEncryption } from "../utils/encrypt";
import { passwordValidationSchema } from "../utils/formValidationSchema";
import { verifyEmailUser } from "../services/onboardingService";
import { useHistory } from "react-router";

const Password = ({ code }) => {
    const dispatch = useDispatch()
    const history = useHistory()

  const onSubmit = async(values, { resetForm }) => {
    dispatch(setLoader({ status: true }));
    const payload = {
      password: aesEncryption(values?.password),
      token: code,
    };

    let res = (await verifyEmailUser(payload))?.data;

    dispatch(setLoader({ status: false }));
    if (res) {
      dispatch(setAlertModal({ status: true, type: res?.status ? "success" : "failed", message: res?.message }));
      res?.status && resetForm({ values: "" });
      res?.status && history.push("/login");
    } else {
      dispatch(
        setAlertModal({ status: true, type: "failed", message: "OOPS, Something went wrong. Please try again" })
      );
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit,
  });

  return (
    <section className="gauto-login-area section_70">
      <Container>
        <Row>
          <Col md={12}>
            <div className="login-box">
              <div className="login-page-heading">
                <h5>Complete your account set up</h5>
              </div>
              <form onSubmit={handleSubmit}>
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
                    className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}
                  />
                  <FaLock />
                </div>

                <p>
                  <button type="submit" className="gauto-theme-btn">
                    Submit
                  </button>
                </p>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Password;
