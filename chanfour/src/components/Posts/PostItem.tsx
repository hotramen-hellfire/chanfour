import { Box, Code, Divider, Flex, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Post } from '../atoms/postsAtom';
import { CiHeart } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import moment from 'moment';
import { BiSolidSave } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { FaHeartCrack } from "react-icons/fa6";
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineReportGmailerrorred } from "react-icons/md"
import { VscReport } from 'react-icons/vsc';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: () => {};
    onDeletePost: () => {};
    onSelectPost: () => void;
    uid: string;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost, uid }) => {
    const [image, setPostImage] = useState("");
    const [embed, setPostEmbed] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [heartValue, setHeartValue] = useState(0);
    const updateHeartValue = () => {
        setHeartValue((heartValue + 1) % 4);
    }
    const on3Dots = () => { };
    useEffect(() => {
        if (post.imageURL) setPostImage(post.imageURL);
        const fetchImage = async () => {
            setLoading(true);
            setError("");
            try {
                const fetchAdd = post.embedURL as string;
                console.log("fetching from ", fetchAdd)
                const res = await fetch(fetchAdd);
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setPostEmbed(imageObjectURL);
                console.log(imageObjectURL);
            } catch (error: any) {
                setError(error.message);
                console.log('fetchImage error: ', error.message);
            }
            setLoading(false);
        };
        if (post.embedURL) fetchImage();
    }, [post.embedURL, post.imageURL]);
    return (
        <>
            {/* //parent of postitem */}
            <Flex border='2px solid purple'
                mt={2}
                padding='4px 4px 4px 4px'
                bg='white'
                borderRadius={10}
                flexDirection={'column'}
                boxShadow={'dark-lg'}
            >
                {/* this is the postobject */}
                <Flex
                    width={'100%'}
                    flexDir={'column'}
                >
                    {/* this is title box */}
                    <Flex width={'100%'} mb={1}>
                        <Box borderRadius={5} bg='white' width={"80%"} white-space='nowrap'>
                            <Text fontWeight={600} mr={2} white-space='nowrap'>
                                {post.title}
                                <Text color="grey.200" fontSize={12} >
                                    by {post.creatorUName}, {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                                    <Text color="grey" fontWeight={5} fontSize={12}>
                                        &gt;_&lt;{post.creatorID}
                                    </Text>
                                </Text>
                            </Text>
                        </Box >
                        <Flex
                            width={'10%'}
                            justify={'center'}
                            align='center'
                        >
                            {post.voteStatus !== 0 && <Text>post.voteStatus</Text>}
                        </Flex>
                        <Flex
                            width={'10%'}
                            justify={'center'}
                            align='center'
                            float={'left'}
                        >
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<BsThreeDots />}
                                    color={'black'}
                                    bg={'transparent'}
                                    _hover={{}}

                                />
                                <MenuList>
                                    <MenuItem icon={<VscReport />} >
                                        Report
                                    </MenuItem>
                                    <MenuItem color="red" icon={<RiDeleteBinLine />} display={post.creatorID === uid ? 'unset' : 'none'}>
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
                            display={image ? 'flex' : 'none'}
                            align={'center'}
                            justify={'center'}
                            padding={'8px'}
                            maxHeight={'400px'}
                            boxShadow={'2xl'}
                            border={'0.1px solid black'}
                        >
                            <Image maxHeight={'100%'} maxWidth={'100%'} display={image ? 'flex' : 'none'} src={image} border='4px solid black' alt='only images are supported as of now' />
                        </Flex>
                        <Flex
                            display={embed ? 'flex' : 'none'}
                            align={'center'}
                            justify={'center'}
                            padding={'8px'}
                            maxHeight={'400px'}
                            boxShadow={'2xl'}
                            border={'0.1px solid black'}
                        >
                            <Image maxHeight={'100%'} maxWidth={'100%'} display={embed ? 'flex' : 'none'} src={embed} border='4px solid black' alt='only images are supported as of now' />
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
                        <Text color={heartValue === 3 ? 'purple' : heartValue === 2 ? 'red' : heartValue === 1 ? 'red' : 'white'}>
                            +{heartValue}
                        </Text>
                        <Icon
                            as={CiHeart}
                            fontSize={'40px'}
                            mr={1}
                            ml={1}
                            onClick={updateHeartValue}
                            display={heartValue === 0 ? 'unset' : 'none'}
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
                            onClick={updateHeartValue}
                            display={heartValue === 1 ? 'unset' : 'none'}
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
                            onClick={updateHeartValue}
                            display={heartValue === 2 ? 'unset' : 'none'}
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
                            onClick={updateHeartValue}
                            ml={1}
                            display={heartValue === 3 ? 'unset' : 'none'}
                            color={'purple'}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                        />
                        <Icon
                            as={TfiCommentAlt}
                            fontSize={'30px'}
                            mr={1}
                            ml={1}
                            _hover={{
                                border: '1px solid gray',
                                borderRadius: '4'
                            }}
                        />
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