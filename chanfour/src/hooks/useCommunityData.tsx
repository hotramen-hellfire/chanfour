import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
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
        console.log("h1")
        if (!uid) {
            //do something and return
            setLoading(false);
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
    const leaveCommunity = (communityID: string) => { };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        getMySnippets();
    }, [user])

    return {
        commmunityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default useCommunityData;