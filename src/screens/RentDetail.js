import {useEffect, useState} from 'react';
import PublicHeader from '../layout/header/PublicHeader';
import Properties from '../layout/apartment/Properties';
import PageTitle from '../layout/pageTitle/PageTitle';
import Rent from '../layout/apartment/Rent';
import { useParams } from 'react-router';
import { propertyDetail } from '../services/propertyService';
import { useSelector } from 'react-redux';

const RentDetail = () => {
const [data, setData] = useState({})
const rentData = useSelector((state) => state.properties?.properties?.data?.result)
    
  let params = useParams();
  let propertyId = params?.id



    useEffect(() => {
      const fetchPropertyDetail = async() => {
        const res = (await propertyDetail(propertyId))?.data
        setData(res?.result)
      }

      fetchPropertyDetail()
      }, [propertyId])

      
    return (
        <>
            <PublicHeader/>
            <PageTitle pagesub="Details" pageTitle={data?.propertyName}/>
            <Rent rentDataDetail={data} rentForm={true}/>
            {/* <Properties rentData={rentData} title="Related Properties" /> */}
        </>
    );
};

export default RentDetail