import {useEffect} from 'react';
import Hero from '../components/hero/Hero';
import PublicHeader from '../layout/header/PublicHeader';
import Properties from '../layout/apartment/Properties';
import "../assets/css/publicStyles/app.css"
import { useDispatch } from 'react-redux';
import { getProperties, updatePagination } from '../redux/slices/propertyListingSlice';
import { useSelector } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.properties)
    const params = data?.params
    const result = data?.properties?.data?.result?.data

    useEffect(() => {
        dispatch(getProperties())
       }, [params, dispatch])

    //    const loadMore = () => {
    //     dispatch(updatePagination(data?.params?.pageNumber + 1))
    //    }

    return (
        <>
            <PublicHeader/>
            <Hero/>
            <Properties rentData={result} title="Apartment"/>
        </>
    );
};

export default Home;