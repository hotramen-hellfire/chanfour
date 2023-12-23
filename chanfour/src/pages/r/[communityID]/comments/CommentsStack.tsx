import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import CommentItem from '../CommentItem';
import { CommentObject } from '@/src/components/atoms/postsAtom';

type CommentsStackProps = {
    comments: CommentObject[];
};

const CommentsStack: React.FC<CommentsStackProps> = ({ comments }) => {

    return (
        <>
            <Flex
                width={'100%'}
                border={'1px solid purple'}
                flexDirection={'column'}
                mt={2}
                bg={'white'}
                justify={'center'}
                align={'center'}
                boxShadow={'2xl'}
                p={2}
                _hover={{
                    boxShadow: 'dark-lg'
                }}
            >
                <Stack width={'90%'} border={'1px solid orange'} display={'flex'}>
                    {comments.map(item => <CommentItem key={item.id} comment={item} />)}
                </Stack>
            </Flex>
        </>
    )
}
export default CommentsStack;