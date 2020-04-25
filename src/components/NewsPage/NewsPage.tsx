import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/store';
import { getPageDataAction } from '../../redux/newsPageReducer';
import { iNewsItem } from '../../api/api';
import { BigLoader } from '../Loader/Loader';
import NewsInfo from '../NewsInfo/NewsInfo';
import CommentItem from '../CommentItem/CommentItem';
import './NewsPage.scss';

interface iNewsPageProps {
    match: {
        params: {
            id: string
        }
    },
    data: iNewsItem
    comments: number[]
    isFetching: boolean
    getPageDataAction: (id: number) => void
}

const NewsPage: React.FC<iNewsPageProps> = ({ match: {params: {id}}, data, comments, isFetching, getPageDataAction}) => {
    let [itemId, setItemId] = useState<number>(parseInt(id));

    useEffect(() => {
        setItemId(parseInt(id));
    }, [id])

    useEffect(() => {
        getPageDataAction(itemId);
    }, [itemId, getPageDataAction])

    console.log(comments)

    return <Fragment>
        {
            isFetching ?
            <BigLoader />
            :
            <div style={{width: '80%', margin: '30px auto 0'}}>
                <NewsInfo itemData={data} isLinkAble={true} />

                <div className='page-comment-list'>
                    <p className='page-comment-list-title'>Comments</p>

                    {
                        comments.length ?
                        comments.map((commentId: number, index: number) => {
                            return <CommentItem key={index} id={commentId} />
                        })
                        :
                        <p style={{alignSelf: 'center', fontSize: '22px'}}>No comments</p>
                    }
                </div>
            </div>
        }
    </Fragment>
}

let mapStateToProps = (state: StoreState) => ({
    data: state.page.data,
    isFetching: state.page.isFetching,
    comments: state.page.comments
})

const NewsPageComponent: any = compose(
    withRouter,
    connect(mapStateToProps, { getPageDataAction })
)(NewsPage);

export default NewsPageComponent;