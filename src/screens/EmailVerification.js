import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import "../assets/css/publicStyles/error.css"
import VerifyLoader from "../components/loaders/VerifyLoader";
import { setAlertModal } from "../redux/slices/modalSlice";
import { verifyEmail } from "../services/onboardingService";
import Password from "../shared/Password";


const EmailVerification = () => {
    const params = useParams()
    const history = useHistory();
    const dispatch = useDispatch()
    const [desc, setDesc] = useState("We are verifying your email, Please wait...")
    const [verificationStatus, setVerificationStatus] = useState(true)
    


    
    useEffect(() => {
    if(params?.role !== "User"){
      async function emailVerify() {
        let res = (await verifyEmail(params?.code))?.data
       console.log(res);
  
        if(res) {
          if(res?.status){
            setDesc("Verified. Redirecting to sign in page...")
            setTimeout(() => {
              history.push("/login");
            }, 5000);
         
            return
           
          }else {
             setDesc("Email Verification Failed.")
        setVerificationStatus(false)
            dispatch(setAlertModal({status: true, type:"failed", message: res?.message}))
            
          }
        }else {
           setDesc("Email Verification Failed.")
        setVerificationStatus(false)
          dispatch(setAlertModal({status: true, type:"failed", message: "OOPS, Something went wrong. Please try again"}))
        }
       
      }


      emailVerify()
    }

    }, [params?.code, dispatch, history])
    
    return (
      <>
      {params?.role === "User" ? (
        <Password code={params?.code}/>
      ):(
        <section className="gauto-notfound-area section_70">
        <Container>
          <Row>
          <b style={{textAlign:"center"}}>RENTO LOGO</b>
            <Col md={12}>
            
              <div className="notfound-box">
                {verificationStatus ? <VerifyLoader/> : <FaRegTimesCircle color="red" size={40} style={{margin: "20px"}}/>}
                  <h4>{desc}</h4>
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      )}
       
      </>
    );
};

export default EmailVerification;