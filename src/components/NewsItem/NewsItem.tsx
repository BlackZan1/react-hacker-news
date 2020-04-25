import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getItemDataById, iNewsItem } from '../../api/api';
import { SmallLoader } from '../Loader/Loader';
import { NavLink } from 'react-router-dom';
import NewsInfo from '../NewsInfo/NewsInfo';
import './NewsItem.scss';

interface iNewsItemProps {
    id: number
}

const NewsItem: React.FC<iNewsItemProps> = ({ id }) => {
    let [itemData, setItemData] = useState<iNewsItem>();
    let [isFetching, setIsFetching] = useState<boolean>(true);

    useEffect(() => {
        setIsFetching(true);

        getItemDataById(id).then(res => {
            setItemData(res);

            setIsFetching(false);
        });
    }, [id])

    return (
        <NavLink to={`/item/${id}`} className='news-item'>
            {
                isFetching ?
                <SmallLoader />
                :
                <NewsInfo itemData={itemData} isLinkAble={false} />
            }
        </NavLink>
    )
}

const NewsItemComponent: any = connect(null, {})(NewsItem);

export default NewsItemComponent;