import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
export interface Community {
    communityID: string,
    creatorID: string,
    numberOfMembers: number,
    privacyType: 'public' | 'restricted' | 'private'
    createdAt?: Timestamp,
    description: string,
    imageURL: string,
    backURL: string,
    numberOfPosts: number,
    activity: number,
}
export interface CommunitySnippet {
    communityID: string,
    isModerator?: boolean,
    imageURL?: string
}
export interface CommunityState {
    mySnippets: CommunitySnippet[];
    currentCommunity?: Community;
}

export const communityState = atom<CommunityState>({
    key: 'communityState',
    default: { mySnippets: [] }
})