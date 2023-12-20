import React, { useEffect, useState } from 'react';
import { Community } from '../atoms/communitiesAtom';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../atoms/loadingAtom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '@/src/firebase/clientApp';

type PostsProps = {
    communityData: Community;
    uid?: string;//creatorID
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [loading, setLoading] = useState(false);
    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        const getPosts = async () => {
            try {
                //get posts for this community
                const postQuery = query(collection(firestore, 'posts'), where('communityID', '==', communityData.communityID), orderBy("createdAt", 'desc'));
                const postDocs = await getDocs(postQuery);
                const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                console.log("posts: ", posts);
            } catch (error: any) {
                console.log('getPosts error', error.message)
            }
        };
        getPosts();
    }, []);
    useEffect(() => {
        setLoadingBar(true);
    }, [loading]);
    return (
        <>
            communityData
        </>
    )
}
export default Posts;