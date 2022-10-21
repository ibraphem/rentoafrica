import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem, Badge } from "reactstrap";
import {
  Icon,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  Button,
} from "../components/Component";
import { amountFormat } from "../utils/format";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ApartmentTable = ({apartmentData}) => {
    const role = useSelector((state) => state.user?.user?.role)
    return (
        <DataTable className="card-stretch">
        <div className="card-inner position-relative card-tools-toggle">
          <div className="card-title-group">
        
             <div className="card-tools">
              {role === "Agent" && (
                 <div className="form-inline flex-nowrap gx-3">
                 <div className="btn-wrap">
                   <Button color="primary">
                     <Icon name="plus"></Icon>
                     <Link to="new-apartment" style={{ color: "#fff" }}>
                       <span>Add New</span>
                     </Link>
                   </Button>
                 </div>
               </div>
              )}
           </div>
       
            <div className="card-tools mr-n1">
              <ul className="btn-toolbar gx-1">
                <li>
                  <div className="form-control-wrap">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="search..." />
                      <div className="input-group-append">
                        <Button color="primary" className="btn-dim">
                        <Icon name="search"></Icon>
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
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
            <DataTableRow>
              <span>Rent Fee</span>
            </DataTableRow>
            <DataTableRow size="lg">
              <span className="sub-text">Status</span>
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
                    <DataTableRow>
                      <span>{item?.type}</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>{item?.address}</span>
                    </DataTableRow>
                    <DataTableRow>
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
           
                      {role === "Agent" ? (
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
                      ): (
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
                                       Remove
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
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownitem"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      Approve
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
                                      Decline
                                    </DropdownItem>
                                  </li>
                                </>
                              )}
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </DataTableRow>
                      )}
                  
                  </DataTableItem>
                );
              })
            : null}
        </DataTableBody>
      </DataTable>
    );
};

export default ApartmentTable;