import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getRentRequest } from '../../redux/slices/rentRequestSlice';
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Block
} from "../../components/Component";
import Properties from '../../layout/apartment/Properties';

const RentRequest = () => {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.rentRequest)

  
    const params = data?.params
    const result = data?.rents?.data?.result?.data

    // console.log(result);

    useEffect(() => {
        dispatch(getRentRequest())
       }, [params, dispatch])

    return (
        <>
      <Head title="Rent Request"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Rent Request
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
            <Block>
            <Properties rentData={result} cancel={true} loading={data?.loading}/>
            </Block>
          </Block>
      
      </Content>
    </>
    );
};

export default RentRequest;