import React from 'react';
import PublicHeader from '../layout/header/PublicHeader';
import Properties from '../layout/apartment/Properties';
import PageTitle from '../layout/pageTitle/PageTitle';
import { rentData } from '../mock/rentData';
import Rent from '../layout/apartment/Rent';

const RentDetail = () => {
    return (
        <>
            <PublicHeader/>
            <PageTitle pagesub="Details" pageTitle="2 Bedroom Flat In Ikeja"/>
            <Rent/>
            <Properties rentData={rentData} title="Related Properties" />
        </>
    );
};

export default RentDetail