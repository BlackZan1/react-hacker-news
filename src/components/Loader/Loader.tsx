import React from 'react';
import loaderIMG from '../../img/loader.gif';
import BigLoaderIMG from '../../img/bigLoader.gif';

export const SmallLoader: React.FC = () => {
    return (
        <img src={loaderIMG} style={{width: '100px'}} alt="Loading..."/>
    )
}

export const BigLoader: React.FC = () => {
    return <div className="big-loader">
        <img src={BigLoaderIMG} alt="Loading..."/>
    </div>
}