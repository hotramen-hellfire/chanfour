import { Community } from '@/src/components/atoms/communitiesAtom';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import useCommunityData from '@/src/hooks/useCommunityData';

const SubmitHeader: React.FC = () => {
    var imageLink: string = "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communityDefaultIcon.jpg"
    var imageWidth: number = 120;
    if (communityData.imageURL) imageLink = communityData.imageURL;
    return (
        <>
            <Flex
                flexDirection={'column'}
                width={'100%'}
            >
                <Box height={'50px'} overflow={'hidden'}>
                    <Image src={'https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communitiesBack.jpg'} alt={'just theming'} />
                </Box>
                <Flex justify={'center'} bg='white' flexGrow={1} overflow={'visible'} border={'2px solid violet'}>
                    <Flex height='50px' width='95%' maxWidth={'1000px'} flexDirection={'row'}>
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
                </Flex>
            </Flex >
        </>
    )
}
export default SubmitHeader;