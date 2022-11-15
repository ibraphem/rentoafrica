import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {Block } from '../components/Component';
import Properties from '../layout/apartment/Properties';
import Content from '../layout/content/Content';
import Head from '../layout/head/Head';
import { getProperties } from '../redux/slices/propertyListingSlice';



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
        <Head title="Apartments for rents"></Head>
        <Content>
            <Block>
            <Properties rentData={result} title="Apartment For Rent"/>
            </Block>
        </Content>
        </>
 
    );
};

export default AvailableApartments;