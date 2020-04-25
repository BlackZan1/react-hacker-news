import { getLatestNews } from "../api/api";
import { ActionType } from "./store";

const SET_DATA = 'news/SET_DATA', TOGGLE_FETCHING = 'news/TOGGLE_FETCHING';

interface NewsItem {
    by: string
    descendants: number
    id: number
    score: number
    time: number
    title: string
    type: string
}

type NewsData = Array<number[]>

let initialState = {
    data: [] as NewsData,
    isFetching: true
}

export type NewsState = typeof initialState;

type NewsActionType =
    | ActionType<typeof SET_DATA, {data: Array<number[]>}>
    | ActionType<typeof TOGGLE_FETCHING, {isFetch: boolean}>

const newsReducer = (state: NewsState = initialState, action: NewsActionType) => {
    switch(action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.data
            }
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.isFetch
            }
        default:
            return state;
    }
}

export const setDataAction = (data: NewsData): NewsActionType => ({type: SET_DATA, data});
export const toggleIsFetching = (isFetch: boolean): NewsActionType => ({type: TOGGLE_FETCHING, isFetch});

export const getDataAction = () => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    let res: number[] = await getLatestNews();
    let newData: Array<number[]> = [];
    let dataIndex = 0;

    res.forEach((item: number, index: number) => {
        let moduleIndex = (index + 1) % 35;

        if(moduleIndex === 1) {
            newData.push([]);
            newData[dataIndex].push(item);
        }
        else if(moduleIndex === 0) {
            newData[dataIndex].push(item);
            dataIndex++;
        }
        else newData[dataIndex].push(item);
    })

    dispatch(setDataAction(newData));
    dispatch(toggleIsFetching(false));
}

export default newsReducer;