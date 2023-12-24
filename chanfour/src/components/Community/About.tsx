import React, { useEffect, useState } from 'react';
import { Community, communityState } from '../Atoms/communitiesAtom';
import { Code, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useRecoilState, useRecoilValue } from 'recoil';

type AboutProps = {
    communityData: Community
};

const About: React.FC<AboutProps> = ({ communityData }) => {
    const communityStateValue = useRecoilValue(communityState);
    const [numPosts, setNumPosts] = useState(communityData.numberOfPosts);
    useEffect(() => {
        if (communityStateValue.currentCommunity) setNumPosts(communityStateValue.currentCommunity!.numberOfPosts);
    }, [communityStateValue])
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
                    <Code color={'pink.500'} bg={'pink.100'} width={'100%'}>ABOUT COMMUNITY</Code>
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
                <Flex width={'100%'} padding="2px 4px 4px 2px" fontSize={12} color={'gray'} justify={'left'} flexDirection={'column'}>
                    created by {communityData.creatorID}
                    {communityData.createdAt && <Text>{moment(new Date(communityData.createdAt.seconds * 1000)).format("MMM DD, YYYY")}</Text>}
                </Flex>
            </Flex >
        </>
    )
}
export default About;