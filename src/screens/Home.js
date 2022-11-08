import {useEffect} from 'react';
import Hero from '../components/hero/Hero';
import PublicHeader from '../layout/header/PublicHeader';
import Properties from '../layout/apartment/Properties';
import { rentData } from '../mock/rentData';
import "../assets/css/publicStyles/app.css"
import { useDispatch } from 'react-redux';
import { getProperties, updatePagination } from '../redux/slices/propertyListingSlice';
import { useSelector } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.properties)
    const params = data?.params
    const result = data?.properties?.data?.result

    console.log(result);

    useEffect(() => {
        dispatch(getProperties())
       }, [params])

       const loadMore = () => {
        dispatch(updatePagination(data?.params?.pageNumber + 1))
       }

    return (
        <>
            <PublicHeader/>
            <Hero/>
            <Properties rentData={result} title="Apartment" loadMore={loadMore}/>
        </>
    );
};

export default Home;