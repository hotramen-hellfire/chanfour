import { authentication, firestore } from '@/src/firebase/clientApp';
import usePosts from '@/src/hooks/usePosts';
import CommentsModal from '@/src/pages/b/[communityID]/comments/CommentsModal';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { Community } from '../Atoms/communitiesAtom';
import { loadingState } from '../Atoms/loadingAtom';
import { Post } from '../Atoms/postsAtom';
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
        onDeletePost,
        hookLoad } = usePosts();
    var uid = "";
    if (user) uid = user.email!;

    useEffect(() => {
        const handleHashChange = () => {
            try {
                const { hash } = window.location
                if (hash) {
                    console.log(hash);
                    const targetElement = document.querySelector(hash)
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' })
                    }
                }
            } catch (error: any) {
                console.log("handleHashChange error: ", error.message)
            }
        }
        if (postStateValue.posts.length && !loading) handleHashChange()
    }, [loading])

    const openComments = (post: Post) => {
        setPostStateValue(prev => ({
            ...prev,
            selectedPost: post
        }));
        setCommentsModalStateValue(true);
    }

    useEffect(() => {
        if (user) uid = user.email!;
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
    }, [communityData]);

    useEffect(() => {
        setLoadingBar(loading);
    }, [loading]);

    return (
        <>
            <CommentsModal communityData={communityData} commentsModalState={commentsModalState} setCommentsModalStateValue={setCommentsModalStateValue} />
            {loading ? <PostSkeleton /> : postStateValue.posts.map((item) => <PostItem key={item.id} hookLoad={hookLoad} openComments={openComments} post={item} userIsCreator={item.creatorID === uid}
                userVoteValue={postStateValue.postVotes.find((vote) => vote.postID === item.id)?.voteValue}
                onVote={onVote} onDeletePost={onDeletePost} />)}
        </>
    )
}

export default Posts;