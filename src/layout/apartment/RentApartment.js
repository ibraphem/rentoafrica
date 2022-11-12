import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CustomToolTip from "../../layout/misc/CustomToolTip";
import Alerts from "../../layout/misc/Alerts";
import { validatePhoneNumber } from "../../utils/validate";
import { onboardTenant } from "../../services/onboardingService";
import { useDispatch } from "react-redux";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import { aesEncryption } from "../../utils/encrypt";
import { amountFormat } from "../../utils/format";

const RentApartment = ({ rentDataDetail }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [initialPayment, setInitialPayment] = useState("");
  const [bvnNumber, setBvnNumber] = useState("");
  const [partnerCompany, setPartnerCompany] = useState("");
  const [profileName, setProfileName] = useState("");
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (step === 2 && initialPayment >= rentDataDetail?.propertyAmount) {
      setStep(1);
    }
  }, [step, initialPayment, rentDataDetail?.propertyAmount]);

  //   const errorRef = useRef(null)
  //   const scrollToError = () => {
  //     errorRef.current.scrollIntoView()
  //   }

  const applyForRent = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    if (profileName.length < 5) {
      setShowAlert(true);
      setErrMsg(`Full name should be at least 5 character long`);
      //   scrollToError()
      return;
    }

    if (!validatePhoneNumber(phoneNo)) {
      setShowAlert(true);
      setErrMsg(`The phone number you provided is incorrect`);
      //   scrollToError()
      return;
    }
    if (initialPayment < rentDataDetail?.propertyAmount / 2) {
      setShowAlert(true);
      setErrMsg(
        `The minimum initial payment you can make is 50% of the annual rent - (\u20A6${amountFormat(
          rentDataDetail?.propertyAmount / 2
        )})`
      );
      //   scrollToError()
      return;
    }

    if (initialPayment > rentDataDetail?.propertyAmount) {
      setShowAlert(true);
      setErrMsg(
        `The amount you entered is greater than the annual rent - (\u20A6${amountFormat(
          rentDataDetail?.propertyAmount
        )})`
      );
      //   scrollToError()
      return;
    }

    if (
      initialPayment >= rentDataDetail?.propertyAmount / 2 &&
      initialPayment < rentDataDetail?.propertyAmount &&
      step === 1
    ) {
      setStep(2);
      return;
    }

    const body1 = {
      email,
      phoneNo,
      profileName,
      initialPayment: Number(initialPayment),
      rentDataDetail,
    };

    const body2 = {
      email,
      phoneNo,
      profileName,
      bvnNumber: aesEncryption(bvnNumber),
      initialPayment,
      propertyId: rentDataDetail?.propertyId,
      corporateId: partnerCompany === null ? null : Number(partnerCompany),
    };

    const body = step === 1 ? body1 : body2;

    dispatch(setLoader({ status: true }));
    const res = (await onboardTenant(body))?.data;
    if (res) {
      dispatch(setLoader({ status: false }));
      setEmail("");
      setPhoneNo("");
      setProfileName("");
      setInitialPayment("");
      setPartnerCompany("");
      setBvnNumber("");
      dispatch(setAlertModal({ status: true, type: res?.status ? "success" : "failed", message: res?.message }));
    } else {
      dispatch(setLoader({ status: false }));
      setShowAlert(true);
      setErrMsg(`Something went wrong. Please try agin.`);
      scrollToError();
    }
  };

  return (
    <section className="gauto-booking-form" style={{ padding: "20px" }}>
      <Container>
        <Row>
          <Col lg={7}>
            <div className="booking-form-left">
              <div className="single-booking">
                <h3>Do you like this apartment? Get Started</h3>

                <Alerts showAlert={showAlert} message={errMsg} closeAlert={() => setShowAlert(false)} />

                <Tabs defaultActiveKey="tenant" id="fill-tab-example" className="mb-3 tabClass" fill>
                  <Tab eventKey="tenant" title="Full Rent Pay">
                    <div className="rent-form-box">
                   <form onSubmit={applyForRent}>
                    <Row>
                    <Col lg={6} md={12} className="mb-2">
                        <p>
                          <label>
                            First Name
                          </label>
                          <input
                            type="text"
                            value={profileName}
                            onChange={(e)=>setProfileName(e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </p>
                      </Col>
                      <Col lg={6} md={12} className="mb-2">
                        <p>
                          <label>
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={profileName}
                            onChange={(e)=>setProfileName(e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </p>
                      </Col>
                      <Col lg={6} md={12} className="mb-2">
                        <p>
                          <label>
                            Email
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="somebody@example.com"
                            required
                          />
                        </p>
                      </Col>
                      <Col lg={6} md={12} className="mb-2">
                        <p>
                          <label>
                            Phone
                          </label>
                          <input
                            required
                            type="number"
                            value={phoneNo}
                            onChange={(e)=>setPhoneNo(e.target.value)}
                            placeholder="080xxxxxxxx5"
                          />
                        </p>
                      </Col>
                    
                      

                      <Col lg={12} md={12} className="mt-2">
                      
                      <Button type="submit"className="p-2" style={{width: "100%"}} variant="primary">Proceed</Button>
                     
                      </Col>
                    </Row>
                  </form>
                  </div>
                  </Tab>
                  <Tab eventKey="corporate" title="Flexible Rent Pay">
                    <p>Hot</p>
                  </Tab>
               
                </Tabs>

                
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RentApartment;
