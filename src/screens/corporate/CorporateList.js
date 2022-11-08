import { useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../components/Component";

import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getCorporates, updateSearchTerm, updateStatus } from "../../redux/slices/corporateSlice";
import { useSelector } from "react-redux";
import CorporateTable from "../../shared/CorporateTable";
import { sentenceCaseFormat } from "../../utils/format";

const CorporateList = () => {
    const dispatch = useDispatch()
    let param = useParams();
    let urlStatus = param?.status

    const data = useSelector((state) => state.corporates)

    console.log(data);

    const params = data?.params
    const result = data?.corporates?.data?.result
  
    let status = urlStatus === "pending" ? 1 : urlStatus === "approved" ? 2 : urlStatus === "closed" ? 3 : 4

    useEffect(() => {
        dispatch(updateStatus(status))
      }, [urlStatus, status])
      
    
      useEffect(() => {
        dispatch(getCorporates())
       }, [params])
      
       const paginate = (pageNumber) => dispatch(updatePagination(pageNumber));
    
       const search = (searchTerm) => {
        if(searchTerm === ""){
          dispatch(updateSearchTerm(null))
        }else{
          dispatch(updateSearchTerm(searchTerm))
        }
        
      }
    return (
        <>
        <Head title="Corporate List"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  {sentenceCaseFormat(urlStatus)} Organizations
                </BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <Block>
            <Block>
            <CorporateTable apartmentData={result?.data} loading={data?.loading} search={search} itemPerPage={params?.pageSize} currentItemsLength={result?.data?.length} dataLength={result?.pagination?.rowCount} paginate={paginate}/>
            </Block>
          </Block>
        </Content>
      </>
    );
};

export default CorporateList;