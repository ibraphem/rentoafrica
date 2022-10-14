import React from 'react';
import FullPageLoader from '../loaders/fullPageLoader/FullPageLoader';
import AlertModal from './AlertModal';

const ReduxModalsIndex = () => {
    return (
        <>
           <AlertModal/> 
           <FullPageLoader/>
        </>
    );
};

export default ReduxModalsIndex;