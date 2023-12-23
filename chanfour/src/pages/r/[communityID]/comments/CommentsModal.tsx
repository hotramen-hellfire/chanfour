import { Community } from '@/src/components/atoms/communitiesAtom';
import { authentication } from '@/src/firebase/clientApp';
import usePosts from '@/src/hooks/usePosts';
import { Button, Code, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdOutlineCloseFullscreen } from 'react-icons/md';

type PostPageProps = {
    communityData: Community;
    commentsModalState: boolean;
    setCommentsModalStateValue: (state: boolean) => void
};

const PostPage: React.FC<PostPageProps> = ({ communityData, commentsModalState, setCommentsModalStateValue }) => {
    const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts();
    const [user] = useAuthState(authentication);
    let isTime = false;
    const onModalClose = () => {
        setCommentsModalStateValue(false)
        setPostStateValue(prev => ({
            ...prev,
            selectedPost: null
        }))
    }
    if (postStateValue.selectedPost?.creatorID) isTime = true;
    return (
        <>
            {/* {postStateValue.selectedPost && <PostItem post={postStateValue.selectedPost} onVote={onVote} onDeletePost={onDeletePost} userVoteValue={postStateValue.postVotes.find(item => item.postID === postStateValue.selectedPost?.id)?.voteValue} userIsCreator={user?.email?.split(".")[0] === postStateValue.selectedPost?.creatorID} />} */}
            <Modal onClose={() => { onModalClose() }} size={'xl'} isOpen={commentsModalState}>
                <ModalOverlay />
                <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
                <ModalContent alignItems={'center'} border={'1px solid black'}>
                    <Flex
                        textAlign={'center'}
                        width={'100%'}
                        mt={1}
                    >
                        <Flex
                            width={'10%'}
                            minHeight={'100%'}
                        >
                        </Flex>

                        <Flex
                            width={'80%'}
                            minHeight={'100%'}
                            textAlign={'center'}
                            justify={'center'}
                            align={'center'}
                            flexDirection={'column'}
                        >
                            <Code mb={1} fontSize={30} colorScheme='purple'>r/{communityData.communityID}</Code>
                            <Code mb={1} fontSize={15} colorScheme='purple'>#/{postStateValue.selectedPost?.title} by {postStateValue.selectedPost?.creatorUName}</Code>
                            <Code mb={1} fontSize={12} colorScheme='white'>&gt;_&lt;{postStateValue.selectedPost?.creatorID}, {isTime && moment(new Date(postStateValue.selectedPost!.createdAt.seconds * 1000)).fromNow()} </Code>
                        </Flex>
                        <Flex
                            width={'10%'}
                            minHeight={'100%'}
                            align={'center'}
                            justify={'center'}
                        >
                            <Icon
                                as={MdOutlineCloseFullscreen}
                                fontSize={20}
                                color={'purple'}
                                _hover={{ fontSize: 30 }}
                                onClick={onModalClose}
                            />
                        </Flex>
                    </Flex>
                    <Flex
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                        width={'80%'}
                        mt={1}
                    />
                    <ModalBody>
                        noen
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onModalClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default PostPage;