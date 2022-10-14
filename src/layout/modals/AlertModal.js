import { useDispatch, useSelector } from "react-redux";
import {setAlertModal} from "../../redux/slices/modalSlice"
import { FaCheck, FaTimes } from "react-icons/fa";
import "../modals/Modal.css"

const AlertModal = () => {
  const alert = useSelector((state) => state.modal?.alertModal)
  const dispatch = useDispatch()

  // console.log(alert);

  const closeModal = () => {
    dispatch(
      setAlertModal({
        status: false,
        message: "",
        type: "",
        heading:""
      })
    );
  };

    return (
      alert?.status && (
        <div className="alert-modal alertPOP">
          <div className="alert-modal-overlay" onClick={()=> closeModal()}></div>
          <div className="alert-modal-card vivify popInBottom">
            <div className="close-alert-button"></div>
    
            <div className="alert-modal-body">
              <br />
    
              <div
                className={`alert-modal-icon ${
                  alert.type === "success" ? "bg-success" : "bg-danger"
                }`}
              >
                {alert.type === "success" ? (
                  <i className="fa fa-check"><FaCheck/></i>
                ) : (
                  <i className="fa fa-check"><FaTimes/></i>
                )}
              </div>
              <h4 className={alert.type === "success" ? 'text-success' : 'text-danger'}>{alert.type === "success" ? 'SUCCESS' : 'Operation Failed!!!'}</h4>
              <p className={`${alert.type === "success" ? "success" : "error"}`} style={{ lineHeight: "25px" }}>
                {alert.message}
              </p>
              
    
              <div className="alert-modal-button mt-3">
                <button onClick={() => closeModal()} className="btn btn-dark border py-3">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )
      
    );
};

export default AlertModal;