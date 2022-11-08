import {useState} from "react";
import { useDispatch } from "react-redux";
import { FormGroup, Button } from "reactstrap";
import { getAdminProperties } from "../../redux/slices/adminPropertySlice";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import { declineCorporate } from "../../services/corporateService";
import { declineProperty } from "../../services/propertyService";

const ReasonForm = ({closeModal, payload, type}) => {
  const [reason, setReason] = useState("")
  const dispatch = useDispatch()

  const decline = async(e) => {
    e.preventDefault();

    dispatch(setLoader({status: true}))
    const body = {
      id: payload,
      reason
    }

    let res = null;

    if(type === "declineApartment") {
      res = (await declineProperty(body))?.data
      dispatch(getAdminProperties())
    }

    if(type === "declineCorporate") {
      res = (await declineCorporate(body))?.data
    }
     
    dispatch(setLoader({status: false}))
    if(res) {
      dispatch(setAlertModal({status: true, type: res?.status ? "success" : "failed", message: res?.message}))
      res?.status && closeModal()
    }else {
      dispatch(setAlertModal({status: true, type:"failed", message: "OOPS, Something went wrong. Please try again"}))
    }
    
  };
  return (
    <form onSubmit={decline}>
      <FormGroup>
        <div className="form-control-wrap">
          <textarea type="textarea" placeholder="Enter reason for rejection" onChange={(e) => setReason(e.target.value)} className="form-control form-control-sm" required />
        </div>
      </FormGroup>
      <FormGroup>
        <Button color="danger" type="submit" size="lg">
          Decline
        </Button>
      </FormGroup>
    </form>
  );
};

export default ReasonForm;
