import React from 'react';
import Hero from '../components/hero/Hero';
import PublicHeader from '../layout/header/PublicHeader';
import Properties from '../layout/apartment/Properties';
import { rentData } from '../mock/rentData';
import "../assets/css/publicStyles/app.css"
const Home = () => {
    return (
        <>
            <PublicHeader/>
            <Hero/>
            <Properties rentData={rentData} title="Apartment"/>
        </>
    );
};

export default Home;