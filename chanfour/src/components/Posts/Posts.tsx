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
import PostSkeleton from './PostSkeleton';
type PostsProps = {
    communityData: Community;
};
const Posts: React.FC<PostsProps> = ({ communityData }) => {

    const [loading, setLoading] = useState(false);
    const setLoadingBar = useSetRecoilState(loadingState);
    const [user] = useAuthState(authentication);
    const { postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost } = usePosts();
    var uid = "";
    if (user) uid = user.email!.split(".")[0];
    useEffect(() => {
        if (user) uid = user.email!.split(".")[0];
        else uid = "";
    }, [user])

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                console.log("loadstate: ", loading)
                const postQuery = query(collection(firestore, 'posts'), where('communityID', '==', communityData.communityID), orderBy("createdAt", 'desc'));
                const postDocs = await getDocs(postQuery);
                const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                console.log("posts: ", posts);
                setPostStateValue(prev => ({
                    ...prev,
                    posts: posts as Post[],
                }))
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                console.log('getPosts error', error.message)
            }
        };
        getPosts();
    }, []);

    useEffect(() => {
        setLoadingBar(loading);
    }, [loading]);

    return (
        <>
            {loading ? <PostSkeleton /> : postStateValue.posts.map((item) => <PostItem key={item.id} post={item} userIsCreator={item.creatorID === uid} userVoteValue={undefined} onVote={onVote} onSelectPost={onSelectPost} onDeletePost={onDeletePost} uid={uid} />)}
        </>
    )
}
export default Posts;