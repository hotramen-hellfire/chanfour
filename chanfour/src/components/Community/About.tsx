import React from 'react';
import { Community } from '../atoms/communitiesAtom';
import { Code, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';

type AboutProps = {
    communityData: Community
};

const About: React.FC<AboutProps> = ({ communityData }) => {

    return (
        <>
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
                maxWidth={'100%'}
                position={'sticky'}
                top={'14px'}
            >
                <Flex width={'100%'} justify={'center'} align={'center'} flexDirection={'column'}>
                    <Code color={'pink.500'} bg={'pink.100'} width={'100%'}>ABOUT COMMUNITY</Code>
                    <Stack spacing={'2px'} width={'100%'}>
                        <Code colorScheme='green' width={'100%'}>#Members: {communityData.numberOfMembers}</Code>
                        <Code colorScheme='yellow' width={'100%'}>#Posts: {communityData.numberOfPosts}</Code>
                        <Code colorScheme='pink'>#Activity: {communityData.activity}</Code>
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
                <Flex width={'100%'} padding="2px 4px 4px 2px" fontSize={12} color={'gray'}>
                    created by {communityData.creatorID}
                    {communityData.createdAt && <Text><br />{moment(new Date(communityData.createdAt.seconds * 1000)).format("MMM DD, YYYY")}</Text>}
                </Flex>
            </Flex >
        </>
    )
}
export default About;