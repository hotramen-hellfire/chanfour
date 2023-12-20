import { Code, Divider, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Post } from '../atoms/postsAtom';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: () => {};
    onDeletePost: () => {};
    onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost }) => {
    const [image, setPostImage] = useState("");
    const [embed, setPostEmbed] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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
                    <Flex flexDirection='row' borderRadius={5} bg='white' width={"100%"} >
                        <Text fontWeight={600} mr={2}>{post.title}</Text>
                        <Text position="relative" top={1.5} color="grey.200" fontSize={12}>by {post.creatorUName}</Text>
                        <Text position="relative" top={1.5} color="grey" fontWeight={5} fontSize={12}>&gt;_&lt;{post.creatorID}</Text>
                    </Flex >
                    <Flex
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                    ></Flex>
                    {/* <Divider orientation='horizontal' bg='black' /> */}
                    {/* content box */}
                    <Flex borderRadius={5}
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
                </Flex >
            </Flex >
        </>
    )
}
export default PostItem;