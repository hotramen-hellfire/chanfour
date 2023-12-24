import { atom } from "recoil";
export interface communityImageState {
    backImg: string,
    icon: string
}

const defaultCommunityImageState: communityImageState = {
    backImg: 'https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communitiesBack.jpg',
    icon: "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communityDefaultIcon.jpg"
}

export const communityImageState = atom<communityImageState>({
    key: "communityImageState",
    default: defaultCommunityImageState,
})