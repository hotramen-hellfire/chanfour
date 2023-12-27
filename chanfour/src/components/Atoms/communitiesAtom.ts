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


export interface communityFunctions {
    onJoinOrLeaveCommunity: (communityData: Community, isJoined: boolean) => Promise<void>
    loading: boolean
    updateBID: (communityData: Community, updates: { description: string, imageURL: string, backURL: string }) => Promise<void>
}

export const communityFunctionsState = atom<communityFunctions>({
    key: 'communityFunctionState',
    default: {
        onJoinOrLeaveCommunity: async (communityData: Community, isJoined: boolean) => { return; },
        loading: false,
        updateBID: async (communityData: Community, updates: { description: string, imageURL: string, backURL: string }) => {
            return
        }
    }
})