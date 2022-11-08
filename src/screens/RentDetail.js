import {useEffect, useState} from 'react';
import PublicHeader from '../layout/header/PublicHeader';
import Properties from '../layout/apartment/Properties';
import PageTitle from '../layout/pageTitle/PageTitle';
import { rentData } from '../mock/rentData';
import Rent from '../layout/apartment/Rent';
import { useParams } from 'react-router';
import { propertyDetail } from '../services/propertyService';

const RentDetail = () => {
const [data, setData] = useState({})
    
  let params = useParams();
  let propertyId = params?.id

//   console.log(propertyId);

    const fetchPropertyDetail = async() => {
        const res = (await propertyDetail(propertyId))?.data
        setData(res?.result)
      }

    useEffect(() => {
        fetchPropertyDetail()
      }, [propertyId])
  
      console.log(data);
      
    return (
        <>
            <PublicHeader/>
            <PageTitle pagesub="Details" pageTitle={data?.propertyName}/>
            <Rent rentDataDetail={data}/>
            <Properties rentData={rentData} title="Related Properties" />
        </>
    );
};

export default RentDetail