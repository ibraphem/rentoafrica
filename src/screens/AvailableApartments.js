import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Properties from '../layout/apartment/Properties';
import Content from '../layout/content/Content';
import { getProperties } from '../redux/slices/propertyListingSlice';
import Head from '../layout/head/Head';
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Block
} from "../components/Component";




const AvailableApartments = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.properties)
    const params = data?.params
    const result = data?.properties?.data?.result?.data

    useEffect(() => {
        dispatch(getProperties())
       }, [params, dispatch])


    return (
        <>
        <Head title="Apartments for rent"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Apartments For Rent
                </BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
  
          <Block>
              <Block>
              <Properties rentData={result} loading={data?.loading}/>
              </Block>
            </Block>
        
        </Content>
      </>
 
    );
};

export default AvailableApartments;