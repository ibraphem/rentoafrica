import { useState } from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem, Badge } from "reactstrap";
import {
  Icon,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  Button,
  PaginationComponent,
} from "../components/Component";
import { amountFormat, simpleDateString } from "../utils/format";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TableLoader from "../components/loaders/TableLoader";
import { setConfirmPopUp, setFormModal } from "../redux/slices/modalSlice";
import { useDispatch } from "react-redux";

const ApartmentTable = ({
  apartmentData,
  itemPerPage,
  paginate,
  currentItemsLength,
  dataLength,
  loading,
  currentPage,
  search,
}) => {
  const role = useSelector((state) => state.user?.user?.role);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const approve = (id, title) => {
    dispatch(
      setConfirmPopUp({
        status: true,
        type: "approveApartment",
        title: "Approval Confirmation",
        desc: `Are you sure you want to approve this apartment (${title})? Your approval will immediately make this property available for rent to prospective customers.`,
        payload: id,
        buttonText: "Approve",
        showActionBtn: true,
      })
    );
  };

  const decline = (id, title) => {
    dispatch(
      setFormModal({
        status: true,
        type: "declineApartment",
        title: `Rejection Confirmation (${title})`,
        payload: id,
      })
    );
  };

  const rejectionReason = (reason, title) => {
    dispatch(
      setConfirmPopUp({
        status: true,
        type: "rejectionReason",
        title: `(${title})`,
        desc: reason,
        showActionBtn: false,
      })
    );
  };

  const remove = (id, title) => {
    dispatch(
      setConfirmPopUp({
        status: true,
        type: "removeApartment",
        title: "Deletion Confirmation",
        desc: `Are you sure you want to remove this apartment (${title}).`,
        payload: id,
        buttonText: "Delete",
        showActionBtn: true,
      })
    );
  };



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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search..."
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append">
                      <Button color="primary" className="btn-dim" onClick={() => search(searchTerm)}>
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
            <span className="sub-text">Title</span>
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
        {currentItemsLength > 0
          ? apartmentData.map((item) => {
              return (
                <DataTableItem key={item.propertyId}>
                  <DataTableRow>
                    <div className="user-info">
                      <span className="tb-lead">{simpleDateString(item?.createdDate)} </span>
                    </div>
                  </DataTableRow>
                  <DataTableRow>
                    <span>{item?.propertyName}</span>
                  </DataTableRow>
                  <DataTableRow size="md">
                    <span>{item?.address}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span>&#8358;{amountFormat(item?.propertyAmount)}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <Badge
                      color={
                        item.propertyStatusDescription === "Approved"
                          ? "success"
                          : item.propertyStatusDescription === "Pending"
                          ? "warning"
                          : item.propertyStatusDescription === "Rejected"
                          ? "danger"
                          : "primary"
                      }
                      size="sm"
                    >
                      {item.propertyStatusDescription}
                    </Badge>
                  </DataTableRow>

                  {role === "Agent" ? (
                    <DataTableRow className="nk-tb-col-action">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-sm btn-icon btn-trigger">
                          <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-xs">
                          <ul className="link-list-plain">
                            <li>
                              <DropdownItem onClick={() => history.push(`/apartmentdetails/${item.propertyId}`)}>
                                View
                              </DropdownItem>
                            </li>
                            {item.propertyStatusDescription === "Rejected" && (
                              <li>
                                   <DropdownItem onClick={() => rejectionReason(item.rejectedReason, item?.propertyName)}>
                                  Reason
                                </DropdownItem>
                              </li>
                            )}


                            {item.propertyStatusDescription === "Pending" && (
                              <>
                                <li>
                                  <DropdownItem
                                    onClick={() => history.push(`/apartmentedit/${item.propertyId}`)}>
                                    Edit
                                  </DropdownItem>
                                </li>
                                <li>
                                <DropdownItem onClick={() => remove(item.propertyId, item?.propertyName)}>
                                  Delete
                                </DropdownItem>
                                </li>
                              </>
                            )}
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </DataTableRow>
                  ) : (
                    <DataTableRow className="nk-tb-col-action">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-sm btn-icon btn-trigger">
                          <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-xs">
                          <ul className="link-list-plain">
                            <li>
                              <DropdownItem onClick={() => history.push(`/apartmentdetails/${item.propertyId}`)}>
                                View
                              </DropdownItem>
                            </li>
                            {item.propertyStatusDescription === "Pending" && (
                              <>
                                <li>
                                  <DropdownItem onClick={() => approve(item.propertyId, item?.propertyName)}>
                                    Approve
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem onClick={() => decline(item.propertyId, item?.propertyName)}>
                                    Decline
                                  </DropdownItem>
                                </li>
                                <li>
                                <DropdownItem
                                    onClick={() => history.push(`/apartmentedit/${item.propertyId}`)}>
                                    Edit
                                  </DropdownItem>
                                </li>
                              </>
                            )}
                            {item.propertyStatusDescription === "Rejected" && (
                              <li>
                                <DropdownItem onClick={() => rejectionReason(item.rejectedReason, item?.propertyName)}>
                                  Reason
                                </DropdownItem>
                              </li>
                            )}

                            {item.propertyStatusDescription === "Approved" && (
                              <>
                                <li>
                                  <DropdownItem onClick={() => decline(item.propertyId, item?.propertyName)}>
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
      {!loading ? (
        <div className="card-inner">
          {currentItemsLength > 0 ? (
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={dataLength}
              paginate={paginate}
              currentPage={currentPage}
            />
          ) : (
            <div className="text-center">
              <span className="text-silent">No data found</span>
            </div>
          )}
        </div>
      ) : (
        <div className="card-inner">
          {currentItemsLength > 0 ? (
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={dataLength}
              paginate={paginate}
              currentPage={currentPage}
            />
          ) : (
            <div className="text-center">
              <TableLoader />
            </div>
          )}
        </div>
      )}
    </DataTable>
  );
};

export default ApartmentTable;
