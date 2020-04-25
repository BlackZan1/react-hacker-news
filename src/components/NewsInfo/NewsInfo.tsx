import React, { Fragment } from 'react';
import { iNewsItem } from '../../api/api';
import LikeIMG from '../../img/like.png';
import './NewsInfo.scss';

interface iNewsInfoProps {
    itemData: iNewsItem | any
    isLinkAble: boolean
}

const NewsInfo: React.FC<iNewsInfoProps> = ({ itemData, isLinkAble }) => {
    let time: string | any = itemData?.time && new Date(itemData.time * 1000).toLocaleString();

    return (
        <Fragment>
            <div className='news-item-title'>
                {
                    itemData?.title
                }

                {
                    !isLinkAble ? <p>({itemData.url})</p> : <p> Link:</p>
                }

                {
                    itemData?.url && isLinkAble && <a href={itemData.url} rel="noopener noreferrer" target="_blank">({itemData.url})</a>
                }
            </div>

            <div className='news-item-info'>
                <p>
                    {itemData?.score} <img style={{width: '20px', margin: '5px 5px 0 5px'}} src={LikeIMG} alt="like" />   by <span style={{color: '#000', fontWeight: 500}}>{itemData?.by}</span> <span>({itemData?.descendants} comments)</span>
                </p>

                <p>
                    {time}
                </p>
            </div>
        </Fragment>
    )
}

export default NewsInfo;