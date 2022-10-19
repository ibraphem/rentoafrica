import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import {
  Block,
  BlockBetween,
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
import Layout from "../layout/Index";
import { amountFormat } from "../utils/format";
import { Link } from "react-router-dom";
import { transactionData } from "../mock/transaction";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

const AgentTransactions = () => {
    return (
        <Layout>
        <Head title="DASHBOARD"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Transaction List
                </BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
  
          <Block>
            <Row className="g-gs">
              <Col md="4">
                <div className="nk-order-ovwg-data sell">
                  <div className="amount">&#8358;{amountFormat(60000)}</div>
                  <div className="info">
                    <strong>Total Earnings</strong>
                  </div>
                </div>
              </Col>
  
              <Col md="4">
                <div className="nk-order-ovwg-data buy">
                <div className="amount">&#8358;{amountFormat(20000)}</div>
                  <div className="info">
                    <strong>Wallet Balance</strong>
                  </div>
                  <div className="title" style={{textAlign:"right", cursor:"pointer"}}>
                    Withdraw
                  </div>
                </div>
              </Col>
  
              <Col md="4">
                <div className="nk-order-ovwg-data sell">
                <div className="amount">&#8358;{amountFormat(40000)}</div>
                  <div className="info">
                    <strong>Total Withdrawal</strong>
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
                            <Link to="new-apartment" style={{ color: "#fff" }}>
                              <span>Add New</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
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
                      <span className>Cash Flow</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className>Type</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Balance</span>
                    </DataTableRow>
                  </DataTableHead>
                  {/*Head*/}
                  {transactionData.length > 0
                    ? transactionData.map((item) => {
                        return (
                          <DataTableItem key={item.id}>
                            <DataTableRow>
                              <div className="user-info">
                                <span className="tb-lead">{item.date} </span>
                              </div>
                            </DataTableRow>
                            <DataTableRow>
                            <span>&#8358;{amountFormat(item?.cashFlow)}</span>
                            {item?.type === "credit" ? (
                                <FaArrowAltCircleUp color="green" style={{marginLeft: 10}}/>
                            ): (
                                <FaArrowAltCircleDown color="red" style={{marginLeft: 10}}/>
                            )}
                            </DataTableRow>
                            <DataTableRow>
                              <div className="user-info">
                                <span>{item.type} </span>
                              </div>
                            </DataTableRow>
                            <DataTableRow>
                              <span>&#8358;{amountFormat(item?.balance)}</span>
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

export default AgentTransactions;