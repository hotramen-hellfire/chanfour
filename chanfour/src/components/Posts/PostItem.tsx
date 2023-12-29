import { authentication, firestore } from '@/src/firebase/clientApp';
import { Alert, AlertIcon, Box, Button, Flex, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalOverlay, Skeleton, Spinner, Text, Textarea, useClipboard } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaHeartCircleBolt, FaHeartCrack } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdCloseFullscreen } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaBullhorn } from "react-icons/fa";
import { VscReport } from 'react-icons/vsc';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loadingState } from '../Atoms/loadingAtom';
import { Post, PostState } from '../Atoms/postsAtom';
import { authModalState } from '../Atoms/authModalAtom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { error } from 'console';
import Iframe from 'react-iframe';

type PostItemProps = {
    hookLoad: boolean,
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: (post: Post, vote: number, communityID: string) => void;
    onDeletePost: (post: Post) => Promise<[boolean, string]>;
    openComments?: (post: Post) => void;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, openComments, hookLoad }) => {
    const [loading, setLoading] = useState(false);
    const [linkCopyModal, setLinkCopyModal] = useState(false);
    const deletionTime = 15;
    const descLength = 500;
    const [user] = useAuthState(authentication);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [heartValue, setHeartValue] = useState(userVoteValue ? userVoteValue : 0);
    const [imageLoading1, setImageLoading1] = useState(true)
    const [imageLoading2, setImageLoading2] = useState(true)
    const setAuthModal = useSetRecoilState(authModalState);
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const { onCopy, value, setValue, hasCopied } = useClipboard("");
    const [openReport, setReport] = useState(false);
    const [reportText, setReportText] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(descLength);
    const setLoadingBar = useSetRecoilState(loadingState);
    const [URL, setURL] = useState("")

    const updateHeartValue = () => {
        if (user) setHeartValue((heartValue + 1) % 4);
    }

    const onReportChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length > descLength) {
            event.target.value = event.target.value.substring(0, descLength);
            return;
        }
        setCharsRemaining(descLength - event.target.value.length)
        setReportText(event.target.value);
    };

    const onSubmitReport = async () => {
        if (!user) {
            setAuthModal({
                open: true,
                view: 'login'
            })
            return;
        }
        setLoading(true);
        try {
            const repDocRef = doc(firestore, 'reportsByPost', post.id);
            const document = await getDoc(repDocRef);
            if (document.exists()) await updateDoc(repDocRef, {
                [user.email!]: reportText,
            })
            else {
                await setDoc(repDocRef, {
                    [user.email!]: reportText,
                })
            }
        } catch (error: any) {
            console.log("onSubmitReport Error: ", error)
            // setDeleteError(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        setURL((document.URL as string).split('#')[0] + "#" + post.id)
        if (!user) setHeartValue(0);
        else setHeartValue(userVoteValue ? userVoteValue : 0);
    }, [user, postStateValue.postVotes])

    const handleDelete = async () => {
        setDeleteError("");
        try {
            setLoading(true);
            setLoadingBar(true);
            setDeleting(true);
            console.log(((Date.now() as number / 1000) - (post.createdAt.seconds as number)) / 60);
            if (((Date.now() as number / 1000) - (post.createdAt.seconds as number)) / 60 > deletionTime) {
                throw new Error("Posts can only be deleted within 15 minutes of creation :(");
            }
            const [success, error] = await onDeletePost(post);
            if (!success) throw new Error(error);
            console.log("post was successfully deleted :)");
            setDeleteError(error);//
            setLoading(false);
            setLoadingBar(false);
            setDeleting(false);
        } catch (error: any) {
            console.log("handleDelete: ", error.message);
            setDeleteError(error.message);
            setLoading(false);
            setLoadingBar(false);
            setDeleting(false);
        }

    }
    return (
        <>
            {/* //parent of postitem */}
            <Flex border='2px solid purple'
                mt={2}
                padding='4px 4px 4px 4px'
                bg='white'
                borderRadius={10}
                flexDirection={'column'}
                boxShadow={'2xl'}
                _hover={{
                    boxShadow: 'dark-lg'
                }}
                id={post.id}
            >
                {/* this is the postobject */}
                <Flex
                    width={'100%'}
                    flexDir={'column'}
                >
                    {deleteError &&
                        <Alert status='error' minHeight={'20px'} border={'2px solid brown'} borderRadius={'5px'}>
                            <AlertIcon />
                            <Text mr={2} fontSize={12} fontWeight={600}>Action failed :( <br /> {deleteError}</Text>
                        </Alert>
                    }
                    {/* this is title box */}
                    <Flex width={'100%'} mb={1}>
                        <Box borderRadius={5} bg='white' width={"90%"}>
                            <Text fontWeight={600} mr={2} white-space='nowrap'>
                                {post.title}
                            </Text>
                            <Text color="grey.200" fontSize={12} >
                                by {post.creatorUName}, {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                            </Text>
                            <Text color="grey" fontWeight={5} fontSize={12}>
                                &gt;_&lt;{post.creatorID}
                            </Text>
                        </Box >

                        <Flex
                            width={'10%'}
                            justify={'center'}
                            align='center'
                            float={'left'}
                        >
                            <Menu>
                                {!deleting ?
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<BsThreeDots />}
                                        color={'black'}
                                        bg={'transparent'}
                                        _hover={{}}

                                    /> :
                                    <MenuButton
                                        as={Spinner}
                                        aria-label='Options'
                                        color={'black'}
                                        bg={'transparent'}
                                        _hover={{}}
                                    />}
                                <MenuList>
                                    <MenuItem icon={<VscReport />} onClick={() => setReport(true)}>
                                        Report
                                    </MenuItem>
                                    <MenuItem onClick={handleDelete} color="red" icon={<RiDeleteBinLine />} display={userIsCreator ? 'unset' : 'none'}>
                                        Delete
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex >
                    <Flex
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                    />
                    <Flex
                        borderRadius={5}
                        bg='white'
                        border={'2px solid'}
                        borderColor={'white'}
                        flexDirection={'column'}
                        justify={'center'}
                        padding='2px 2px 2px 2px'
                        align={'center'}
                    >

                        <Flex
                            display={post.body ? 'flex' : 'none'}
                            width={'90%'}
                            fontSize={14}
                            mb={2}
                        >
                            {post.body}
                        </Flex>
                        {/* image box */}
                        <Flex
                            display={!imageLoading1 ? 'flex' : 'none'}
                            align={'center'}
                            justify={'center'}
                            padding={'8px'}
                            // maxHeight={'400px'}
                            boxShadow={'2xl'}
                            _hover={{
                                boxShadow: 'dark-lg'
                            }}
                            border={'0.1px solid black'}
                            mb={2}
                        >
                            <Image maxHeight={'100%'} onLoad={() => setImageLoading1(false)} display={!imageLoading1 ? 'unset' : 'none'} maxWidth={'100%'} src={post.imageURL} border='4px solid black' alt='only images are supported as of now' />
                        </Flex>
                        <Skeleton height={"300px"} width={"90%"} display={(imageLoading1 && post.imageURL) || (imageLoading2 && post.embedURL) ? 'unset' : 'none'} mb={2} mt={2} />
                        <Flex
                            display={!imageLoading2 ? 'flex' : 'none'}
                            align={'center'}
                            justify={'center'}
                            padding={'8px'}
                            // maxHeight={'400px'}
                            boxShadow={'2xl'}
                            _hover={{
                                boxShadow: 'dark-lg'
                            }}
                            border={'0.1px solid black'}
                        >
                            <Image maxHeight={'100%'} onLoad={() => setImageLoading2(false)} display={!imageLoading2 ? 'unset' : 'none'} maxWidth={'100%'} src={post.embedURL} border='4px solid black' alt='only images are supported as of now' />
                        </Flex>
                        {post.ytURL &&
                            <Flex
                                mt={2}
                                align={'center'}
                                justify={'center'}
                                padding={'6px'}
                                // maxHeight={'400px'}
                                boxShadow={'2xl'}
                                _hover={{
                                    boxShadow: 'dark-lg'
                                }}
                                border={'0.1px solid black'}
                                width={'91%'}
                                bg={'white'}
                            >
                                <Flex
                                    border='8px solid black'
                                    // m={2}
                                    w={{ base: '98%', lg: '98%' }}
                                    h={{ base: '226px', lg: '314px' }}
                                >
                                    <Iframe url={post.ytURL}
                                        className=""
                                        display="block"
                                        position="relative"
                                        width='100%'
                                        height='100%'
                                    />
                                </Flex>
                            </Flex>
                        }
                    </Flex>
                    <Flex
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                        mt={1}
                    />
                    <Flex
                        mt={2}
                        width={'100%'}
                        height={'40px'}
                        flexDirection={'row'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Text position='relative' top={-2} fontSize={12} color={heartValue === 3 ? 'purple' : heartValue === 2 ? 'red' : heartValue === 1 ? 'red' : 'white'}>
                            +{heartValue}
                        </Text>
                        <Icon
                            as={CiHeart}
                            fontSize={'40px'}
                            mr={1}
                            ml={1}
                            onClick={() => { updateHeartValue(); onVote(post, 1, post.communityID); }}
                            display={!user || heartValue === 0 ? 'unset' : 'none'}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                        />
                        <Icon
                            as={FaHeart}
                            fontSize={'40px'}
                            mr={1}
                            ml={1}
                            onClick={() => { updateHeartValue(); onVote(post, 2, post.communityID); }}
                            display={user && heartValue === 1 ? 'unset' : 'none'}
                            color={'red'}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                        />
                        <Icon
                            as={FaHeartCircleBolt}
                            fontSize={'40px'}
                            mr={1}
                            ml={1}
                            onClick={() => { updateHeartValue(); onVote(post, 3, post.communityID); }}
                            display={user && heartValue === 2 ? 'unset' : 'none'}
                            color={'red'}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                        />
                        <Icon
                            as={FaHeartCrack}
                            fontSize={'40px'}
                            mr={1}
                            onClick={() => { updateHeartValue(); onVote(post, 0, post.communityID); }}
                            ml={1}
                            display={user && heartValue === 3 ? 'unset' : 'none'}
                            color={'purple'}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                        />
                        <Flex
                            justify={'center'}
                            align='center'
                            display={post.voteStatus ? 'flex' : 'none'}
                            fontSize={15}
                            color={'purple'}
                            position={'relative'}
                            top={2}
                            left={-1}
                        >
                            {post.voteStatus !== 0 && !hookLoad && <Text>{post.voteStatus}</Text>}
                            <Spinner
                                color='red'
                                fontSize={5}
                                display={hookLoad ? 'flex' : 'none'}
                            />
                        </Flex>
                        <Icon
                            as={TfiCommentAlt}
                            fontSize={'30px'}
                            mr={1}
                            ml={1}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                            onClick={() => openComments!(post)}
                        />
                        <Flex
                            justify={'center'}
                            align='center'
                            display={post.numberOfComments ? 'flex' : 'none'}
                            fontSize={15}
                            color={'purple'}
                            position={'relative'}
                            top={2}
                            left={-0.5}
                        >
                            {post.numberOfComments !== 0 && <Text>{post.numberOfComments}</Text>}
                        </Flex>
                        <Icon
                            as={IoShareSocialOutline}
                            fontSize={'30px'}
                            mr={1}
                            ml={1}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                            onClick={() => { setLinkCopyModal(true); setValue(URL); }}
                        />
                    </Flex>
                </Flex >
            </Flex >
            <Modal isOpen={linkCopyModal || openReport} onClose={() => { }}>
                <ModalOverlay
                    backdropFilter={'blur(5px)'}
                />
                <ModalContent
                    minW={'85%'}
                    maxW={'100%'}
                    bg={'transparent'}
                    justifyContent={'center'}
                    justifyItems={'center'}
                    alignContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                >
                    <ModalBody
                        maxW={'80%'}
                        // border={'1px solid white'}
                        display={linkCopyModal ? 'flex' : 'none'}
                    >
                        <Flex
                            width={'100%'}
                            // height={'100px'}
                            flexDirection={'column'}
                            backdropFilter={'blur(100px)'}
                            borderRadius={10}
                            justify={'center'}
                            align={'center'}
                            border={'1px solid purple'}
                            pb={2}
                        >
                            <Flex
                                // height={'40px'}
                                width={'100%'}
                                // border={'1px solid white'}
                                justify={'center'}
                                align={'center'}
                            >
                                <Flex
                                    width={'90%'}
                                    justify={'space-around'}
                                >
                                    <Text
                                        color={'white'}
                                        fontSize={30}
                                        fontWeight={50}
                                    >
                                        Share Post
                                    </Text>
                                </Flex>

                                <Flex
                                    justifySelf={'flex-end'}
                                >
                                    <Icon
                                        as={MdCloseFullscreen}
                                        color={'white'}
                                        _hover={{
                                            fontSize: 30
                                        }}
                                        onClick={() => { setLinkCopyModal(false) }}
                                    />
                                </Flex>

                            </Flex>
                            <Flex
                                width={'95%'}
                                height={0.25}
                                border={'0.5px solid white'}
                                mb={2}
                            />
                            <Spinner
                                color='white'
                                display={loading ? 'flex' : 'none'}
                            />
                            <Text
                                color={'white'}
                                mb={1}
                                maxW={"80%"}
                            >
                                {URL}
                            </Text>
                            <Button
                                onClick={onCopy}
                                borderRadius={0}
                                bg={hasCopied ? 'transparent' : 'purple'}
                            >
                                {!hasCopied ? 'Click Here To Copy!!' : 'Copied to Clipboard!!'}
                            </Button>
                        </Flex>
                    </ModalBody>


                    <ModalBody
                        minW={'100%'}
                        // border={'1px solid white'}
                        display={openReport ? 'flex' : 'none'}
                    >
                        <Flex
                            width={'100%'}
                            // height={'100px'}
                            flexDirection={'column'}
                            backdropFilter={'blur(100px)'}
                            borderRadius={10}
                            justify={'center'}
                            align={'center'}
                            border={'1px solid purple'}
                            pb={2}
                        >
                            <Flex
                                height={'40px'}
                                width={'100%'}
                                // border={'1px solid white'}
                                justify={'center'}
                                align={'center'}
                            >
                                <Flex
                                    width={'90%'}
                                    justify={'space-around'}
                                >
                                    <Text
                                        color={'white'}
                                        fontSize={30}
                                        fontWeight={50}
                                    >
                                        Report
                                    </Text>
                                </Flex>

                                <Flex
                                    justifySelf={'flex-end'}
                                >
                                    <Icon
                                        as={MdCloseFullscreen}
                                        color={'white'}
                                        _hover={{
                                            fontSize: 30
                                        }}
                                        onClick={() => { setReport(false) }}
                                    />
                                </Flex>

                            </Flex>
                            <Flex
                                width={'95%'}
                                height={0.25}
                                border={'0.5px solid white'}
                                mb={2}
                            />
                            <Spinner
                                color='white'
                                display={loading ? 'flex' : 'none'}
                            />
                            <Text
                                color={'white'}
                                mb={1}
                            >
                                Title: {post.title}<br />
                                Creator: {post.creatorID}
                            </Text>
                            <Textarea
                                width={'80%'}
                                onChange={onReportChange}
                                name={reportText}
                                color={'white'}
                                placeholder='enter report here :('
                                _hover={{
                                    bg: 'white',
                                    color: 'black'
                                }}
                            >
                            </Textarea>
                            <Text fontSize={11} fontWeight={charsRemaining === 0 ? 1000 : 500} color={charsRemaining === 0 ? 'red' : 'white'}>
                                {charsRemaining} Characters remaining
                            </Text>
                            <Text fontSize={11} color={'white'}>
                                your previous report for this post will be overwritten (if any) . . .
                            </Text>
                            <Button
                                onClick={onSubmitReport}
                                isLoading={loading}
                                borderRadius={0}
                                bg={hasCopied ? 'transparent' : 'purple'}
                                display={reportText ? 'flex' : 'none'}
                            >
                                Report
                                <Icon
                                    as={FaBullhorn}
                                    color={'white'}
                                    ml={1}
                                />
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal >

        </>
    )
}
export default PostItem;