import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../components/Atoms/authModalAtom';
import "../components/Atoms/communitiesAtom";
import { Community, CommunitySnippet, communityFunctionsState, communityState } from '../components/Atoms/communitiesAtom';
import { authentication, firestore } from '../firebase/clientApp';
import { User } from 'firebase/auth';
const useCommunityData = () => {
    const [commmunityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const [lastSnippetsUser, setLastSnippetsUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user] = useAuthState(authentication)
    const [communityFunctions, setCommunityFunctions] = useRecoilState(communityFunctionsState);
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
        console.log("join/ leave community read/ write");
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

            batch.update(doc(firestore, 'communities', communityData.communityID), { numberOfMembers: increment(1), activity: increment(3) });
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
            batch.update(doc(firestore, 'communities', communityID), { numberOfMembers: increment(-1), activity: increment(-2) });
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

    const updateBID = async (communityData: Community, updates: { description: string, imageURL: string, backURL: string }) => {
        //first create a new community snippet
        //updating the number of members
        //update community state/ mySnippets
        setLoading(true);
        try {
            const batch = writeBatch(firestore);
            batch.update(doc(firestore, 'communities', communityData.communityID), { description: updates.description, imageURL: updates.imageURL, backURL: updates.backURL })
            await batch.commit();
            setLoading(false);
        } catch (error: any) {
            console.log('updateBID eror: ', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        setCommunityFunctions({
            onJoinOrLeaveCommunity: onJoinOrLeaveCommunity,
            updateBID: updateBID,
            loading: loading
        })
    }, [loading])

    useEffect(() => {
        if (!user) {
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [],
            }));
            return;
        }
        const getMySnippets = async () => {
            setLoading(true);
            console.log('Getting snippets read. . .');
            try {
                setLastSnippetsUser(user);
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
            console.log("Snippets read. . .")
        }
        getMySnippets();
        setLoading(false);
    }, [user]);



    return {
        loading,
        commmunityStateValue,
        onJoinOrLeaveCommunity
    }
}
export default useCommunityData;