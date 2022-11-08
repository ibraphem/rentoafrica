import React from 'react';
import { BlockBetween, BlockHead,BlockHeadContent, BlockTitle, Block } from '../components/Component';
import Properties from '../layout/apartment/Properties';
import Content from '../layout/content/Content';
import Head from '../layout/head/Head';
import Layout from '../layout/Index';
import { rentData } from '../mock/rentData';

const AvailableApartments = () => {
    return (
        <Layout>
        <Head title="Apartments for rents"></Head>
        <Content>
            <Block>
            <Properties rentData={rentData}/>
            </Block>
         
        
        </Content>
      </Layout>
    );
};

export default AvailableApartments;