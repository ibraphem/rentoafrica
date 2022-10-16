import React, { useState, useRef } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  Col,
  Row,
} from "../components/Component";
import { useForm } from "react-hook-form";
import { Steps, Step } from "react-step-builder";
import { FormGroup, Button } from "reactstrap";
import Layout from "../layout/Index";
import { apartmentCondion, apartments, furnishing, rentFeeUnit, toilets } from "../mock/apartments";


const PersonalForm = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { errors, handleSubmit, register } = useForm();

  const submitForm = (data) => {
    props.next();
    console.log(data);
  };

  

  return (
    <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
      <Row className="gy-2">
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="first-name">
              Property Type
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select" name="propertyType">
                <option label="Select apartment type" value=""></option>
                {apartments?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.propertyType && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="last-name">
              Condition
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select">
                <option label="Select apartment condition" value=""></option>
                {apartmentCondion?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.propertyCondition && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="email">
              Furnishing
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select">
                <option label="Select an option" value=""></option>
                {furnishing?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.email && errors.email.type === "required" && (
                <span className="invalid">This field is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="invalid">{errors.email.message}</span>
              )}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="phone-no">
              No of Toilet/Bathroom
            </label>
            <div className="form-control-wrap">
              <select className="form-control form-select">
                <option label="Select an option" value=""></option>
                {toilets?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.phone && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Rent Fee
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                id="city"
                className="form-control"
                ref={register({ required: true })}
                name="city"
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.city}
              />
              {errors.city && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Rent Fee Unit
            </label>
            <div className="form-control-wrap">
            <select className="form-control form-select">
                <option label="Select an option" value=""></option>
                {rentFeeUnit?.map((apartment) => (
                  <option label={apartment?.type} value={apartment?.id}></option>
                ))}
              </select>
              {errors.city && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>

        <Col md="12">
          <FormGroup>
            <label className="form-label" htmlFor="city">
              Description
            </label>
            <div className="form-control-wrap">
              <textarea type="textarea" className="form-control form-control-sm" placeholder="Write your description" />
              {errors.city && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
      </Row>
      <div className="actions clearfix">
        <ul>
          <li>
            <Button color="primary" type="submit">
              Next
            </Button>
          </li>
        </ul>
      </div>
    </form>
  );
};

const UserSettings = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
    terms: false,
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { errors, handleSubmit, register, watch } = useForm();

  const submitForm = (data) => {
    props.next();
  };

  const password = useRef();
  password.current = watch("password");

  return (
    <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
      <Row className="gy-2">
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="username">
              Property
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                id="username"
                ref={register({ required: true })}
                className="form-control"
                name="username"
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.username}
              />
              {errors.username && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="form-control-wrap">
              <input
                type="password"
                id="password"
                ref={register({
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
                className="form-control"
                name="password"
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.password}
              />
              {errors.password && <span className="invalid">{errors.password.message}</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label className="form-label" htmlFor="rePassword">
              Re-Password
            </label>
            <div className="form-control-wrap">
              <input
                type="password"
                id="rePassword"
                className="form-control"
                ref={register({
                  required: "This field is required",
                  validate: (value) => value === password.current || "The passwords do not match",
                })}
                name="rePassword"
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.rePassword}
              />
              {errors.rePassword && <span className="invalid">{errors.rePassword?.message}</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="12">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              ref={register({ required: true })}
              onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
              checked={formData.terms}
              name="terms"
              id="fw-policy"
            />
            {errors.terms && <span className="invalid">This field is required</span>}
            <label className="custom-control-label" htmlFor="fw-policy">
              I agreed Terms and policy
            </label>
          </div>
        </Col>
      </Row>
      <div className="actions clearfix">
        <ul>
          <li>
            <Button color="primary" type="submit">
              Next
            </Button>
          </li>
          <li>
            <Button color="primary" onClick={props.prev}>
              Previous
            </Button>
          </li>
        </ul>
      </div>
    </form>
  );
};

const PaymentInfo = (props) => {
  const [formData, setFormData] = useState({
    tokenAddress: "",
    contribute: "",
    telegram: "",
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { errors, handleSubmit, register } = useForm();

  const submitForm = (data) => {
    //window.location.reload();
    props.next();
  };

  return (
    <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
      <Row className="gy-3">
        <Col md="12">
          <FormGroup>
            <label className="form-label" htmlFor="fw-token-address">
              Token Address
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                id="fw-token-address"
                name="tokenAddress"
                ref={register({ required: true })}
                onChange={(e) => onInputChange(e)}
              />
              {errors.tokenAddress && <span className="invalid">This field is required</span>}
            </div>
          </FormGroup>
        </Col>
        <Col md="12">
          <label className="form-label">I want to contribute</label>
          <ul className="d-flex flex-wrap g-2">
            <li>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  name="ethRadio"
                  id="fw-lt1eth"
                  ref={register({ required: true })}
                  checked={formData.contribute === "leEth" ? true : false}
                  onChange={() => setFormData({ ...formData, contribute: "leEth" })}
                />
                {errors.ethRadio && <span className="invalid">This field is required</span>}
                <label className="custom-control-label" htmlFor="fw-lt1eth">
                  Less than 1 ETH
                </label>
              </div>
            </li>
            <li>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  name="ethRadio"
                  id="fw-ov1eth"
                  ref={register({ required: true })}
                  checked={formData.contribute === "ovEth" ? true : false}
                  onChange={() => setFormData({ ...formData, contribute: "ovEth" })}
                />
                <label className="custom-control-label" htmlFor="fw-ov1eth">
                  Over than 1 ETH
                </label>
              </div>
            </li>
          </ul>
        </Col>
        <Col md="6">
          <div className="form-group">
            <label className="form-label" htmlFor="fw-telegram-username">
              Telegram Username
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control required"
                id="fw-telegram-username"
                ref={register({ required: true })}
                name="telegram"
                onChange={(e) => onInputChange(e)}
              />
              {errors.telegram && <span className="invalid">This field is required</span>}
            </div>
          </div>
        </Col>
      </Row>
      <div className="actions clearfix">
        <ul>
          <li>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </li>
          <li>
            <Button color="primary" onClick={props.prev}>
              Previous
            </Button>
          </li>
        </ul>
      </div>
    </form>
  );
};

const Header = (props) => {
  return (
    <div className="steps clearfix">
      <ul>
        <li className={props.current >= 1 ? "first done" : "first"}>
          <a href="#wizard-01-h-0" onClick={(ev) => ev.preventDefault()}>
            <span className="number">01</span> <h5>Type</h5>
          </a>
        </li>
        <li className={props.current >= 2 ? "done" : ""}>
          <a href="#wizard-01-h-1" onClick={(ev) => ev.preventDefault()}>
            <span className="number">02</span> <h5>Details</h5>
          </a>
        </li>
        <li className={props.current >= 3 ? "done" : ""}>
          <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
            <span className="current-info audible">current step: </span>
            <span className="number">03</span> <h5>Owner Info</h5>
          </a>
        </li>
        <li className={props.current === 4 ? "last done" : "last"}>
          <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
            <span className="current-info audible">current step: </span>
            <span className="number">04</span> <h5>Uploads</h5>
          </a>
        </li>
      </ul>
    </div>
  );
};

const Success = (props) => {
  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <BlockTitle tag="h6" className="text-center">
        Thank you for submitting form
      </BlockTitle>
    </div>
  );
};

const config = {
  before: Header,
};

const AddRentApartment = () => {
  return (
    <Layout>
      <Head title="Add rent apartment" />
      <Content page="component">
      

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Apartment</BlockTitle>
              {/* <p>A basic demonstration of wizard form basic.</p> */}
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
              <Steps config={config}>
                <Step component={PersonalForm} />
                <Step component={UserSettings} />
                <Step component={PaymentInfo} />
                <Step component={Success} />
              </Steps>
            </div>
          </PreviewCard>
        </Block>
      </Content>
    </Layout>
  );
};

export default AddRentApartment;
