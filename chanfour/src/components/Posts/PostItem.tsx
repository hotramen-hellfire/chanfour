import React from 'react';
import { Post } from '../atoms/postsAtom';
import { Flex } from '@chakra-ui/react';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: () => {};
    onDeletePost: () => {};
    onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost }) => {

    return (
        <>
            <Flex border='1px solid' >
                {post.title}
            </Flex >
        </>
    )
}
export default PostItem;