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
                // border={'1px solid purple'}
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
            // maxHeight={'500px'}
            // overflow={'scroll-hidden'}
            >
                <Stack width={'100%'} display={'flex'}>
                    {comments.map(item => <CommentItem key={item.id} comment={item} />)}
                </Stack>
            </Flex>
        </>
    )
}
export default CommentsStack;