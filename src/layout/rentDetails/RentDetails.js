import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaToilet,
  FaHome,
  FaBed,
  FaChair,
  FaUtensilSpoon,
  FaBars,
} from "react-icons/fa";
import Slider from "react-slick";
import { rentDataDetail } from "../../mock/rentData";
import { amountFormat } from "../../utils/format";
import "../rentDetails/Rentdetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomToolTip from "../CustomToolTip";
import Alerts from "../Alerts";
import { validatePhoneNumber } from "../../utils/validate";
import { onboardTenant } from "../../services/onboardingService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import { aesEncryption } from "../../utils/encrypt";


const RentDetails = () => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [initialPayment, setInitialPayment] = useState("");
  const [bvnNumber, setBvnNumber] = useState("")
  const [partnerCompany, setPartnerCompany] = useState("")
  const [profileName, setProfileName] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [step, setStep] = useState(1)

  let params = useParams();
  let propertyId = Number(params?.id)

  const dispatch = useDispatch();

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  

  useEffect(() => {
    if(step === 2 && initialPayment >= rentDataDetail?.amount) {
      setStep(1)
    }
  }, [step, initialPayment])

  const errorRef = useRef(null)
  const scrollToError = () => {
    errorRef.current.scrollIntoView()  
  }
  

  const applyForRent = async(e) => {
    e.preventDefault()
    setShowAlert(false)
    if(profileName.length < 5){
      setShowAlert(true)
      setErrMsg(`Full name should be at least 5 character long`)
      scrollToError()
      return
    }

    if(!validatePhoneNumber(phoneNo)){
      setShowAlert(true)
      setErrMsg(`The phone number you provided is incorrect`)
      scrollToError()
      return
    }
    if(initialPayment < rentDataDetail?.amount / 2) {
      setShowAlert(true)
      setErrMsg(`The minimum initial payment you can make is 50% of the annual rent - (\u20A6${amountFormat(rentDataDetail?.amount / 2)})`)
      scrollToError()
      return
    }
    
    if(initialPayment > rentDataDetail?.amount) {
      setShowAlert(true)
      setErrMsg(`The amount you entered is greater than the annual rent - (\u20A6${amountFormat(rentDataDetail?.amount)})`)
      scrollToError()
      return
    }

    if(initialPayment >= rentDataDetail?.amount / 2 && initialPayment < rentDataDetail?.amount && step === 1){
      setStep(2)
      return;

    }

    const body1 = {
      email,
      phoneNo,
      profileName,
      initialPayment: Number(initialPayment),
      propertyId,  
    }

    const body2 = {
      email,
      phoneNo,
      profileName,
      bvnNumber: aesEncryption(bvnNumber),
      initialPayment,
      propertyId,
      corporateId: partnerCompany === null ? null : Number(partnerCompany)
    }

    const body = step === 1 ? body1 : body2

    dispatch(setLoader({status: true}))
    const res = (await(onboardTenant(body)))?.data
    if(res) {
      dispatch(setLoader({status: false}))
      setEmail(""); setPhoneNo(""); setProfileName(""); setInitialPayment(""); setPartnerCompany(""); setBvnNumber("")
      dispatch(setAlertModal({status: true, type: res?.status ? "success" : "failed", message: res?.message}))
  
    }else {
      dispatch(setLoader({status: false}))
      setShowAlert(true)
      setErrMsg(`Something went wrong. Please try agin.`)
      scrollToError()
    }
  


  }

  return (
    <>
      <section className="gauto-car-booking section_70">
        <Container>
          <Row>
            <Col lg={6}>
              <Slider {...settings}>
                {rentDataDetail?.images?.map((image) => (
                  <div className="car-booking-image" key={rentDataDetail?.id}>
                    <img
                      src={image}
                      alt="car"
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </Slider>
            </Col>
            <Col md={6}>
              <div className="car-booking-right">
                <p className="rental-tag">{rentDataDetail?.apartmentType}</p>
                <h3>Ikeja, Lagos</h3>
                <div className="price-rating">
                  <div className="price-rent">
                    <h4>
                      &#8358;{amountFormat(rentDataDetail?.amount)}
                      <span>/ {rentDataDetail?.paymentMode}</span>
                    </h4>
                  </div>
                </div>
                <p> {rentDataDetail?.desc}</p>
                <div className="car-features clearfix" ref={errorRef}>
                  <ul>
                    <li>
                      <FaToilet /> {rentDataDetail?.toilet} Toilet(s)
                    </li>
                    <li>
                      <FaHome /> {rentDataDetail?.condition}
                    </li>
                    <li>
                      <FaUtensilSpoon /> {rentDataDetail?.kitchen} Kitchen(s)
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <FaBed /> {rentDataDetail?.bedroom} Bedrooms
                    </li>
                    <li>
                      <FaChair /> {rentDataDetail?.livingRoom} Living Room
                    </li>
                    <li>
                      <FaBars /> {rentDataDetail?.furnished}
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="gauto-booking-form" style={{ padding: "20px" }}>
        <Container>
       
          <Row>
            <Col lg={7}>
              <div className="booking-form-left">
                <div className="single-booking">
                  <h3>Do you like this apartment? Get Started</h3>
             
                  <Alerts showAlert={showAlert} message={errMsg} closeAlert={() => setShowAlert(false)}/>
       
                  <form onSubmit={applyForRent}>
                    <Row>
                    <Col lg={6} md={12} className="mb-2">
                        <p>
                          <label>
                            Full Name
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
                      <Col lg={6} md={12} className="mb-2">
                        <p>
                          <label>
                            Enter{" "}
                            <CustomToolTip message={`Remember your rent payment can be flexible on RENTO. You may decide to pay the \u20A6${amountFormat(rentDataDetail?.amount)} annual fee outrightly or pay at least 50% (\u20A6${amountFormat(rentDataDetail?.amount / 2)}) of the annual fee and complete the rest over the next six months.`} >
                            <span className="text-primary">
                                initial payment
                              </span>
                            </CustomToolTip>
                          </label>
                          <input
                            required
                            type="number"
                            value={initialPayment}
                            onChange={(e)=>setInitialPayment(e.target.value)}
                            placeholder={`\u20A6${amountFormat(rentDataDetail?.amount / 2)} - \u20A6${amountFormat(rentDataDetail?.amount)}`}
                          />
                        </p>
                      </Col>
                      {step === 2 && (
                        <>
                        <Col lg={6} md={12} className="mb-2">
                        <p>
                          <label>
                           Enter Your bvnNumber
                          </label>
                          <input
                            type="number"
                            value={bvnNumber}
                            onChange={(e)=>setBvnNumber(e.target.value)}
                            placeholder="Bank Verification Number"
                            required
                          />
                        </p>
                      </Col>
                      <Col lg={6} md={12} className="mb-2">
                        <p>
                          <label>
                           Partner Company
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setPartnerCompany(e.target.value)}
                            value={partnerCompany}
                            placeholder="Lopo Inc."
                      
                          />
                        </p>
                      </Col>
                      </>
                      )}
                      

                      <Col lg={12} md={12} className="mb-2">
                      <p>
                       <label>&nbsp;</label>
                      <Button type="submit" className="p-2" style={{width: "100%"}} variant="danger">Proceed</Button>
                      </p>
                      </Col>
                    </Row>
                  </form>

                  
                </div>
              </div>
            </Col>

            {/* <Col lg={5}>
              <div className="booking-form-left">
                <div className="single-booking">
                  <h3>Frequently Asked Questions</h3>
             
                    
                </div>
              </div>
            </Col> */}
          </Row>

      
            
       
        </Container>
      </section>
    </>
  );
};

export default RentDetails;
