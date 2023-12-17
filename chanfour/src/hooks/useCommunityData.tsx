import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import "../components/atoms/communitiesAtom";
import { Community, CommunitySnippet, communityState } from '../components/atoms/communitiesAtom';
import { authentication, firestore } from '../firebase/clientApp';
import '../components/atoms/communitiesAtom';
const useCommunityData = () => {
    const [commmunityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const [loading, setLoading] = useState(true);
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
            const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],
            }))
        } catch (error: any) {
            console.log('getMySnippets error: ', error);
            setError(error);
        }
        setLoading(false);
    }
    const joinCommunity = (communityData: Community) => { };
    const leaveCommunity = (communityID: string) => { };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
    }, [user])

    return {
        commmunityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default useCommunityData;