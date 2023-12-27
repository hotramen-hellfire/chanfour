import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';
export type Post = {
    id: string,
    communityID: string,
    creatorID: string,
    creatorUName: string,
    title: string,
    body: string,
    createdAt: Timestamp,
    numberOfComments: number,
    voteStatus: number,
    imageURL?: string,
    embedURL?: string,
    communityImageURL?: string;
    activity: number,
    ytURL: string
}

interface PostState {
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
}

export type PostVote = {
    postID: string,
    voteValue: number;
    communityID: string,
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
    postVotes: [],
};

export const PostState = atom<PostState>({
    key: "postState",
    default: defaultPostState,
})

export type CommentObject = {
    id: string,
    creatorID: string,
    creatorUName: string,
    text: string,
    createdAt: Timestamp,
    color: string
}