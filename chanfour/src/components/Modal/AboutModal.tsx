import { Code, Flex, Icon, Image, Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react';
import { FaGit, FaGithubAlt } from "react-icons/fa6";
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
                                m={2}
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
                                p={2}
                            >
                                <Image src="https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/leaf.png" height="100px" />
                            </Flex>
                            <Flex
                                w={'90%'}
                                flexDirection={'column'}
                            >
                                <Code
                                    w={'100%'}
                                >
                                    This website was created in order to find new people in our sphere with similar intrests as ours(firstly, HipHop). It took around 15 days to
                                    complete the first deployable with minimal features and maybe a 1000 bugs.
                                    <br />
                                    This website is a result of people with no academic or, in that matter, concerns of any sort, seemingly infinite amount of time and
                                    obsession, in our case, rap music, and hitting keyboard too loud results in. We started with reddit like communities, then added indexes (intrests) to
                                    cluster communities which fall into the same category, like 4chan.
                                    <br />
                                    The source code for this project, along with instructions for setup and other nuances, is available on the cat logo.
                                    at the bottom of this message. . .
                                    <br />
                                </Code>
                                <Code
                                    mt={2}
                                >
                                    Sukhmanjot Singh<br />
                                    Himanshu Gangwal
                                </Code>
                            </Flex>

                            <Icon
                                mt={2}
                                as={FaGithubAlt}
                                color={'white'}
                                fontSize={'50px'}
                            />
                            <Icon

                                as={FaGit}
                                color={'white'}
                                fontSize={'16px'}
                                mb={2}
                            />
                            {/* <Flex
                                mt={2}
                                width={'95%'}
                                height={0.25}
                                border={'0.5px solid white'}
                                mb={2}
                            /> */}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}
export default AboutModal;