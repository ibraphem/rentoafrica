import { Row, Col } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import { fullPayValidationSchema } from "../../utils/formValidationSchema";
import { useDispatch } from "react-redux";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import { onboardTenant } from "../../services/onboardingService";


const FullPayRent = ({rentDataDetail}) => {
  const dispatch = useDispatch()


  const handleSubmit = async(values, resetForm) => {
    dispatch(setLoader({ status: true }));
    const payload = {
      email: values?.email,
      phoneNo: values?.phoneNo,
      profileName: `${values?.firstName} ${values?.lastName}`,
      initialPayment: Number(rentDataDetail?.propertyAmount),
      propertyId: rentDataDetail?.propertyId,
    };

    // console.log(payload);

    const res = (await onboardTenant(payload))?.data;

    dispatch(setLoader({status: false}))
    if(res) {
      dispatch(setAlertModal({status: true, type: res?.status ? "success" : "failed", message: res?.message}))
      // res?.status && resetForm({values: ""})
    }else {
      dispatch(setAlertModal({status: true, type:"failed", message: "OOPS, Something went wrong. Please try again"}))
    }


  };
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  };
  return (
    <Formik enableReinitialize initialValues={initialValues} validationSchema={fullPayValidationSchema} onSubmit={(values) => handleSubmit(values)}>
      {({ errors, touched }) => (
        <Form>
          <Row>
            <Col lg={6} md={12} className="mb-2">
              <p>
                <label>First Name</label>
                <Field type="text" placeholder="John" name="firstName" />
                {errors.firstName && touched.firstName && <span className="invalid text-danger">{errors?.firstName}</span>}
              </p>
           
            </Col>
            <Col lg={6} md={12} className="mb-2">
              <p>
                <label>Last Name</label>
                <Field type="text" placeholder="Doe" name="lastName" />
                {errors.lastName && touched.lastName && <span className="invalid text-danger">{errors?.lastName}</span>}
              </p>
            </Col>
            <Col lg={6} md={12} className="mb-2">
              <p>
                <label>Email</label>
                <Field type="text" placeholder="somebody@example.com" name="email" />
                {errors.email && touched.email && <span className="invalid text-danger">{errors?.email}</span>}
              </p>
            </Col>
            <Col lg={6} md={12} className="mb-2">
              <p>
                <label>Phone Number</label>
                <Field type="text" placeholder="080xxxxxxxxx" name="phoneNo" />
                {errors.phoneNo && touched.phoneNo && <span className="invalid text-danger">{errors?.phoneNo}</span>}
              </p>
            </Col>

            <Col lg={12} md={12} className="mt-2">
              <button type="submit" class="btn btn-danger btn-lg btn-block">
                Submit
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default FullPayRent;
