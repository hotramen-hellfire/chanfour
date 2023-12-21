import { Community } from '@/src/components/atoms/communitiesAtom';
import { loadingState } from '@/src/components/atoms/loadingAtom';
import { authentication } from '@/src/firebase/clientApp';
import useCommunityData from '@/src/hooks/useCommunityData';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import CommunityAdminModal from './CommunityAdminModal';
type HeaderProps = {
    communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
    const [user] = useAuthState(authentication);
    const [camodalState, setCAModalState] = useState(false);
    const { commmunityStateValue, onJoinOrLeaveCommunity, loading } = useCommunityData();
    const isJoined = !!commmunityStateValue.mySnippets.find(item => item.communityID === communityData.communityID)
    var imageLink: string = "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communityDefaultIcon.jpg"
    var imageWidth: number = 120;
    var backLink: string = 'https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communitiesBack.jpg';
    if (communityData.imageURL) imageLink = communityData.imageURL;
    if (communityData.backURL) backLink = communityData.backURL;
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
                <Box height={'50px'} overflow={'hidden'}>
                    <Image src={backLink} alt={'just theming'} />
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
                            onClick={() => { setCAModalState(true) }}
                            display={user?.email?.split(".")[0] === communityData.creatorID ? 'flex' : 'none'}
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
                            Admin
                        </Button>
                    </Flex>
                </Flex>
            </Flex >
        </>
    )
}
export default Header;