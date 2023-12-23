import { CommentObject } from '@/src/components/atoms/postsAtom';
import { Code, Flex } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

type CommentItemProps = {
    comment: CommentObject;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {

    return (
        <Flex
            width={'100%'}
            border={'1px solid black'}
            flexDirection={'column'}
            boxShadow={'2xl'}
            _hover={{
                boxShadow: 'dark-lg'
            }}
        >
            <Flex
                width={'100%'}
                flexDirection={'column'}
            >
                <Code colorScheme={comment.color} fontSize={15}>{comment.creatorUName},  {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}</Code>
                <Code colorScheme='grey' fontSize={9}>&gt;_&lt;{comment.creatorID}</Code>
            </Flex>
            <Flex>
                {comment.text}
            </Flex>
        </Flex>
    )
}
export default CommentItem;