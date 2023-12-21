import { Flex, Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

type SubmitHeaderProps = {
    communityID: string,
    imageLink: string,
    backLink: string,
};

const SubmitHeader: React.FC<SubmitHeaderProps> = ({ communityID, imageLink, backLink }) => {
    var imageWidth: number = 120;
    return (
        <>
            <Flex
                flexDirection={'column'}
                width={'100%'}
                mb={4}
            >
                <Box height={'50px'} overflow={'hidden'}>
                    <Image src={backLink} alt={'just theming'} />
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
                            {communityID}
                        </Text>
                        <Text
                            fontSize={'50px'}
                            color={'purple.300'}
                            position={'relative'}
                            top='-14px'
                            display={{ base: 'none', md: 'unset' }}
                        >
                            /submitPost
                        </Text>
                    </Flex>
                </Flex>
            </Flex >
        </>
    )
}
export default SubmitHeader;