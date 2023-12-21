import SubmitRedirect from '@/src/components/Community/SubmitRedirect';
import { Community } from '@/src/components/atoms/communitiesAtom';
import { Code, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineCloseFullscreen } from "react-icons/md";
type CommunityAdminModalProps = {
    commmunityData: Community;
    camodalState: boolean,
    setCAModalState: (state: boolean) => void;
};

const CommunityAdminModal: React.FC<CommunityAdminModalProps> = ({ commmunityData, camodalState, setCAModalState }) => {
    if (!commmunityData) <SubmitRedirect />;
    const descLength = 800;
    const [charsRemaining, setCharsRemaining] = useState(descLength - commmunityData.description.length);
    const [textInput, setTextInput] = useState({
        description: commmunityData.description,
    });
    const [url, setUrl] = useState(commmunityData.imageURL)
    const [backURL, setBackURL] = useState(commmunityData.backURL)

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
    };
    const onURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };
    const onBackURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBackURL(event.target.value);
    };
    return (
        <>
            <Modal isOpen={camodalState} onClose={() => { }} size={'xl'}>
                <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
                <ModalContent alignItems={'center'} border={'1px solid black'}>
                    <Flex
                        textAlign={'center'}
                        width={'100%'}
                        mt={1}
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
                                onClick={() => setCAModalState(false)}
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
                                    border: '1px solid purple',
                                    boxShadow: '2xl'
                                }}
                                _focus={{
                                    outline: "none",
                                    border: '1px solid purple',
                                    boxShadow: 'dark-lg'
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
                        <Flex
                            mt={2}
                            flexDirection={'column'}
                            textAlign={'center'}
                        >
                            <Text color={'purple'} fontSize={20}>
                                Board Icon
                                <Text fontSize={11} color={'gray.500'}>
                                    tip: use oshi.at
                                </Text>
                            </Text>
                            <Input
                                name={url}
                                value={url}
                                placeholder={'Set Icon URL'}
                                _placeholder={{ color: "purple.500" }}
                                _hover={{
                                    border: '1px solid purple',
                                    boxShadow: '2xl'
                                }}
                                _focus={{
                                    outline: "none",
                                    border: '1px solid purple',
                                    boxShadow: 'dark-lg'
                                }}
                                _focusVisible={{
                                    outline: "none",
                                }}
                                borderRadius={'9px'}
                                onChange={onURLChange}
                                boxShadow={'xl'}
                            />
                        </Flex>
                        <Flex
                            mt={2}
                            flexDirection={'column'}
                            textAlign={'center'}
                        >
                            <Text color={'purple'} fontSize={20}>
                                Background Image
                                <Text fontSize={11} color={'gray.500'}>
                                    tip: use oshi.at
                                </Text>
                            </Text>
                            <Input
                                name={backURL}
                                value={backURL}
                                placeholder={'Set Icon URL'}
                                _placeholder={{ color: "purple.500" }}
                                _hover={{
                                    border: '1px solid purple',
                                    boxShadow: '2xl'
                                }}
                                _focus={{
                                    outline: "none",
                                    border: '1px solid purple',
                                    boxShadow: 'dark-lg'
                                }}
                                _focusVisible={{
                                    outline: "none",
                                }}
                                borderRadius={'9px'}
                                onChange={onBackURLChange}
                                boxShadow={'xl'}
                            />
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Code
                            ml={1}
                            mr={1}
                            fontSize={20}
                            cursor={'pointer'}
                            onClick={() => setCAModalState(false)}
                            _hover={{ fontSize: 30 }}
                            colorScheme={backURL === commmunityData.backURL && url === commmunityData.imageURL && textInput.description === commmunityData.description ? 'green' : 'red'}>
                            CLOSE
                        </Code>
                        <Code
                            ml={1}
                            mr={1}
                            fontSize={20}
                            cursor={'pointer'}
                            _hover={{ fontSize: 30 }}
                            colorScheme='purple'>
                            UPDATE
                        </Code>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default CommunityAdminModal;