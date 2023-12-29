import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdCloseFullscreen } from 'react-icons/md';

type AboutSiteProps = {

};

const AboutSite: React.FC<AboutSiteProps> = () => {
    const [display, setDisplay] = useState(true);
    return (
        <Flex
            display={display ? 'flex' : 'none'}
            width={'80%'}
            // height={'100px'}
            flexDirection={'column'}
            backdropFilter={'blur(100px)'}
            borderRadius={10}
            justify={'center'}
            align={'center'}
            border={'1px solid purple'}
            boxShadow={'2xl'}
            _hover={{
                boxShadow: 'dark-lg'
            }}
        >
            <Flex
                direction={'row'}
                justify={'center'}
                align={'center'}
                width={'100%'}
            >
                <Flex
                    // height={'40px'}
                    width={'80%'}
                    // border={'1px solid white'}
                    justify={'center'}
                    align={'center'}
                >
                    <Text
                        color={'white'}
                        fontSize={30}
                        fontWeight={50}
                    >
                        WHAT IS SAITAMA??
                    </Text>
                </Flex>
                <Flex
                    justifySelf={'flex-end'}
                >
                    <Icon
                        as={MdCloseFullscreen}
                        color={'white'}
                        _hover={{
                            fontSize: 30
                        }}
                        onClick={() => { setDisplay(false) }}
                    />
                </Flex>
            </Flex>

            <Flex
                width={'95%'}
                height={0.25}
                border={'0.5px solid white'} />
            <Flex
                // height={'60px'}
                width={'93%'}
                align={'center'}
                justify={'space-evenly'}
                p={4}
                flexDirection={'column'}
            // display={props.loading ? 'flex' : 'none'}
            >
                <Image
                    src='/images/leaf.png'
                    height={'100px'}
                />
                <Flex
                    width={'100%'}
                >
                    <Text
                        color={'white'}
                    >
                        Saitama is a simple content sharing website, users can create boards and tag them by
                        intrests(indexes) these intrests allows other users with similar intrests to join and contribute to the
                        same communities. Any user can create a board, but before creating one you are advised to check below in
                        BOARDS BY INTRESTS section to check if one already exists. After creating a board, any member of a board can list/ tag
                        the board with the intrest tag from the same section. After listing your board in an intrest, the same tag appears on
                        the board homepage and the board in also listed in the corresponding intrest on the HomePage. Users can also add new intrests
                        whenever the existing ones do not suffice. :)
                    </Text>
                </Flex>
            </Flex>
        </Flex >
    )
}
export default AboutSite;