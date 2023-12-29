import { Flex, Spinner, Stack } from '@chakra-ui/react';
import React from 'react';
import CommentItem from '../CommentItem';
import { CommentObject } from '@/src/components/Atoms/postsAtom';

type CommentsStackProps = {
    comments: CommentObject[];
    fetchLoading: boolean;
};

const CommentsStack: React.FC<CommentsStackProps> = ({ comments, fetchLoading }) => {

    return (
        <>
            <Flex
                width={'100%'}
                flexDirection={'column'}
                mt={2}
                bg={'white'}
                justify={'center'}
                align={'center'}
                boxShadow={'2xl'}
                padding={'8px 0px 8px 0px '}
                _hover={{
                    boxShadow: 'dark-lg'
                }}
            >
                <Spinner display={fetchLoading ? 'flex' : 'none'} />
                <Stack width={'100%'} display={'flex'}>
                    {comments && comments.map(item => <CommentItem key={item.id} comment={item} />)}
                </Stack>
            </Flex>
        </>
    )
}
export default CommentsStack;