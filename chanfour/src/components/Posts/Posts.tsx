import React, { useEffect, useState } from 'react';
import { Community } from '../atoms/communitiesAtom';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../atoms/loadingAtom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { authentication, firestore } from '@/src/firebase/clientApp';
import { Post, PostState } from '../atoms/postsAtom';
import usePosts from '@/src/hooks/usePosts';
import PostItem from './PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
type PostsProps = {
    communityData: Community;
};
const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [loading, setLoading] = useState(false);
    const setLoadingBar = useSetRecoilState(loadingState);
    const { postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost } = usePosts();
    const [user] = useAuthState(authentication);
    var uid = "";
    if (user) uid = user.email!.split(".")[0];
    useEffect(() => {
        if (user) uid = user.email!.split(".")[0];
        else uid = "";
    }, [user])
    useEffect(() => {
        const getPosts = async () => {
            try {
                const postQuery = query(collection(firestore, 'posts'), where('communityID', '==', communityData.communityID), orderBy("createdAt", 'desc'));
                const postDocs = await getDocs(postQuery);
                const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                console.log("posts: ", posts);
                setPostStateValue(prev => ({
                    ...prev,
                    posts: posts as Post[],
                }))
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
            {postStateValue.posts.map((item) => <PostItem key={item.id} post={item} userIsCreator={item.creatorID === uid} userVoteValue={undefined} onVote={onVote} onSelectPost={onSelectPost} onDeletePost={onDeletePost} />)}
        </>
    )
}
export default Posts;