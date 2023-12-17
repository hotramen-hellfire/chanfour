import { Timestamp } from "firebase/firestore";
export interface Community {
    communityID: string,
    creatorID: string,
    numberOfMembers: number,
    privacyType: 'public' | 'restricted' | 'private'
    createdAt?: Timestamp,
    imageURL?: string;
}