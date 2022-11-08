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
import ApartmentTable from "../../shared/ApartmentTable";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getAdminProperties, updateSearchTerm, updateStatus, updatePagination } from "../../redux/slices/adminPropertySlice";
import { useSelector } from "react-redux";
import { sentenceCaseFormat } from "../../utils/format";


const Apartments = () => {
  const dispatch = useDispatch()
  let param = useParams();
  let urlStatus = param?.status

  const data = useSelector((state) => state.adminProperties)
  console.log(data);

  const params = data?.params
  const result = data?.properties?.data?.result

  let status = urlStatus === "pending" ? 1 : urlStatus === "approved" ? 2 : urlStatus === "closed" ? 3 : 4

  useEffect(() => {
    dispatch(updateStatus(status))
  }, [urlStatus, status, dispatch])
  

  useEffect(() => {
    dispatch(getAdminProperties())
   }, [params, dispatch])
  
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
        <Head title="DASHBOARD"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  {sentenceCaseFormat(urlStatus)} Apartments
                </BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <Block>
            <Block>
            <ApartmentTable apartmentData={result?.data} loading={data?.loading} search={search} itemPerPage={params?.pageSize} currentItemsLength={result?.data?.length} dataLength={result?.pagination?.rowCount} currentPage={result?.pagination?.currentPage} paginate={paginate}/>
            </Block>
          </Block>
        </Content>
      </>
    );
};

export default Apartments;