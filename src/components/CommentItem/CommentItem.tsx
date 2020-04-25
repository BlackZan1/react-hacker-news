import React, { useState, useEffect, Fragment } from 'react';
import { getCommentById, iComment } from '../../api/api';
import { SmallLoader } from '../Loader/Loader';
import './CommentItem.scss';

interface iCommentItemProps {
    id: number
}

const CommentItem: React.FC<iCommentItemProps> = ({ id }) => {
    let [itemData, setItemData] = useState<iComment>();
    let [isFetching, setIsFetching] = useState<boolean>(true);
    let [childClose, setChildClose] = useState<boolean>(false);

    useEffect(() => {
        setIsFetching(true);

        getCommentById(id).then(res => {
            setItemData(res);

            setIsFetching(false);
        });
    }, [id])

    const closeChildHandler = () => {
        setChildClose(!childClose);
    }

    let time: string | any = itemData?.time && new Date(itemData.time * 1000).toLocaleString();

    return (
        <div className='page-comment-item'>
            {
                isFetching ?
                <SmallLoader />
                :
                <Fragment>
                    <div className='page-comment-item-info'>
                        <div>
                            {
                                itemData?.by
                            }

                            {
                                itemData?.kids && (
                                    <button style={{display: 'inline'}} onClick={closeChildHandler}>
                                        {
                                            childClose ? '+' : '-'
                                        }
                                    </button>
                                )
                            }
                        </div>
                        
                        <span>
                            {
                                time
                            }
                        </span>
                    </div>

                    <div className='page-comment-item-title' dangerouslySetInnerHTML={{__html: itemData?.text ? itemData.text : '<p>...</p>'}}></div>

                    {
                        itemData?.kids && !childClose ?
                        <div className='page-comment-item-child'>
                            {
                                itemData.kids.map((commentId: number, index: number) => {
                                    return <CommentItem key={index} id={commentId} />
                                })
                            }
                        </div>
                        :
                        null
                    }
                </Fragment>
            }
        </div>
    )
}

export default CommentItem;