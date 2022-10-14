import React, { useState } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem, Badge } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  Button,
} from "../components/Component";
import { Link } from "react-router-dom";
import { apartmentData } from "../mock/apartments";
import Layout from "../layout/Index";
import { amountFormat } from "../utils/format";

const AgentDashboard = () => {
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
  
    const onFilterChange = (e) => {
      setSearchText(e.target.value);
    };
  
  
    const toggle = () => setonSearch(!onSearch);
  return (
    <Layout>
      <Head title="DASHBOARD"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Dashboard
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>You have listed a total of 33 Apartments so far.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col md="4">
              <div className="nk-order-ovwg-data sell">
                <div className="amount">15</div>
                <div className="info">
                  <strong>Total Apartment Listed</strong>
                </div>
              </div>
            </Col>

            <Col md="4">
              <div className="nk-order-ovwg-data buy">
                <div className="amount">9</div>
                <div className="info">
                  <strong>Closed Transaction</strong>
                </div>
              </div>
            </Col>

            <Col md="4">
              <div className="nk-order-ovwg-data sell">
                <div className="amount">3</div>
                <div className="info">
                  <strong>Declined</strong>
                </div>
              </div>
            </Col>
          </Row>
        </Block>

        <Block>
          <Block>
            <DataTable className="card-stretch">
              <div className="card-inner position-relative card-tools-toggle">
                <div className="card-title-group">
                  <div className="card-tools">
                    <div className="form-inline flex-nowrap gx-3">
                      <div className="btn-wrap">
                        <Button color="primary">
                          <Icon name="plus"></Icon>
                          <span>Add New</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-tools mr-n1">
                    <ul className="btn-toolbar gx-1">
                      <li>
                        <a
                          href="#search"
                          onClick={(ev) => {
                            ev.preventDefault();
                            toggle();
                          }}
                          className="btn btn-icon search-toggle toggle-search"
                        >
                          <Icon name="search"></Icon>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                  <div className="card-body">
                    {/* <div className="search-content">
                      <Button
                        className="search-back btn-icon toggle-search active"
                        onClick={() => {
                          setSearchText("");
                          toggle();
                        }}
                      >
                        <Icon name="arrow-left"></Icon>
                      </Button>
                      <input
                        type="text"
                        className="border-transparent form-focus-none form-control"
                        placeholder="Search by address or rent fee"
                        value={onSearchText}
                        onChange={(e) => onFilterChange(e)}
                      />
                      <Button className="search-submit btn-icon">
                        <Icon name="search"></Icon>
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
              <DataTableBody compact>
                <DataTableHead>
                  <DataTableRow>
                    <span className="sub-text">Date</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="sub-text">Type</span>
                  </DataTableRow>
                  <DataTableRow size="md">
                    <span className>Address</span>
                  </DataTableRow>
                  <DataTableRow >
                    <span>Rent Fee</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="sub-text">Status</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="sub-text">Payment</span>
                  </DataTableRow>
               
                  <DataTableRow>
                    <span className="sub-text">&nbsp;</span>
                  </DataTableRow>
                </DataTableHead>
                {/*Head*/}
                {apartmentData.length > 0
                  ? apartmentData.map((item) => {
                      return (
                        <DataTableItem key={item.id}>
                          <DataTableRow>
                            <div className="user-info">
                              <span className="tb-lead">{item.date} </span>
                            </div>
                          </DataTableRow>
                          <DataTableRow >
                            <span>{item?.type}</span>
                          </DataTableRow>
                          <DataTableRow size="md">
                            <span>{item?.address}</span>
                          </DataTableRow>
                          <DataTableRow >
                            <span>&#8358;{amountFormat(item?.fee)}</span>
                          </DataTableRow>
                          <DataTableRow>
                            <Badge
                              color={
                                item.status === "Approved"
                                  ? "success"
                                  : item.status === "Pending"
                                  ? "warning"
                                  : item.status === "Declined"
                                  ? "danger"
                                  : "primary"
                              }
                              size="sm"
                            >
                              {item.status}
                            </Badge>
                          </DataTableRow>
                          <DataTableRow size="md">
                            <span>
                              {item?.status === "Closed" && item?.amountPaid !== ""
                                ? item?.amountPaid
                                : item?.status === "Closed" && item?.amountPaid === ""
                                ? "Processing"
                                : "Not Due"}
                            </span>
                          </DataTableRow>
                  
                          <DataTableRow className="nk-tb-col-action">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                tag="a"
                                className="text-soft dropdown-toggle btn btn-sm btn-icon btn-trigger"
                              >
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu right className="dropdown-menu-xs">
                                <ul className="link-list-plain">
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownitem"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      View
                                    </DropdownItem>
                                  </li>
                                  {item.status === "Declined" && (
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        Reason
                                      </DropdownItem>
                                    </li>
                                  )}

                                  {item.status === "Approved" && (
                                    <>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#dropdownitem"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          Request Edit
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#dropdownitem"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          Request Remove
                                        </DropdownItem>
                                      </li>
                                    </>
                                  )}

                                  {item.status === "Pending" && (
                                    <>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#dropdownitem"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          Edit
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#dropdownitem"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          Remove
                                        </DropdownItem>
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </DataTableRow>
                        </DataTableItem>
                      );
                    })
                  : null}
              </DataTableBody>
            </DataTable>
          </Block>
        </Block>
      </Content>
    </Layout>
  );
};

export default AgentDashboard;
