import {useState, useEffect} from "react"
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-dropdown-select";
import { lgas } from "../../mock/lgas";
import { states } from "../../mock/state";
import "../../assets/css/publicStyles/findHome.css"
import {  propertyTypes } from "../../mock/apartments";

const FindHome = () => {
  const [selectedState, setSelectedState] = useState([])
  const [allLGAs, setAllLGAs] = useState([])
  const [selectedLGAs, setSelectedLGAs] = useState([])

  useEffect(() => {
    if(selectedState.length > 0) {
      const lga = lgas.filter((lga) => lga?.state_id === selectedState[0]?.id)
      setAllLGAs(lga)
    }
  }, [selectedState])

  
    return (
        <section className="gauto-find-area" style={{marginBottom: "20px"}}>
        <Container>
          <Row>
            <Col md={12}>
              <div className="find-box">
                <Row className="align-items-center">
                  <Col md={4}>
                    <div className="find-text">
                      <h3>Look for rent</h3>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="find-form">
                      <form >
                        <Row>
                          <Col md={4}>
                            <div className="searchselect">
                            <Select
                            options={states}
                            labelField="name"
                            color="#000080"
                            // className="form-control"
                            valueField="name"
                            onChange={(values) =>
                              setSelectedState(values)
                            }
                            placeholder="Search State"
                          />
                        </div>
                          </Col>
                          <Col md={4}>
                          <div className="searchselect">
                            <Select
                            options={allLGAs}
                            labelField="name"
                            color="#000080"
                            // className="form-control"
                            valueField="name"
                            onChange={(values) =>
                              setSelectedLGAs(values)
                            }
                            placeholder="Search LGA/Area"
                          />
                        </div>
                          </Col>
                          <Col md={4}>
                            <p>
                              <select placeholder="Property type">
                                {propertyTypes.map((apartment)=> (
                                  <option key={apartment?.value}>{apartment?.text}</option>
                                ))}
                              </select>
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                          <p>
                              <input
                                type="text"
                                placeholder="Min Rent Fee"
                              />
                            </p>
                          </Col>
                          <Col md={4}>
                          <p>
                              <input
                                type="text"
                                placeholder="Max Rent Fee"
                              />
                            </p>
                          </Col>
                          <Col md={4}>
                            <p>
                              <button type="submit" className="gauto-theme-btn">
                                Search Rent
                              </button>
                            </p>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
};

export default FindHome;