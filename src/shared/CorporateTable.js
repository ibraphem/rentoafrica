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
import TableLoader from "../components/loaders/TableLoader";
import { setConfirmPopUp, setFormModal } from "../redux/slices/modalSlice";
import { useDispatch } from "react-redux";

const CorporateTable = ({apartmentData, itemPerPage, paginate, currentItemsLength, dataLength, loading, currentPage, search}) => {


    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch()

    const approve = (id, title) => {
        dispatch(
          setConfirmPopUp({
            status: true,
            type: "approveCorporate",
            title: "Approval Confirmation",
            desc: `Are you sure you want to approve this organization (${title})? Your approval is a proof of verification.`,
            payload: id,
            buttonText: "Approve",
          })
        );
      }
  
      const decline = (id, title) => {
        dispatch(
          setFormModal({
            status: true,
            type: "declineCorporate",
            title: `Rejection Confirmation (${title})`,
            payload: id,
          })
        );
      }

    return (
        <DataTable className="card-stretch">
        <div className="card-inner position-relative card-tools-toggle">
          <div className="card-title-group">
        
             <div className="card-tools">
          
           </div>
       
            <div className="card-tools mr-n1">
              <ul className="btn-toolbar gx-1">
                <li>
                  <div className="form-control-wrap">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="search..." onChange={(e) => setSearchTerm(e.target.value)} />
                      <div className="input-group-append">
                        <Button color="primary" className="btn-dim" onClick={()=> search(searchTerm)}>
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
              <span className="sub-text">Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span className>Phone</span>
            </DataTableRow>
            <DataTableRow>
              <span>Email</span>
            </DataTableRow>
            <DataTableRow>
              <span>Website</span>
            </DataTableRow>
            <DataTableRow size="lg"> 
              <span className="sub-text">CAC No.</span>
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
                  <DataTableItem key={item.corporateId}>
                    <DataTableRow>
                      <div className="user-info">
                        <span className="tb-lead">{simpleDateString(item?.createdDate)} </span>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <span>{item?.corporateName}</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>{item?.phoneNo}</span>
                    </DataTableRow>
                    <DataTableRow>
                    <span>{item?.email}</span>
                    </DataTableRow>
                    <DataTableRow>
                     <span>{item?.websiteUrl}</span>
                    </DataTableRow>
                    <DataTableRow>
                     <span>{item?.cacNumber}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <Badge
                        color={
                          item.approvalStatusDescription === "Approved"
                            ? "success"
                            : item.approvalStatusDescription === "Pending"
                            ? "warning"
                            : item.approvalStatusDescription === "Declined"
                            ? "danger"
                            : "primary"
                        }
                        size="sm"
                      >
                        {item.approvalStatusDescription}
                      </Badge>
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

                                {item.approvalStatusDescription === "Pending" && (
                                  <>
                                   <li>
                                  <DropdownItem
                                  onClick={() => approve(item.corporateId, item?.corporateName)}
                                  >
                                    Approve
                                  </DropdownItem>
                                </li>

                                <li>
                                  <DropdownItem
                                    onClick={() => decline(item.corporateId, item?.corporateName)}
                                  >
                                    Decline
                                  </DropdownItem>
                                </li>
                                  </>
                                )}
                               
                           
                           {item.approvalStatusDescription === "Rejected" && (
                               <li>
                               <DropdownItem
                                //  onClick={() => decline(item.corporateId, item?.corporateName)}
                               >
                                 Reason
                               </DropdownItem>
                             </li>
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
     ): (
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
          <TableLoader/>
        </div>
      )}
    </div>
     )}
      </DataTable>
    );
};

export default CorporateTable;