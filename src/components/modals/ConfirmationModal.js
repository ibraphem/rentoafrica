import { useSelector } from "react-redux";
import "../../assets/css/publicStyles/modal.css"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap";

import { useDispatch } from "react-redux";
import { setAlertModal, setConfirmPopUp, setLoader } from "../../redux/slices/modalSlice";
import { approveProperty, deleteProperty } from "../../services/propertyService";
import { getAdminProperties } from "../../redux/slices/adminPropertySlice";
import { approveCorporate } from "../../services/corporateService";
import { getCorporates } from "../../redux/slices/corporateSlice";
import { getAgentProperties } from "../../redux/slices/agentPropertySlice";
import { deleteRent } from "../../services/rentService";
import { getRentRequest } from "../../redux/slices/rentRequestSlice";

const ConfirmationModal = () => {
    const confirmModal = useSelector((state) => state.modal.confirmPopUp);
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(
          setConfirmPopUp({
            status: false,
            type: "",
            title: "",
            desc: "",
            payload: null,
            buttonText: "",
          })
        );
      };
    
      const handleAction = async() => {
        dispatch(setLoader({status: true}))
        let res = null;

        if (confirmModal.type === "approveApartment") {
          res = (await approveProperty(confirmModal.payload))?.data;
          dispatch(getAdminProperties())
        }

        if (confirmModal.type === "removeApartment") {
          res = (await deleteProperty(confirmModal.payload))?.data;
          dispatch(getAgentProperties())
        }

        if (confirmModal.type === "approveCorporate") {
          res = (await approveCorporate(confirmModal.payload))?.data;
          dispatch(getCorporates())
        }

        if (confirmModal.type === "cancelRentRequest") {
          res = (await deleteRent(confirmModal.payload))?.data;
          dispatch(getRentRequest())
        }



     
        dispatch(setLoader({status: false}))
        closeModal()
        if(res) {
          if(!res?.status) {
            dispatch(setAlertModal({status: true, type:"failed", message: res?.message}))
          }
        }else {
          dispatch(setAlertModal({status: true, type:"failed", message: "OOPS, Something went wrong. Please try again"}))
        }
      }
    return (
        <Modal size="sm" isOpen={confirmModal?.status} >
        <ModalHeader

        >
          {confirmModal.title}
        </ModalHeader>
        <ModalBody>
          <p>
          {confirmModal.desc}
          </p>
        </ModalBody>
        <ModalFooter className="bg-light">
          <Button color="warning" size="md" onClick={closeModal}>Close</Button>
          {confirmModal?.showActionBtn && <Button color="danger" onClick={() => handleAction()} size="md">{confirmModal.buttonText}</Button> }
        </ModalFooter>
      </Modal>
    );
};

export default ConfirmationModal;