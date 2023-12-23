import { authentication, firestore } from '@/src/firebase/clientApp';
import usePosts from '@/src/hooks/usePosts';
import CommentsModal from '@/src/pages/r/[communityID]/comments/CommentsModal';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { Community } from '../atoms/communitiesAtom';
import { loadingState } from '../atoms/loadingAtom';
import { Post } from '../atoms/postsAtom';
import PostItem from './PostItem';
import PostSkeleton from './PostSkeleton';
type PostsProps = {
    communityData: Community;
};
const Posts: React.FC<PostsProps> = ({ communityData }) => {

    const [loading, setLoading] = useState(false);
    const setLoadingBar = useSetRecoilState(loadingState);
    const [user] = useAuthState(authentication);
    const [commentsModalState, setCommentsModalStateValue] = useState(false);
    const { postStateValue,
        setPostStateValue,
        onVote,
        onDeletePost } = usePosts();
    var uid = "";
    if (user) uid = user.email!.split(".")[0];

    const openComments = (post: Post) => {
        setPostStateValue(prev => ({
            ...prev,
            selectedPost: post
        }));
        setCommentsModalStateValue(true);
    }

    useEffect(() => {
        if (user) uid = user.email!.split(".")[0];
        else uid = "";
    }, [user])

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const postQuery = query(collection(firestore, 'posts'), where('communityID', '==', communityData.communityID), orderBy("createdAt", 'desc'));
                const postDocs = await getDocs(postQuery);
                const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
            <CommentsModal communityData={communityData} commentsModalState={commentsModalState} setCommentsModalStateValue={setCommentsModalStateValue} />
            {loading ? <PostSkeleton /> : postStateValue.posts.map((item) => <div key={item.id} id={item.id}><PostItem key={item.id} openComments={openComments} post={item} userIsCreator={item.creatorID === uid}
                userVoteValue={postStateValue.postVotes.find((vote) => vote.postID === item.id)?.voteValue}
                onVote={onVote} onDeletePost={onDeletePost} /></div>)}
        </>
    )
}

export default Posts;