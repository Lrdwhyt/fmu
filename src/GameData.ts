export interface GameData {
    user: string;
    content: string;
    link: number;
    time: Date;
}

export interface PostData {
    [post: number]: GameData;
    last?: number;
}

export interface PageData {
    [page: number]: PostData
}