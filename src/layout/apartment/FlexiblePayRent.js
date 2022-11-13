import { Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import { onboardTenant } from "../../services/onboardingService";
import CustomToolTip from "../misc/CustomToolTip"
import { amountFormat } from "../../utils/format";
import { aesEncryption } from "../../utils/encrypt";
import * as yup from "yup";

const FlexiblePayRent = ({rentDataDetail}) => {
  const dispatch = useDispatch();

  const onSubmit = async (values, { resetForm }) => {
    dispatch(setLoader({ status: true }));
    const payload = {
      email: values?.email,
      phoneNo: values?.phoneNo,
      profileName: `${values?.firstName} ${values?.lastName}`,
      initialPayment: Number(values?.initialPayment),
      bvnNumber: aesEncryption(values?.bvnNumber),
      propertyId: rentDataDetail?.propertyId,
    };

    console.log(payload);
    const res = (await onboardTenant(payload))?.data;

    dispatch(setLoader({ status: false }));
    if (res) {
      dispatch(setAlertModal({ status: true, type: res?.status ? "success" : "failed", message: res?.message }));
      res?.status && resetForm({ values: "" });
    } else {
      dispatch(
        setAlertModal({ status: true, type: "failed", message: "OOPS, Something went wrong. Please try again" })
      );
    }
  };

  const flexiblePayValidationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phoneNo: yup
      .string()
      .required("Phone Number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(11, "Must be exactly 11 digits")
      .max(11, "Must be exactly 11 digits"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    bvnNumber: yup
      .string()
      .required("BVN Number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(11, "Must be exactly 11 digits")
      .max(11, "Must be exactly 11 digits"),
      initialPayment: yup
      .number().required("Enter Initial payment")
      .moreThan(rentDataDetail?.propertyAmount/2 - 1, `Initial payment can not be less than \u20A6${amountFormat(rentDataDetail?.propertyAmount/2)}`)
      .lessThan(rentDataDetail?.propertyAmount + 1, `Initial payment can not be greater than \u20A6${amountFormat(rentDataDetail?.propertyAmount)}`)
      ,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      bvnNumber: "",
      initialPayment: ""
    },
    validationSchema: flexiblePayValidationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col lg={6} md={12} className="mb-2">
          <p>
            <label>First Name</label>
            <input
              value={values.firstName}
              onChange={handleChange}
              id="firstName"
              placeholder="John"
              onBlur={handleBlur}
              className={errors.firstName && touched.firstName ? "input-error" : ""}
            />
            {errors.firstName && touched.firstName && <span className="invalid text-danger">{errors?.firstName}</span>}
          </p>
        </Col>
        <Col lg={6} md={12} className="mb-2">
          <p>
            <label>Last Name</label>
            <input
              value={values.lastName}
              onChange={handleChange}
              id="lastName"
              placeholder="Doe"
              onBlur={handleBlur}
              className={errors.lastName && touched.lastName ? "input-error" : ""}
            />
            {errors.lastName && touched.lastName && <span className="invalid text-danger">{errors?.lastName}</span>}
          </p>
        </Col>
        <Col lg={6} md={12} className="mb-2">
          <p>
            <label>Email</label>
            <input
              value={values.email}
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="somebody@example.com"
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && <span className="invalid text-danger">{errors?.email}</span>}
          </p>
        </Col>
        <Col lg={6} md={12} className="mb-2">
          <p>
            <label>Phone Number</label>
            <input
              value={values.phoneNo}
              onChange={handleChange}
              id="phoneNo"
              placeholder="070xxxxxxxxx"
              onBlur={handleBlur}
              className={errors.phoneNo && touched.phoneNo ? "input-error" : ""}
            />
            {errors.phoneNo && touched.phoneNo && <span className="invalid text-danger">{errors?.phoneNo}</span>}
          </p>
        </Col>

        <Col lg={6} md={12} className="mb-2">
          <p>
            <label>
              Enter{" "}
              <CustomToolTip
                message={`Remember your rent payment can be flexible on RENTO. You may decide to pay the \u20A6${amountFormat(
                  rentDataDetail?.propertyAmount
                )} annual fee outrightly or pay at least 50% (\u20A6${amountFormat(
                  rentDataDetail?.propertyAmount / 2
                )}) of the annual fee and complete the rest over the next six months.`}
              >
                <span className="text-primary">initial payment</span>
              </CustomToolTip>
            </label>
            <input
              value={values.initialPayment}
              onChange={handleChange}
              onBlur={handleBlur}
              id="initialPayment"
              placeholder={`\u20A6${amountFormat(rentDataDetail?.propertyAmount / 2)} - \u20A6${amountFormat(
                rentDataDetail?.propertyAmount
              )}`}
            />
            {errors.initialPayment && touched.initialPayment && <span className="invalid text-danger">{errors?.initialPayment}</span>}
          </p>
        </Col>

        <Col lg={6} md={12} className="mb-2">
          <p>
            <label>Enter Your bvnNumber</label>
            <input
              value={values.bvnNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              id="bvnNumber"
            />
            {errors.bvnNumber && touched.bvnNumber && <span className="invalid text-danger">{errors?.bvnNumber}</span>}
          </p>
        </Col>
   

        <Col lg={12} md={12} className="mt-2">
          <button type="submit" class="btn btn-danger btn-lg btn-block">
            Submit
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default FlexiblePayRent;
