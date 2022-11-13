import { Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { fullPayValidationSchema } from "../../utils/formValidationSchema";
import { useDispatch } from "react-redux";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import { onboardTenant } from "../../services/onboardingService";
import CustomToolTip from "../misc/CustomToolTip"
import { amountFormat } from "../../utils/format";

const FlexiblePayRent = ({rentDataDetail}) => {
  const dispatch = useDispatch();

  const onSubmit = async (values, { resetForm }) => {
    dispatch(setLoader({ status: true }));
    const payload = {
      email: values?.email,
      phoneNo: values?.phoneNo,
      profileName: `${values?.firstName} ${values?.lastName}`,
      initialPayment: Number(rentDataDetail?.propertyAmount),
      propertyId: rentDataDetail?.propertyId,
    };

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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      bvnNumber: "",
      initialPayment: ""
    },
    validationSchema: fullPayValidationSchema,
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
              required
              value={values.initialPayment}
              onChange={handleChange}
              id="initialPayment"
              placeholder={`\u20A6${amountFormat(rentDataDetail?.propertyAmount / 2)} - \u20A6${amountFormat(
                rentDataDetail?.propertyAmount
              )}`}
            />
          </p>
        </Col>

        <Col lg={6} md={12} className="mb-2">
          <p>
            <label>Enter Your bvnNumber</label>
            <input
              value={values.bvnNumber}
              onChange={handleChange}
              id="bvnNumber"
            />
          </p>
        </Col>
        <Col lg={6} md={12} className="mb-2">
          <p>
            <label>Partner Company</label>
            <input
              type="text"
              // onChange={(e) => setPartnerCompany(e.target.value)}
              placeholder="Lopo Inc."
            />
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
