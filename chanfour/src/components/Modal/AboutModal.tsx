import loading from '@/src/pages/loading';
import { Modal, ModalOverlay, ModalContent, ModalBody, Flex, Icon, Input, Button, Text } from '@chakra-ui/react';
import error from 'next/error';
import React from 'react';
import { MdCloseFullscreen } from 'react-icons/md';

type AboutModalProps = {
    open: boolean,
    setOpen: (state: boolean) => void;
};

const AboutModal: React.FC<AboutModalProps> = (props) => {

    return (
        <>
            <Modal isOpen={props.open} onClose={() => { }}>
                <ModalOverlay
                    backdropFilter={'blur(10px)'}
                />
                <ModalContent
                    minW={'70%'}
                    bg={'transparent'}
                    justifyContent={'center'}
                    justifyItems={'center'}
                    alignContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                >
                    <ModalBody
                        minW={'100%'}
                        // border={'1px solid white'}
                        display={'flex'}
                    >
                        <Flex
                            width={'100%'}
                            // height={'100px'}
                            flexDirection={'column'}
                            backdropFilter={'blur(100px)'}
                            borderRadius={10}
                            justify={'center'}
                            align={'center'}
                            border={'1px solid purple'}
                        >
                            <Flex
                                height={'40px'}
                                width={'100%'}
                                // border={'1px solid white'}
                                justify={'center'}
                                align={'center'}
                            >
                                <Flex
                                    width={'90%'}
                                    justify={'space-around'}
                                >
                                    <Text
                                        color={'white'}
                                        fontSize={30}
                                        fontWeight={50}
                                    >
                                        ABOUT THIS WEBSITE
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
                                        onClick={() => { props.setOpen(false); }}
                                    />
                                </Flex>

                            </Flex>
                            <Flex
                                width={'95%'}
                                height={0.25}
                                border={'0.5px solid white'}
                                mb={2}
                            />
                            <Flex
                                w={'90%'}
                            >
                                <Text
                                    w={'100%'}
                                    color={'white'}
                                >
                                    This website was created in prder to find new people in our sphere with similar intrests as ours(firstly, HipHop). I took  around 15 days to
                                    complete the first deployable with minimal features and maybe a 1000bugs.
                                    <br />
                                    This website is a result of people with no academic or, in that matter, concerns of any sort, seemingly infinite amount of time and
                                    obsession, in our case, rap music, and hitting keyboard too loud results in. We started with reddit like communities, then added indexes (intrests) to
                                    cluster communities which fall into the same category, like 4chan.
                                    <br />
                                    The source code for this project, along with instructions for setup and other nuances, is available on the cat logo.
                                    at the bottom of this message. . .
                                </Text>
                            </Flex>
                            <Flex
                                mt={2}
                                width={'95%'}
                                height={0.25}
                                border={'0.5px solid white'}
                                mb={2}
                            />
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}
export default AboutModal;