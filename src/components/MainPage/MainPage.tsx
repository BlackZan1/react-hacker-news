import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/store';
import { getDataAction } from '../../redux/newsReducer';
import NewsItem from '../NewsItem/NewsItem';
import { BigLoader } from '../Loader/Loader';
import ArrowIMG from '../../img/arrow.png';
import './MainPage.scss';

interface iMainPageProps {
    getDataAction: () => void
    news: Array<number[]>
    isFetching: boolean
}

const MainPage: React.FC<iMainPageProps> = ({ getDataAction, news, isFetching }) => {
    let [newsIndex, setNewsIndex] = useState<number>(0);

    useEffect(() => {
        getDataAction();
    }, [getDataAction])

    const toggleNewsIndexNext = () => {
        if(news.length <= newsIndex) return;
        
        setNewsIndex(newsIndex + 1);
    }

    const toggleNewsIndexPrev = () => {
        if((newsIndex - 1) < 0) return;

        setNewsIndex(newsIndex - 1);
    }

    const showListCount = () => {
        return (
            <div className='main-list-count'>
                <p>Page № {newsIndex + 1}</p>

                {
                    (newsIndex + 1) !== news.length && <button onClick={toggleNewsIndexNext}>
                        Next <img src={ArrowIMG} alt=">" className='arrow-icon' />
                    </button>
                }
                {
                    newsIndex !== 0 && <button onClick={toggleNewsIndexPrev}>
                        <img src={ArrowIMG} alt="<" className='arrow-icon' style={{transform: 'scale(-1, 1)', marginLeft: '0px', marginRight: '5px'}} /> Prev
                    </button>
                }
            </div>
        )
    }

    return <Fragment>
        {
            isFetching ?
            <BigLoader />
            :
            <Fragment>
                {
                    showListCount()
                }

                <div className="main-list">
                    {
                        news.length ?
                        news[newsIndex].map((id: number, index: number) => {
                            return <NewsItem key={index} id={id} />
                        })
                        :
                        <p>No news</p>
                    }
                </div>

                {
                    showListCount()
                }
            </Fragment>
        }
    </Fragment>
}

let mapStateToProps = (state: StoreState) => ({
    news: state.news.data,
    isFetching: state.news.isFetching
})

const MainPageComponent: any = connect(mapStateToProps, { getDataAction })(MainPage);

export default MainPageComponent;