import {useState} from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegEnvelope } from "react-icons/fa";
import "../assets/css/publicStyles/auth.css";
import PublicHeader from "../layout/header/PublicHeader";
import { forgotPassword } from "../services/onboardingService";
import { useDispatch } from "react-redux";
import { setAlertModal, setLoader } from "../redux/slices/modalSlice";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()

    const passwordForget = async(e) => {
        e.preventDefault()
        dispatch(setLoader({ status: true }));
        const res = (await(forgotPassword(email)))?.data
        // console.log(res);
      
        if (res) {
            dispatch(setAlertModal({ status: true, type: res?.status ? "success" : "failed", message: res?.message }));
          } else {
            dispatch(
              setAlertModal({ status: true, type: "failed", message: "OOPS, Something went wrong. Please try again" })
            );
          }
          dispatch(setLoader({ status: false }));
    }
    return (
        <>
        <PublicHeader/>
          <section className="gauto-login-area section_70">
          <Container>
            <Row>
              <Col md={12}>
                <div className="login-box">
                  <div className="login-page-heading">
                    <h3>Forgot Password?</h3>
                  </div>
                  <form onSubmit={passwordForget}>
                    <div className="account-form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email Email"
                      required
                    />
                      <FaRegEnvelope />
                    </div>
              
                      <button type="submit" className="gauto-theme-btn">
                          Reset
                      </button>
                 
                  </form>
                  <div className="login-sign-up">
                    <Link to="/login">Go back to login</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        </>
    );
};

export default ForgotPassword;