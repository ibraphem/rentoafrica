import { useEffect } from "react";
import Hero from "../components/hero/Hero";
import PublicHeader from "../layout/header/PublicHeader";
import Properties from "../layout/apartment/Properties";
import "../assets/css/publicStyles/app.css";
import { useDispatch } from "react-redux";
import { getProperties } from "../redux/slices/propertyListingSlice";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.properties);
  // console.log(data?.loading);
  const params = data?.params;
  const result = data?.properties?.data?.result?.data;

  useEffect(() => {
    dispatch(getProperties());
  }, [params, dispatch]);

  //    const loadMore = () => {
  //     dispatch(updatePagination(data?.params?.pageNumber + 1))
  //    }

  return (
    <>
      <PublicHeader />
      <Hero />
      <section className="gauto-offers-area section_70">
        <Container>
        <Row>
          <Col md={12}>
            <div className="site-heading">
              <h2>Apartments</h2>
            </div>
          </Col>
        </Row>
          <Properties rentData={result} title="Apartment" loading={data?.loading} />
        </Container>
      </section>
    </>
  );
};

export default Home;
