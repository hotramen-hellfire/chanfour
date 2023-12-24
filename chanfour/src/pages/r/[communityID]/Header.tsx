import { Community } from '@/src/components/Atoms/communitiesAtom';
import { loadingState } from '@/src/components/Atoms/loadingAtom';
import { authentication } from '@/src/firebase/clientApp';
import useCommunityData from '@/src/hooks/useCommunityData';
import { Box, Button, Code, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import CommunityAdminModal from './CommunityAdminModal';
type HeaderProps = {
    communityData: Community;
    imageLink: string;
    backLink: string;
};

const Header: React.FC<HeaderProps> = ({ communityData, imageLink, backLink }) => {
    const [user] = useAuthState(authentication);
    const [camodalState, setCAModalState] = useState(false);
    const { commmunityStateValue, onJoinOrLeaveCommunity, loading } = useCommunityData();
    const isJoined = !!commmunityStateValue.mySnippets.find(item => item.communityID === communityData.communityID)
    var imageWidth: number = 120;
    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        setLoadingBar(loading)
    }, [loading])

    return (
        <>
            <CommunityAdminModal camodalState={camodalState} setCAModalState={setCAModalState} commmunityData={communityData} />
            <Flex
                flexDirection={'column'}
                width={'100%'}
            >
                <Box height={'50px'} overflow={'hidden'} width={'100%'}>
                    <Image src={backLink} alt={'just theming'} width={'100%'} />
                </Box>
                <Flex
                    bg='white'
                    flexGrow={1}
                    overflow={'visible'}
                    border={'2px solid violet'}
                    boxShadow={'dark-lg'}
                    height={{ base: '100px', md: '75px' }}
                >
                    <Flex
                        width={{ base: '1%', md: '8%' }}
                        maxWidth={'1000px'}
                        flexDirection={'row'}
                    // border={'2px solid red'}
                    >
                    </Flex>
                    <Flex
                        flexDirection={'row'}
                        width={'100%'}
                    // border={'2px solid green'}
                    >
                        <Flex
                            height={imageWidth}
                            width={imageWidth}
                            alignItems={'center'}
                            justifyContent={'center'}
                            position={'relative'}
                            top={"-35px"}
                            borderRadius={imageWidth / 4}
                            overflow={"hidden"}
                            border={'3px solid white'}
                            mr={5}
                            boxShadow={'dark-lg'}
                        // border={'2px solid green'}
                        >
                            <Image
                                src={imageLink}
                                objectFit={'cover'}
                                minWidth={imageWidth}
                                minHeight={imageWidth}
                            />
                        </Flex>
                        <Flex
                            // border={'2px solid green'}
                            display={{ base: 'none', md: 'flex' }}
                            maxWidth={'70%'}
                        >
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
                        </Flex>
                        <Flex
                            // border={'2px solid green'}
                            flexDirection='row'
                            align={'center'}
                            display={{ base: 'none', md: 'flex' }}
                            p={2}
                        >
                            <Button
                                m={1}
                                borderRadius={0}
                                height={'40px'}
                                width={'80px'}
                                border='2px solid purple'
                                variant={'outline'}
                                position={'relative'}
                                top={'1'}
                                bg='white'
                                isLoading={loading}
                                fontSize={'20px'}
                                onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                                _hover={{
                                    bg: 'purple',
                                    color: 'white',
                                    fontSize: '35px',
                                    top: '-4',
                                    height: '70px',
                                    width: '140px',
                                    border: '2px solid white'
                                }}
                            >
                                {isJoined ? 'Joined' : 'Join'}
                            </Button>
                            <Button
                                borderRadius={0}
                                height={'40px'}
                                width={'80px'}
                                border='2px solid purple'
                                variant={'outline'}
                                position={'relative'}
                                top={'1'}
                                bg='white'
                                isLoading={loading}
                                fontSize={'20px'}
                                onClick={() => { setCAModalState(true) }}
                                display={user?.email?.split(".")[0] === communityData.creatorID ? 'flex' : 'none'}
                                _hover={{
                                    bg: 'purple',
                                    color: 'white',
                                    fontSize: '35px',
                                    top: '-4',
                                    height: '70px',
                                    width: '140px',
                                    border: '2px solid white'
                                }}
                            >
                                Admin
                            </Button>
                        </Flex>
                        <Flex
                            // border={'2px solid green'}
                            display={{ base: 'flex', md: 'none' }}
                            height={'100%'}
                            maxWidth={'70%'}
                            flexDirection={'column'}
                        >
                            <Code
                                fontSize={'30'}
                                colorScheme='purple'
                            >
                                r/{communityData.communityID}
                            </Code>
                            <Flex
                                // border={'2px solid green'}
                                flexDirection='row'
                                align={'center'}
                                justify={'center'}
                            >
                                <Button
                                    mr={2}
                                    borderRadius={0}
                                    height={'40px'}
                                    width={'80px'}
                                    border='2px solid purple'
                                    variant={'outline'}
                                    position={'relative'}
                                    top={'1'}
                                    bg='white'
                                    isLoading={loading}
                                    fontSize={'20px'}
                                    onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                                    _hover={{
                                        bg: 'purple',
                                        color: 'white',
                                        fontSize: '35px',
                                        top: '-4',
                                        height: '70px',
                                        width: '140px',
                                        border: '2px solid white'
                                    }}
                                >
                                    {isJoined ? 'Joined' : 'Join'}
                                </Button>
                                <Button
                                    ml={2}
                                    borderRadius={0}
                                    height={'40px'}
                                    width={'80px'}
                                    border='2px solid purple'
                                    variant={'outline'}
                                    position={'relative'}
                                    top={'1'}
                                    bg='white'
                                    isLoading={loading}
                                    fontSize={'20px'}
                                    onClick={() => { setCAModalState(true) }}
                                    display={user?.email?.split(".")[0] === communityData.creatorID ? 'flex' : 'none'}
                                    _hover={{
                                        bg: 'purple',
                                        color: 'white',
                                        fontSize: '35px',
                                        top: '-4',
                                        height: '70px',
                                        width: '140px',
                                        border: '2px solid white'
                                    }}
                                >
                                    Admin
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex >
        </>
    )
}
export default Header;