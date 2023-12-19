import { authentication, firestore } from '@/src/firebase/clientApp';
import { Box, Button, Checkbox, Divider, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../atoms/loadingAtom';
type CreateCommunityModalProps = {
    open: boolean;
    handleClose:
    () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const [user] = useAuthState(authentication);
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [error, setError] = useState('false');
    const [loading, setLoading] = useState(false);
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    var uid: string = user!.email!.split(".")[0];
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length)
        if (format.test(event.target.value)) {
            setError("cannot contain /[ `!@#$%^&*()+\-=\[\]{};':\"\\|,.<>\/?~]/</>");
            return;
        }
        setError('');
    }
    const handleCreateCommunity = async () => {
        //validate community
        console.log("create community read/ write!!");
        if (communityName.length === 0) {
            setError("need a positive length to continue. . .");
            return;
        }
        if (error !== '') return;//also safe guards 
        setLoading(true);
        const communityDocRef = doc(firestore, 'communities', communityName);
        try {
            await runTransaction(firestore, async (transaction) => {
                const communityDoc = await transaction.get(communityDocRef);
                if (communityDoc.exists()) {
                    throw new Error('a board with the same name exists :(. . .');
                }
                //create the community doc in firestore
                transaction.set(communityDocRef, {
                    communityID: communityName,
                    creatorID: user!.email!.split('.')[0],
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType,
                    //fetchusernames as display properties
                })
                //add this community to the user
                transaction.set(
                    // console.log('userByID/' + { uid } + '/communitySnippets');
                    doc(firestore, 'userByID/' + uid + '/communitySnippets', communityName),
                    {
                        communityID: communityName,
                        isModerator: true,
                    }
                )
            })
        } catch (error: any) {
            console.log('in handleCreateCommunity: ', error);
            setError(error.message);
        }
        setLoading(false);
    }
    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        setLoadingBar(loading)
    }, [loading])

    return (
        <>
            <Modal isOpen={open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display='flex' flexDirection={'column'} fontSize={15} padding={3}>Create A Community</ModalHeader>
                    <Box
                        pl={3}
                        pr={3}
                    >
                        <Divider />
                        <ModalCloseButton />
                        <ModalBody
                            display={"flex"}
                            flexDirection={'column'}
                            padding={'10px 0px'}
                        >
                            <Text fontWeight={600} fontSize={15}>
                                Name
                            </Text>
                            <Text fontSize={11} color={'gray.500'}>
                                cannot be changed once put
                            </Text>
                            <Text position='relative' top="28px" left="10px" width="20px" color={charsRemaining !== 21 ? "purple" : "purple.200"}>r/</Text>
                            <Input position="relative" value={communityName} size={'sm'} pl={'22px'} onChange={handleChange} color={"purple"} _focusVisible={{
                                outline: "none",
                            }} />
                            <Text fontSize={11} fontWeight={charsRemaining === 0 ? 1000 : 500} color={charsRemaining === 0 ? 'purple' : 'gray.500'}>
                                {charsRemaining} Characters remaining
                            </Text>
                            <Text fontSize={12} color={'purple'} display={error === 'false' ? 'none' : 'flex'}>{error}</Text>
                            <Box mt={1} mb={2}>
                                <Text fontWeight={600} fontSize={15}>
                                    Community Type
                                </Text>
                                <Stack spacing={2}>
                                    <Checkbox name='public' isChecked={true ? communityType === 'public' : false} onChange={() => setCommunityType('public')}>
                                        <Flex align='center'>
                                            <Icon as={BsFillPersonFill} color={"gray.500"} />
                                            <Text fontSize={15} >Open</Text>
                                            <Text fontSize={10} color={"gray.500"} ml={5}>Anyone can view, join, comment</Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox name='restricted' isChecked={true ? communityType === 'restricted' : false} onChange={() => setCommunityType('restricted')}>
                                        <Flex align='center'>
                                            <Icon as={BsFillEyeFill} color={"gray.500"} />
                                            <Text fontSize={15} >Closed</Text>
                                            <Text fontSize={10} color={"gray.500"} ml={5}>Anyone can view but only approved users can submit</Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox name='private' isChecked={true ? communityType === 'private' : false} onChange={() => setCommunityType('private')}>
                                        <Flex align='center'>
                                            <Icon as={HiLockClosed} color={"gray.500"} />
                                            <Text fontSize={15} >Isolated</Text>
                                            <Text fontSize={10} color={"gray.500"} ml={5}>Only approved users can join and submit</Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>

                    </Box>
                    <ModalFooter borderRadius={"0px 0px 10px 10px"} bg="purple.100">
                        <Button colorScheme='blue' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleCreateCommunity} variant='ghost' isLoading={loading}>Create Board</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}
export default CreateCommunityModal;