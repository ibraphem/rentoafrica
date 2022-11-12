import { Container, Row, Col } from "react-bootstrap";
import { FaToilet, FaHome, FaBars, FaBed } from "react-icons/fa";
import Slider from "react-slick";
import { amountFormat, simpleDateString } from "../../utils/format";
import "../../assets/css/publicStyles/rentDetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RentApartment from "./RentApartment";

const Rent = ({ rentDataDetail, rentForm = false, otherDetails = false }) => {
  
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="gauto-car-booking section_70">
        <Container>
          <Row>
            <Col lg={6}>
              <Slider {...settings}>
                {rentDataDetail?.propertyPhotos?.map((image) => (
                  <div className="car-booking-image" key={image?.id}>
                    <img
                      src={image?.photo}
                      alt={rentDataDetail?.propertyName}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </Slider>
            </Col>
            <Col md={6}>
              <div className="car-booking-right">
                <p className="rental-tag">{rentDataDetail?.propertyName}</p> 
                {otherDetails && <span className={rentDataDetail?.propertyStatusDescription === "Rejected" ? "text-danger": "text-info"} style={{fontSize:"1.5rem"}}><i> ~ {rentDataDetail?.propertyStatusDescription}</i></span>} 

                <h3>
                  {rentDataDetail?.location}, {rentDataDetail?.state}
                </h3>
                <div className="price-rating">
            
                  <div className="price-rent">
                    <h4>&#8358;{amountFormat(rentDataDetail?.propertyAmount)}/Annum</h4>
                  </div>
                </div>
                <p> {rentDataDetail?.description}</p>
                <div className="car-features clearfix">
                  <ul>
                    <li>
                      <FaToilet /> {rentDataDetail?.toilets} Toilet/Bathroom
                    </li>
                    <li>
                      <FaHome /> {rentDataDetail?.propertyConditionDescription}
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <FaBed /> {rentDataDetail?.propertyTypeDescription}
                    </li>
                    <li>
                      <FaBars /> {rentDataDetail?.furnishedStatusDescription}
                    </li>
                  </ul>
                </div>

                
                {otherDetails && (
                  
                <div className="order-summury-box mt-2">
                <h3>Other Info</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>Listing Date</td> 
                      <td>{simpleDateString(rentDataDetail?.createdDate)}</td>
                    </tr>
                    {
                      rentDataDetail?.approvedDate && (
                        <tr>
                      <td>{rentDataDetail?.rejectedReason?.length > 0  ? "Rejection Date" : "Approval Date"}</td>
                      <td>{simpleDateString(rentDataDetail?.approvedDate)}</td>
                    </tr>
                      )
                    }
                    <tr>
                      <td>Property Address</td>
                      <td>{rentDataDetail?.address}</td>
                    </tr>
                    <tr>
                      <td>Caretaker/Landlord Name</td>
                      <td>{rentDataDetail?.contactPersonName}</td>
                    </tr>
                    <tr>
                      <td>Caretaker/Landlord Phone</td>
                      <td>{rentDataDetail?.contactPersonPhoneNo}</td>
                    </tr>
                   {rentDataDetail?.contactPersonEmail?.length > 0 && (
                     <tr>
                     <td>Caretaker/Landlord Email</td>
                     <td>{rentDataDetail?.contactPersonEmail}</td>
                   </tr>
                   )}
                   {rentDataDetail?.rejectedReason?.length > 0 && (
                     <tr>
                     <td>Rejection Reason</td>
                     <td>{rentDataDetail?.rejectedReason}</td>
                   </tr>
                   )}
                  </tbody>
                </table>
              </div>
                )}
                

              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {rentForm && <RentApartment rentDataDetail={rentDataDetail} />}
    </>
  );
};

export default Rent;
