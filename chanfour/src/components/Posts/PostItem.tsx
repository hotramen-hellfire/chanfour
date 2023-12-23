import { Alert, AlertIcon, Box, Flex, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Skeleton, Spinner, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BiSolidSave } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaHeartCircleBolt, FaHeartCrack } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiCommentAlt } from "react-icons/tfi";
import { VscReport } from 'react-icons/vsc';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loadingState } from '../atoms/loadingAtom';
import { Post, PostState } from '../atoms/postsAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication } from '@/src/firebase/clientApp';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: (post: Post, vote: number, communityID: string) => void;
    onDeletePost: (post: Post) => Promise<[boolean, string]>;
    openComments?: (post: Post) => void;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, openComments }) => {
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(authentication);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [heartValue, setHeartValue] = useState(userVoteValue ? userVoteValue : 0);
    const [imageLoading1, setImageLoading1] = useState(true)
    const [imageLoading2, setImageLoading2] = useState(true)
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const setLoadingBar = useSetRecoilState(loadingState);

    const updateHeartValue = () => {
        if (user) setHeartValue((heartValue + 1) % 4);
    }

    useEffect(() => {
        if (!user) setHeartValue(0);
        else setHeartValue(userVoteValue ? userVoteValue : 0);
    }, [user, postStateValue.postVotes])

    const handleDelete = async () => {
        setDeleteError("");
        try {
            setLoading(true);
            setLoadingBar(true);
            setDeleting(true);
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
                            <Text mr={2} fontSize={12} fontWeight={600}>Deletion failed :( <br /> {deleteError}</Text>
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
                                    <MenuItem icon={<VscReport />} >
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
                    {/* <Divider orientation='horizontal' bg='black' /> */}
                    {/* content box */}
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
                            maxHeight={'400px'}
                            boxShadow={'2xl'}
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
                            maxHeight={'400px'}
                            boxShadow={'2xl'}
                            border={'0.1px solid black'}
                        >
                            <Image maxHeight={'100%'} onLoad={() => setImageLoading2(false)} display={!imageLoading2 ? 'unset' : 'none'} maxWidth={'100%'} src={post.embedURL} border='4px solid black' alt='only images are supported as of now' />
                        </Flex>
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
                            {post.voteStatus !== 0 && <Text>{post.voteStatus}</Text>}
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
                        />
                        <Icon
                            as={BiSolidSave}
                            fontSize={'30px'}
                            mr={1}
                            ml={1}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                        />

                    </Flex>
                </Flex >
            </Flex >
        </>
    )
}
export default PostItem;