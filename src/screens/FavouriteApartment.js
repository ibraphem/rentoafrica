import React from 'react';
import { useSelector } from 'react-redux';
import PublicHeader from '../layout/header/PublicHeader';
import Properties from '../layout/apartment/Properties';
import PageTitle from '../layout/pageTitle/PageTitle';
import Error from '../layout/error/Error';


const FavouriteApartment = () => {
    const favRent = useSelector((state) => state?.favoriteRent?.rent);
    const data = useSelector((state) => state.properties)
    const result = data?.properties?.data?.result?.data

    // console.log(favRent);
    return (
        <>
            <PublicHeader/>
            <PageTitle pagesub="Favourites" pageTitle="Favorite Apartments"/>
            {favRent?.length > 0 ? (
                <>
                      <Properties rentData={favRent} title="Your Favorites" isfavScreen={true}/>
                      {/* <Properties rentData={result} title="Related Properties" /> */}
                      </>
            ): (
                <Error errorTitle="No Favorites was found" errorDesc="We couldn't do find any property on your list of favorites. Browse through our enlisted property lists and and some to favorite."/>
            )}
      
        </>
    );
};

export default FavouriteApartment;