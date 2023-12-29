import { Community, communityState } from '@/src/components/Atoms/communitiesAtom';
import { loadingState } from '@/src/components/Atoms/loadingAtom';
import { authentication } from '@/src/firebase/clientApp';
import useCommunityFunctions from '@/src/hooks/useCommunityFunctions';
import { Box, Button, Code, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import CommunityAdminModal from './CommunityAdminModal';
type HeaderProps = {
    communityData: Community;
    imageLink: string;
    backLink: string;
};

const Header: React.FC<HeaderProps> = ({ communityData, imageLink, backLink }) => {
    if (!communityData) return <></>;
    const [user] = useAuthState(authentication);
    const [camodalState, setCAModalState] = useState(false);
    // const { onJoinOrLeaveCommunity, loading } = useRecoilValue(communityFunctionsState);
    const { onJoinOrLeaveCommunity, loading } = useCommunityFunctions();
    const commmunityStateValue = useRecoilValue(communityState);
    const [isJoined, setIsJoined] = useState(!!commmunityStateValue.mySnippets.find(item => item.communityID === communityData.communityID))
    var imageWidth: number = 120;
    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        setLoadingBar(loading)
    }, [loading])
    useEffect(() => {
        setIsJoined(!!commmunityStateValue.mySnippets.find(item => item.communityID === communityData.communityID))
    }, [user, commmunityStateValue])
    return (
        <>
            <CommunityAdminModal camodalState={camodalState} setCAModalState={setCAModalState} commmunityData={communityData} />
            <Flex
                flexDirection={'column'}
                width={'100%'}
            // border={'1px solid pink'}
            >
                <Box height={'50px'} overflow={'hidden'} width={'100%'} bg={'transparent'} />
                {/* <Image src={backLink} alt={'just theming'} width={'100%'} /> */}
                <Flex
                    bg='white'
                    flexGrow={1}
                    overflow={'visible'}
                    border={'2px solid violet'}
                    // border={'4px solid red'}
                    boxShadow={'dark-lg'}
                    height={{ base: '100px', md: '75px' }}
                    width={'100%'}
                >
                    <Flex
                        width={{ base: '1%', md: '5%' }}
                        flexDirection={'row'}
                    // border={'2px solid red'}
                    >
                    </Flex>
                    <Flex
                        flexDirection={'row'}
                        width={'100%'}
                        // border={'2px solid red'}
                        justify={'center'}
                    >
                        <Box
                            height={imageWidth}
                            width={imageWidth}
                            alignItems={'center'}
                            justifyContent={'center'}
                            position={'relative'}
                            top={"-35px"}
                            borderRadius={imageWidth / 4}
                            overflow={"hidden"}
                            border={'3px solid white'}
                            mr={3}
                            boxShadow={'dark-lg'}
                        // border={'2px solid green'}
                        >
                            <Image
                                src={imageLink}
                                objectFit={'cover'}
                                minWidth={imageWidth}
                                minHeight={imageWidth}
                            />
                        </Box>


                        <Flex
                            // border={'3px solid yellow'}
                            display={{ base: 'none', md: 'flex' }}
                            justify={{ lg: 'left', md: 'center' }}
                            width={'75%'}
                        >
                            <Flex
                            // border={'2px solid green'}
                            // minWidth={'50%'}
                            >
                                <Text
                                    fontSize={'50px'}
                                    color={'purple.300'}
                                    position={'relative'}
                                    top='-14px'
                                >
                                    b/
                                </Text>
                                <Text
                                    fontSize={'38px'}
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
                                    display={user?.email === communityData.creatorID ? 'flex' : 'none'}
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
                        <Flex
                            // border={'2px solid orange'}
                            display={{ base: 'flex', md: 'none' }}
                            height={'100%'}
                            width={'65%'}
                        >
                            <Flex
                                // border={'2px solid green'}
                                display={{ base: 'flex', md: 'none' }}
                                height={'100%'}
                                width={'100%'}
                                flexDirection={'column'}
                            >
                                <Code
                                    fontSize={'30'}
                                    colorScheme='purple'
                                    textAlign={'center'}
                                >
                                    b/{communityData.communityID}
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
                                        display={user?.email === communityData.creatorID ? 'flex' : 'none'}
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
                </Flex>
            </Flex >
        </>
    )
}
export default Header;