import React, { useState } from 'react';
import { Community, communityState } from '../components/atoms/communitiesAtom';
import { useRecoilState } from 'recoil';

const useCommunityData = () => {
    const [commmunityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const [leading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        //is the user signed in
        //if not open auth modal state

        if (isJoined) {
            leaveCommunity(communityData.communityID);
            return;
        }
        else {
            joinCommunity(communityData);
            return;
        }
    }
    const getMySnippets = async () => {
        try {

        } catch (error: any) {
            console.log('getMySnippets error: ', error);
            setError(error);
        }
    }
    const joinCommunity = (communityData: Community) => { };
    const leaveCommunity = (communityID: string) => { };
    return {
        commmunityStateValue,
        onJoinOrLeaveCommunity
    }
}
export default useCommunityData;