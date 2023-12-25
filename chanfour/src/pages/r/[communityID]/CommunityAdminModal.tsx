import { Community, communityFunctionsState } from '@/src/components/Atoms/communitiesAtom';
import SubmitRedirect from '@/src/components/Community/SubmitRedirect';
import { Code, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Spinner, Text, Textarea } from '@chakra-ui/react';
import Router from "next/router";
import React, { useEffect, useState } from 'react';
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useRecoilValue } from 'recoil';
type CommunityAdminModalProps = {
    commmunityData: Community;
    camodalState: boolean,
    setCAModalState: (state: boolean) => void;
};

const CommunityAdminModal: React.FC<CommunityAdminModalProps> = ({ commmunityData, camodalState, setCAModalState }) => {
    if (!commmunityData) <SubmitRedirect />;
    const { updateBID, loading } = useRecoilValue(communityFunctionsState);
    const descLength = 800;
    const [charsRemaining, setCharsRemaining] = useState(descLength - commmunityData.description.length);
    const [textInput, setTextInput] = useState({
        description: commmunityData.description,
    });
    const [change, setChange] = useState(false);
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
    const handleBIDCommit = async () => {
        await updateBID(commmunityData, { description: textInput.description, imageURL: url, backURL: backURL });
        setChange(true);
    }

    const exitModal = () => {
        setCAModalState(false);
        if (change) {
            Router.reload();
        }
    }
    useEffect(() => {
        setUrl(commmunityData.imageURL);
        setBackURL(commmunityData.backURL);
        setChange(false);
        setTextInput({ description: commmunityData.description, })
        setCharsRemaining(descLength - commmunityData.description.length)
    }, [commmunityData])
    return (
        <>
            <Modal isOpen={camodalState} onClose={() => { }} size={'xl'}>
                <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
                <ModalContent alignItems={'center'} border={'1px solid black'} minW={{ base: '10%', md: '80%' }}>
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
                                onClick={exitModal}
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
                            </Text>
                            <Text fontSize={11} fontWeight={charsRemaining === 0 ? 1000 : 500} color={charsRemaining === 0 ? 'purple' : 'gray.500'}>
                                {charsRemaining} Characters remaining
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
                            <Text fontSize={11} color={'gray.500'}>
                                (smaller image sizes make loading faster)
                                compress at: www.img2go.com/compress-image<br />
                                upload: use oshi.at
                            </Text>
                            <Text color={'purple'} fontSize={20}>
                                Board Icon
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
                            display={loading ? 'none' : 'flex'}
                            onClick={exitModal}
                            _hover={{ fontSize: 30 }}
                            colorScheme={backURL === commmunityData.backURL && url === commmunityData.imageURL && textInput.description === commmunityData.description ? 'green' : 'red'}>
                            CLOSE
                        </Code>
                        <Code
                            ml={1}
                            mr={1}
                            fontSize={20}
                            cursor={'pointer'}
                            onClick={handleBIDCommit}
                            display={loading ? 'none' : 'flex'}
                            _hover={{ fontSize: 30 }}
                            colorScheme='purple'>
                            UPDATE
                        </Code>
                        <Spinner display={loading ? 'unset' : 'none'} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default CommunityAdminModal;