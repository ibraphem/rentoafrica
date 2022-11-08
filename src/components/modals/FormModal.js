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
import ReasonForm from "../../layout/modalForms/ReasonForm";
import { setFormModal } from "../../redux/slices/modalSlice";

const FormModal = () => {
    const formModal = useSelector((state) => state.modal.formModal);
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(
          setFormModal({
            status: false,
            title: "",
          })
        );
      };
    
    return (
        <Modal isOpen={formModal?.status} >
        <ModalHeader
        >
          {formModal.title}
        </ModalHeader>
        <ModalBody>
         {formModal?.type === "declineApartment" || formModal?.type === "declineCorporate" ? <ReasonForm type={formModal?.type} closeModal={closeModal} payload={formModal?.payload}/> : null}
        </ModalBody>
        <ModalFooter className="bg-light">
        <Button color="warning" size="md" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
};

export default FormModal;