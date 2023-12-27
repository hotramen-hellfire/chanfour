import { UNameState } from '@/src/components/Atoms/UNameAtom';
import { authModalState } from '@/src/components/Atoms/authModalAtom';
import { Community } from '@/src/components/Atoms/communitiesAtom';
import { CommentObject, Post, PostState } from '@/src/components/Atoms/postsAtom';
import { authentication, firestore } from '@/src/firebase/clientApp';
import { Code, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react';
import { Timestamp, collection, doc, getDocs, increment, orderBy, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CommentsStack from './CommentsStack';
import CreateComment from './CreateComment';

type PostPageProps = {
    communityData: Community;
    commentsModalState: boolean;
    setCommentsModalStateValue: (state: boolean) => void
};

const PostPage: React.FC<PostPageProps> = ({ communityData, commentsModalState, setCommentsModalStateValue }) => {
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const [user] = useAuthState(authentication);
    const UNameObj = useRecoilValue(UNameState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [comments, setComments] = useState<CommentObject[]>([]);
    const [commentText, setCommentText] = useState("");
    const [fetchLoading, setFetchLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    let isTime = false;
    const colors = ["yellow", 'red', 'blue', 'green', 'pink', 'purple']
    const getColor = (creatorID: string) => {
        let sum = 0;
        for (let i = 0; i < creatorID.length; i++) {
            const j = creatorID[i];
            sum += j.charCodeAt(0);
        }
        const sec = Math.floor(postStateValue.selectedPost?.createdAt.seconds!)
        const k = sec % 5;
        sum = (sum + k) % 6
        return sum;
    }
    const onModalClose = () => {
        setCommentsModalStateValue(false)
        setComments([])
        setCommentText("")
        setPostStateValue(prev => ({
            ...prev,
            selectedPost: null
        }))
    }
    const onCreateComment = async () => {
        //create a comment document
        //update post numberOfComments
        //update client recoil state
        if (!user) {
            setAuthModalState({
                open: true,
                view: 'login'
            })
            return;
        }
        setCreateLoading(true);
        try {
            const creatorID = user.email!.split('.')[0];
            const batch = writeBatch(firestore);
            const commentDocRef = doc(collection(firestore, 'posts/' + postStateValue.selectedPost?.id + '/comments'));
            const newComment: CommentObject = {
                id: commentDocRef.id as string,
                creatorID: creatorID,
                creatorUName: UNameObj.UName,
                text: commentText,
                createdAt: serverTimestamp() as Timestamp,
                color: colors[getColor(creatorID)],
            }
            batch.set(commentDocRef, newComment);
            const postDocRef = doc(firestore, 'posts', postStateValue.selectedPost?.id!);
            batch.update(postDocRef, {
                numberOfComments: increment(1),
                activity: increment(2)
            })
            await batch.commit();
            setCommentText("");
            newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
            setComments((prev) => [newComment, ...prev]);
            let updatedPost: Post = postStateValue.selectedPost!;
            let updatedPosts = [...postStateValue.posts];
            updatedPost = { ...updatedPost, numberOfComments: postStateValue.selectedPost!.numberOfComments + 1 }
            const postIndex = updatedPosts.findIndex((item) => item.id === postStateValue.selectedPost?.id);
            console.log("postUpdated: ", updatedPost)
            updatedPosts[postIndex] = {
                ...postStateValue.selectedPost!,
                numberOfComments: updatedPost.numberOfComments
            };
            console.log("postsUpdated")
            setPostStateValue(prev => ({
                ...prev,
                selectedPost: updatedPost,
                posts: updatedPosts
            }))
            setCreateLoading(false);
        } catch (error: any) {
            console.log("onCreateComment error: ", error);
            setCreateLoading(false);
        }
    }

    useEffect(() => {
        const getPostComments = async () => {
            try {
                setFetchLoading(true);
                const commentsQuery = query(collection(firestore, "posts/" + postStateValue.selectedPost!.id + '/comments'), where("createdAt", "!=", ""), orderBy('createdAt', 'desc'));
                const commentDocs = await getDocs(commentsQuery);
                const newComments = commentDocs.docs.map(doc => ({ ...doc.data() }))
                setComments(newComments as CommentObject[])
                setFetchLoading(false);
            } catch (error: any) {
                console.log("getPostComments error: ", error);
                setFetchLoading(false);
            }
        };
        if (commentsModalState) getPostComments();
    }, [commentsModalState])

    if (postStateValue.selectedPost?.creatorID) isTime = true;
    return (
        <>
            <Modal onClose={() => { onModalClose() }} size={'xl'} isOpen={commentsModalState}>
                <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
                <ModalContent alignItems={'center'} border={'3px solid black'}>
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
                            <Code mb={1} fontSize={30} colorScheme='purple'>&lt;COMMENTS&gt;</Code>
                            <Code mb={1} fontSize={15} colorScheme='purple'>#/{postStateValue.selectedPost?.title} by {postStateValue.selectedPost?.creatorUName}</Code>
                            <Code mb={1} fontSize={12} colorScheme='white'>&gt;_&lt;{postStateValue.selectedPost?.creatorID}, {isTime && moment(new Date(postStateValue.selectedPost!.createdAt.seconds * 1000)).fromNow()} </Code>
                        </Flex>
                        <Flex
                            width={'10%'}
                            minHeight={'100%'}
                            align={'center'}
                            justify={'center'}
                            position={'relative'}
                            left={-5}
                            top={-2}
                        // display={{ base: 'none', md: 'flex' }}
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
                    <ModalBody width={'100%'}>
                        <CreateComment commentText={commentText} setCommentText={setCommentText} user={user} createLoading={createLoading} onCreateComment={onCreateComment} />
                        <CommentsStack comments={comments} fetchLoading={fetchLoading} />
                    </ModalBody>
                    <ModalFooter>
                        <Code mb={1} fontSize={12} colorScheme='grey'>&lt;/COMMENTS&gt;</Code>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default PostPage;