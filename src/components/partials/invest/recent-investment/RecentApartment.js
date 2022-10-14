import React from "react";
import UserAvatar from "../../../user/UserAvatar";
import Icon from "../../../icon/Icon";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Progress, UncontrolledDropdown } from "reactstrap";
import { DataTableHead, DataTableItem, DataTableRow } from "../../../table/DataTable";
import { findUpper } from "../../../../utils/Utils";
import { investData } from "./InvestData";

const RecentInvest = () => {
  return (
    <React.Fragment>
      {" "}
      <div className="card-inner border-bottom">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Recent Listing</h6>
          </div>
          <div className="card-tools">
            <a
              href="#all"
              onClick={(ev) => {
                ev.preventDefault();
              }}
              className="link"
            >
              View All
            </a>
          </div>
        </div>
      </div>
      <div className="nk-tb-list">
      <DataTableHead>
              
              <DataTableRow>
                <span className="sub-text">Date</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Type</span>
              </DataTableRow>
              <DataTableRow>
                <span className>Address</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>Rent Fee</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Status</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Payment</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Wallet Status</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">&nbsp;</span>
              </DataTableRow>
            </DataTableHead>
        {investData.map((item) => {
          return (
            <DataTableItem key={item.id}>
            <DataTableRow>
              <div className="user-info">
                <span className="tb-lead">{item.date} </span>
              </div>
            </DataTableRow>
            <DataTableRow>
              <span>{item?.type}</span>
            </DataTableRow>
            <DataTableRow>
              <span>{item?.address}</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>{item?.fee}</span>
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
              : "closed"
          }
          size="sm"
        >
          {item.status}
        </Badge>
            </DataTableRow>
            <DataTableRow size="lg">
              <span>{item?.status === "Closed" && item?.amountPaid !== "" ? item?.amountPaid : item?.status === "Closed" && item?.amountPaid === "" ? "Processing" : "Not Due"}</span>
            </DataTableRow>
            <DataTableRow size="lg">
              <span>{item?.status === "Closed" && item?.withdraw && item.amountPaid !== "" ? "Cashed Out" : item?.status === "Closed" && !item?.withdraw  && item.amountPaid !== "" ? "In Wallet" : null}</span>
            </DataTableRow>
            <DataTableRow className="nk-tb-col-action" size="lg">
                <UncontrolledDropdown>
                  <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-sm btn-icon btn-trigger">
                  <Icon name="more-h"></Icon>
                  </DropdownToggle >
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
                           Preview
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
                      </li></>
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
        })}
      </div>
    </React.Fragment>
  );
};

export default RecentInvest;
