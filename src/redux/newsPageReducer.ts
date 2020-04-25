import { iNewsItem, getItemDataById } from "../api/api";
import { ActionType } from "./store";

const SET_DATA = 'page/SET_DATA', SET_COMMENTS = 'SET_COMMENTS', TOGGLE_FETCHING = 'page/TOGGLE_FETCHING';

let initialState = {
    data: {} as iNewsItem,
    comments: [] as number[],
    isFetching: true
}

type NewsPageAction =
    | ActionType<typeof SET_DATA, {data: iNewsItem}>
    | ActionType<typeof SET_COMMENTS, {comments: number[]}>
    | ActionType<typeof TOGGLE_FETCHING, {isFetch: boolean}>

export type NewsPageState = typeof initialState;

const newsPageReducer = (state: NewsPageState = initialState, action: NewsPageAction) => {
    switch(action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.data
            }
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.comments
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

const setPageDataAction = (data: iNewsItem): NewsPageAction => ({type: SET_DATA, data}); 
const setCommentsAction = (comments: number[]): NewsPageAction => ({type: SET_COMMENTS, comments}); 
const toggleIsFetching = (isFetch: boolean): NewsPageAction => ({type: TOGGLE_FETCHING, isFetch}); 

export const getPageDataAction = (id: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    let res: iNewsItem = await getItemDataById(id);

    dispatch(setPageDataAction(res));
    dispatch(setCommentsAction(res.descendants ? res.kids : []));
    dispatch(toggleIsFetching(false));
}

export default newsPageReducer;