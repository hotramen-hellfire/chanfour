import React, { useEffect, useState } from 'react';
import { Community, communityState } from '../Atoms/communitiesAtom';
import { Code, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useRecoilState, useRecoilValue } from 'recoil';
import { firestore } from '@/src/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';

type AboutProps = {
    communityData: Community
};

const About: React.FC<AboutProps> = ({ communityData }) => {
    const communityStateValue = useRecoilValue(communityState);
    const [numPosts, setNumPosts] = useState(communityData.numberOfPosts);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagId, setTagId] = useState("")
    const colors = ["yellow", 'red', 'blue', 'green', 'pink', 'purple']
    useEffect(() => {
        if (communityStateValue.currentCommunity) setNumPosts(communityStateValue.currentCommunity!.numberOfPosts);
    }, [communityStateValue])
    useEffect(() => {
        // setSelectedCommunity("");
        const getTags = async () => {
            setLoading(true);
            try {
                const docRef = doc(firestore, 'meta', 'tags')
                const document = await getDoc(docRef);
                if (!document.exists) throw Error("");
                const value = { ...document.data() }
                if (communityStateValue.currentCommunity) {
                    if (value[communityStateValue.currentCommunity.communityID]) {
                        setTags((value[communityStateValue.currentCommunity.communityID] as string).split(',') as string[]);
                        setTagId(communityStateValue.currentCommunity.communityID);
                    }
                    else {
                        setTags([]);
                        setTagId(communityStateValue.currentCommunity.communityID);
                    }
                }
                else {
                    setTags([]);
                }
            } catch (error: any) {
                setError(error.message);
                console.log("getTags error: ", error.message);
            }
            setLoading(false);
        }
        if (communityStateValue.currentCommunity) if (tags.length < 1 || tagId !== communityStateValue.currentCommunity.communityID) getTags();
    }, [communityStateValue.currentCommunity])

    return (
        <>
            <Flex border='2px solid purple'
                mt={2}
                mb={6}
                padding='4px 4px 4px 4px'
                bg='white'
                borderRadius={10}
                flexDirection={'column'}
                boxShadow={'2xl'}
                _hover={{
                    boxShadow: 'dark-lg'
                }}
                width={'100%'}
                position={'sticky'}
                top={'14px'}
            >
                <Flex width={'100%'} justify={'center'} align={'center'} flexDirection={'column'}>
                    <Code color={'pink.500'} bg={'pink.100'} width={'100%'}>ABOUT BOARD</Code>
                    <Stack spacing={'2px'} width={'100%'}>
                        <Code colorScheme='green' width={'100%'}>#Members: {communityData.numberOfMembers}</Code>
                        <Code colorScheme='yellow' width={'100%'}>#Posts: {numPosts}</Code>
                    </Stack>
                </Flex>
                <Flex
                    height={'1px'}
                    border={'0.5px solid black'}
                    boxShadow={'dark-lg'}
                    mt={1}
                    width={'100%'}
                />
                <Flex width={'100%'} padding="2px 4px 4px 2px" fontSize={14}>
                    {communityData.description}
                </Flex>
                {tags &&
                    <Flex
                        width={'100%'}
                        // height={'200px'}
                        // border={'1px solid red'}
                        flexDirection={'row'}
                        p={1}
                        flexWrap={'wrap'}
                    >

                        {tags.map(item =>
                            <Code
                                key={item}
                                height={'20px'}
                                colorScheme={colors[Math.floor(Math.random() * colors.length)]}
                                mr={1}
                                mb={1}
                                border={'1px solid black'}
                            >
                                {item}
                            </Code>
                        )}
                    </Flex>

                }
                <Flex width={'100%'} padding="2px 4px 4px 2px" fontSize={12} color={'gray'} justify={'left'} flexDirection={'column'}>
                    created by {communityData.creatorID}
                    {communityData.createdAt && <Text>{moment(new Date(communityData.createdAt.seconds * 1000)).format("MMM DD, YYYY")}</Text>}
                </Flex>
            </Flex >
        </>
    )
}
export default About;