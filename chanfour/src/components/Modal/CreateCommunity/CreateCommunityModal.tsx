import { authentication, firestore } from '@/src/firebase/clientApp';
import { Box, Button, Checkbox, Divider, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { doc, getDoc, runTransaction, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CommunitySnippet, communityState } from '../../Atoms/communitiesAtom';
import { loadingState } from '../../Atoms/loadingAtom';
type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const nameLength = 15;
    const router = useRouter();
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [user] = useAuthState(authentication);
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(nameLength);
    const [communityType, setCommunityType] = useState("public");
    const [error, setError] = useState('false');
    const [loading, setLoading] = useState(false);
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    var uid: string = user!.email!;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > nameLength) return;
        setCommunityName(event.target.value);
        setCharsRemaining(nameLength - event.target.value.length)
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
                    creatorID: user!.email!,
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType,
                    numberOfPosts: 0,
                    activity: 0,
                    description: "",
                    imageURL: "",
                    backURL: "",
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

            const newSnippet: CommunitySnippet = {
                communityID: communityName,
                isModerator: true,
                imageURL: ""
            }
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [newSnippet, ...communityStateValue.mySnippets]
            }))

            const docRef = doc(firestore, 'meta', 'metadata')
            const document = await getDoc(docRef);
            const value = { ...document.data() }
            if (value["communities"]) {
                var items: string[] = (value["communities"] as string).split(",")
                items = [communityName, ...items]
                items.sort((a, b) => a.localeCompare(b))
                await updateDoc(docRef, { communities: (items as string[]).join(",") });
            }
            else {
                await updateDoc(docRef, { communities: communityName as string });
            }

            router.push("/b/" + communityName);
            handleClose();
            setCommunityName("");
            setCharsRemaining(nameLength);
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
                    <ModalHeader display='flex' flexDirection={'column'} fontSize={15} padding={3}>Create A Board</ModalHeader>
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
                            <Text position='relative' top="28px" left="5px" width="20px" color={charsRemaining !== nameLength ? "purple" : "purple.200"}>b/</Text>
                            <Input position="relative" value={communityName} size={'sm'} pl={'22px'} onChange={handleChange} color={"purple"} _focusVisible={{
                                outline: "none",
                            }} />
                            <Text fontSize={11} fontWeight={charsRemaining === 0 ? 1000 : 500} color={charsRemaining === 0 ? 'purple' : 'gray.500'}>
                                {charsRemaining} Characters remaining
                            </Text>
                            <Text fontSize={12} color={'purple'} display={error === 'false' ? 'none' : 'flex'}>{error}</Text>
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