import { CommentObject } from '@/src/components/Atoms/postsAtom';
import { Code, Flex, Icon } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { CgCornerDownRight } from "react-icons/cg";
type CommentItemProps = {
    comment: CommentObject;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {

    return (<>        {comment &&
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
            <Flex
                justify={'right'}
                flexDirection={'row'}
            >
                <Flex
                    width={'4%'}
                    justify={'left'}
                    align={'center'}
                >
                    <Icon
                        as={CgCornerDownRight}
                        color={'grey'}
                        position={'relative'}
                        top={-2}
                    />
                </Flex>
                <Flex
                    width={'96%'}
                >
                    {comment.text}
                </Flex>
            </Flex>
        </Flex>}
    </>
    )
}
export default CommentItem;