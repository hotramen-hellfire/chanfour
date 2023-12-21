import { Community, communityState } from '@/src/components/atoms/communitiesAtom';
import { Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Code, Textarea, Icon, Flex } from '@chakra-ui/react';
import router from 'next/router';
import React, { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import SubmitRedirect from '@/src/components/Community/SubmitRedirect';
import { MdOutlineCloseFullscreen } from "react-icons/md";
type CommunityAdminModalProps = {
    commmunityData: Community;
};

const CommunityAdminModal: React.FC<CommunityAdminModalProps> = ({ commmunityData }) => {
    if (!commmunityData) <SubmitRedirect />;
    const descLength = 800;
    const [charsRemaining, setCharsRemaining] = useState(descLength - commmunityData.description.length);
    const [textInput, setTextInput] = useState({
        description: commmunityData.description,
    });

    const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length > descLength) {
            event.target.value = event.target.value.substring(0, descLength);
            return;
        }
        setCharsRemaining(descLength - event.target.value.length)
        setTextInput(prev => ({
            ...prev,
            description: event.target.value,
        }))
        console.log(textInput.description);
    };
    return (
        <>
            <Modal isOpen={true} onClose={() => { }} size={'xl'}>
                <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
                <ModalContent alignItems={'center'} border={'1px solid black'} boxShadow={'large-xl'}>
                    <Flex
                        textAlign={'center'}
                        width={'100%'}
                        mt={1}
                    // alignItems={'center'}
                    // alignContent={'center'}
                    // justifyContent={'center'}
                    // justifyItems={'center'}
                    >
                        <Flex
                            width={'10%'}
                            minHeight={'100%'}
                        >
                        </Flex>

                        <Flex
                            width={'80%'}
                            minHeight={'100%'}
                            textAlign={'center'}
                            justify={'center'}
                            align={'center'}
                            flexDirection={'column'}
                        >
                            <Code fontSize={30} colorScheme='purple'>r/{commmunityData.communityID}</Code>
                        </Flex>
                        <Flex
                            width={'10%'}
                            minHeight={'100%'}
                            align={'center'}
                            justify={'center'}
                        >
                            <Icon
                                as={MdOutlineCloseFullscreen}
                                fontSize={20}
                                color={'purple'}
                                _hover={{ fontSize: 30 }}
                            />
                        </Flex>
                    </Flex>
                    <Flex
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                        width={'80%'}
                        mt={1}
                    />
                    <ModalBody width={'100%'}>
                        <Flex
                            flexDirection={'column'}
                            textAlign={'center'}
                        >
                            <Text color={'purple'} fontSize={20}>
                                Board Description
                                <Text fontSize={11} fontWeight={charsRemaining === 0 ? 1000 : 500} color={charsRemaining === 0 ? 'purple' : 'gray.500'}>
                                    {charsRemaining} Characters remaining
                                </Text>
                            </Text>
                            <Textarea
                                name={textInput.description}
                                value={textInput.description}
                                placeholder={'Set Board Description'}
                                _placeholder={{ color: "purple.500" }}
                                _hover={{
                                    border: '1px solid purple'
                                }}
                                _focus={{
                                    outline: "none",
                                    border: '1px solid purple'

                                }}
                                _focusVisible={{
                                    outline: "none",
                                }}
                                borderRadius={'9px'}
                                onChange={onDescriptionChange}
                                paddingTop={'10px'}
                                minHeight={"300px"}
                                boxShadow={'xl'}
                            />
                        </Flex>



                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => { }}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            hi
        </>
    )
}
export default CommunityAdminModal;