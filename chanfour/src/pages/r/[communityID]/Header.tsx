import { Community } from '@/src/components/atoms/communitiesAtom';
import { loadingState } from '@/src/components/atoms/loadingAtom';
import useCommunityData from '@/src/hooks/useCommunityData';
import { Box, Button, Code, Flex, Image, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
type HeaderProps = {
    communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
    const { commmunityStateValue, onJoinOrLeaveCommunity, loading } = useCommunityData();
    const isJoined = !!commmunityStateValue.mySnippets.find(item => item.communityID === communityData.communityID)
    var imageLink: string = "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communityDefaultIcon.jpg"
    var imageWidth: number = 120;
    if (communityData.imageURL) imageLink = communityData.imageURL;
    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        setLoadingBar(loading)
    }, [loading])
    return (
        <>
            <Flex
                flexDirection={'column'}
                width={'100%'}
            >
                <Box height={'50px'} overflow={'hidden'}>
                    <Image src={'https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communitiesBack.jpg'} alt={'just theming'} />
                </Box>
                <Flex bg='white' flexGrow={1} overflow={'visible'} border={'2px solid violet'} boxShadow={'dark-lg'}>
                    <Flex
                        height='50px'
                        width='9%'
                        maxWidth={'1000px'}
                        flexDirection={'row'}
                    // border={'2px solid red'}
                    >
                    </Flex>
                    <Flex
                        height='50px'
                        width='60%'
                        maxWidth={'1000px'}
                        flexDirection={'row'}
                    // border={'2px solid green'}
                    >
                        <Flex
                            height={imageWidth}
                            width={imageWidth}
                            alignItems={'center'}
                            justifyContent={'center'}
                            position={'relative'}
                            top={"-35px"}
                            borderBottom={'2px solid pink'}
                            borderRadius={imageWidth / 4}
                            mr={5}
                        >
                            <Image
                                src={imageLink}
                                height={imageWidth}
                                width={imageWidth}
                                borderRadius={imageWidth / 4}
                                border='4px solid white'
                            />
                        </Flex>
                        <Text
                            fontSize={'50px'}
                            color={'purple.300'}
                            position={'relative'}
                            top='-14px'
                        >
                            r/
                        </Text>
                        <Text
                            fontSize={'40px'}
                            color={'purple'}
                            position={'relative'}
                            top='-4px'
                        >
                            {communityData.communityID}
                        </Text>
                        <Button
                            borderRadius={0}
                            height={'40px'}
                            width={'80px'}
                            border='2px solid purple'
                            variant={'outline'}
                            position={'relative'}
                            top={'1'}
                            bg='white'
                            ml={5}
                            isLoading={loading}
                            fontSize={'20px'}
                            onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                            _hover={{
                                bg: 'purple',
                                color: 'white',
                                fontSize: '40px',
                                top: '-4',
                                height: '80px',
                                width: '160px',
                                border: '2px solid white'
                            }}
                        >
                            {isJoined ? 'Joined' : 'Join'}
                        </Button>
                    </Flex>
                    {/* <Flex
                        height='50px'
                        minWidth='9%'
                        maxWidth={'1000px'}
                        flexDirection={'column'}
                        // border={'2px solid red'}
                        display={{ base: 'none', md: 'flex' }}
                        color={'green'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Stack spacing={'2px'} width={'100%'}>
                            <Code colorScheme='green' width={'100%'}>#Members: {communityData.numberOfMembers}</Code>
                            <Code colorScheme='yellow' width={'100%'}>#Posts: {communityData.numberOfPosts}</Code>
                        </Stack>
                    </Flex>
                    <Flex
                        height='50px'
                        minWidth='9%'
                        maxWidth={'1000px'}
                        flexDirection={'column'}
                        // border={'2px solid red'}
                        display={{ base: 'none', md: 'flex' }}
                        color={'green'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Code colorScheme='pink'>#Activity: {communityData.activity}</Code>
                    </Flex> */}
                </Flex>
            </Flex >
        </>
    )
}
export default Header;