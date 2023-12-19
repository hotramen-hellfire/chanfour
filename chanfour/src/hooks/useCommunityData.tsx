import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../components/atoms/authModalAtom';
import "../components/atoms/communitiesAtom";
import { Community, CommunitySnippet, communityState } from '../components/atoms/communitiesAtom';
import { authentication, firestore } from '../firebase/clientApp';
import { loadingState } from '../components/atoms/loadingAtom';
const useCommunityData = () => {
    const [commmunityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user] = useAuthState(authentication)
    const setAuthModalState = useSetRecoilState(authModalState);
    var uid = "";
    if (user && user.email) uid = user?.email.split('.')[0];
    const onJoinOrLeaveCommunity = async (communityData: Community, isJoined: boolean) => {
        //is the user signed in
        //if not open auth modal state
        if (!user) {
            setAuthModalState({ open: true, view: 'login' });
            return;
        }
        if (isJoined) {
            setLoading(true);
            await leaveCommunity(communityData.communityID);
            setLoading(false);
            return;
        }
        else {
            setLoading(true);
            await joinCommunity(communityData);
            setLoading(false);
            return;
        }
    }

    const getMySnippets = async () => {
        setLoading(true);
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
    const joinCommunity = async (communityData: Community) => {
        //first create a new community snippet
        //updating the number of members
        //update community state/ mySnippets
        try {
            const batch = writeBatch(firestore);

            const newSnippet: CommunitySnippet = {
                communityID: communityData.communityID,
                imageURL: communityData.imageURL || "",
            }

            batch.set(
                doc(
                    firestore,
                    'userByID/' + uid + '/communitySnippets',
                    communityData.communityID
                ),
                newSnippet
            )

            batch.update(doc(firestore, 'communities', communityData.communityID), { numberOfMembers: increment(1) });
            await batch.commit();
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }))
        } catch (error: any) {
            console.log('joinCommunity eror: ', error);
            setError(error.message);
        }
    };
    const leaveCommunity = async (communityID: string) => {
        //first create a new community snippet
        //updating the number of members
        //update community state/ mySnippets
        try {
            const batch = writeBatch(firestore);

            batch.delete(doc(firestore, 'userByID/' + uid + '/communitySnippets', communityID))
            batch.update(doc(firestore, 'communities', communityID), { numberOfMembers: increment(-1) });
            await batch.commit();
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter((item) => item.communityID !== communityID),
            }))
        } catch (error: any) {
            console.log('leaveCommunity eror: ', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        getMySnippets();
    }, [user])

    // const setLoadingBar = useSetRecoilState(loadingState);
    // useEffect(() => {
    //     setLoadingBar(loading)
    // }, [loading])


    return {
        commmunityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default useCommunityData;