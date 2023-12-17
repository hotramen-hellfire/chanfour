import React, { useEffect, useState } from 'react';
import { Community, communityState } from '../components/atoms/communitiesAtom';
import { useRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication, firestore } from '../firebase/clientApp';
import { getDocs, collection } from 'firebase/firestore';

const useCommunityData = () => {
    const [commmunityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const [leading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user] = useAuthState(authentication)
    var uid = "";
    if (user && user.email) uid = user?.email.split('.')[0];
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
        setLoading(true);
        if (!uid) {
            //do something and return
            return;
        }
        try {
            const snippetDocs = await getDocs(collection(firestore, '/userByID/' + uid + '/communitySnippets'));
            const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }))

        } catch (error: any) {
            console.log('getMySnippets error: ', error);
            setError(error);
        }
    }
    const joinCommunity = (communityData: Community) => { };
    const leaveCommunity = (communityID: string) => { };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
    }, [user])

    return {
        commmunityStateValue,
        onJoinOrLeaveCommunity
    }
}
export default useCommunityData;