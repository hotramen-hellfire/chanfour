import PageContent from '@/src/components/Layout/PageContent';
import PostItem from '@/src/components/Posts/PostItem';
import { authentication } from '@/src/firebase/clientApp';
import usePosts from '@/src/hooks/usePosts';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const PostPage: React.FC = () => {
    const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts();
    const [user] = useAuthState(authentication);
    return (
        <PageContent>
            <>
                {postStateValue.selectedPost && <PostItem post={postStateValue.selectedPost} onVote={onVote} onDeletePost={onDeletePost} userVoteValue={postStateValue.postVotes.find(item => item.postID === postStateValue.selectedPost?.id)?.voteValue} userIsCreator={user?.email?.split(".")[0] === postStateValue.selectedPost?.creatorID} />}
            </>
            <>

            </>
        </PageContent>
    )
}
export default PostPage;