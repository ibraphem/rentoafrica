import React from 'react';
import FullPageLoader from '../loaders/fullPageLoader/FullPageLoader';
import AlertModal from './AlertModal';
import ConfirmationModal from './ConfirmationModal';
import FormModal from './FormModal';

const ReduxModalsIndex = () => {
    return (
        <>
           <AlertModal/> 
           <FullPageLoader/>
           <ConfirmationModal/>
           <FormModal/>
        </>
    );
};

export default ReduxModalsIndex;