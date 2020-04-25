import Axios, { AxiosInstance } from 'axios';

export interface iNewsItem {
    by: string
    descendants: number
    id: number
    kids:  number[]
    score: number
    time: number
    title: string
    type: string
    url: string
}

export interface iComment {
    by: string
    id: number
    kids: number[]
    parent: number
    text: string
    time: number
    type: string
}

const instance: AxiosInstance = Axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0'
})

export const getLatestNews = async () => {
    let res = await instance.get<number[]>('/topstories.json?print=pretty');

    console.log(res);

    return res.data;
}

export const getItemDataById = async (id: number) => {
    let res = await instance.get<iNewsItem>(`/item/${id}.json?print=pretty`);

    console.log(res.data);

    return res.data;
}

export const getCommentById = async (id: number) => {
    let res = await instance.get<iComment>(`/item/${id}.json?print=pretty`);

    console.log(res);

    return res.data;
}