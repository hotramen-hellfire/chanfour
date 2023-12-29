import { authentication, firestore } from '@/src/firebase/clientApp';
import { Alert, AlertIcon, Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalOverlay, Select, Spinner, Text } from '@chakra-ui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdArrowDropDown, MdCloseFullscreen } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { communityState } from '../../components/Atoms/communitiesAtom';
type BoardModalProps = {
    selectedBoard: string,
    open: boolean,
    setOpen: (state: boolean) => void
};

const BoardModal: React.FC<BoardModalProps> = (props) => {
    const [user] = useAuthState(authentication);
    const [communities, setCommunities] = useState<string[]>([]);
    const [selectedCommunity, setSelectedCommunity] = useState("");
    const communityStateValue = useRecoilValue(communityState)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    useEffect(() => {
        setSelectedCommunity("");
        const getBoards = async () => {
            setLoading(true);
            try {
                const docRef = doc(firestore, 'meta', 'boards')
                const document = await getDoc(docRef);
                if (!document.exists) throw Error("");
                const value = { ...document.data() }
                if (value[props.selectedBoard]) setCommunities((value[props.selectedBoard] as string).split(','));
                else setCommunities([]);
            } catch (error) {
                setError("");
            }
            setLoading(false);
        }
        getBoards();
    }, [props.selectedBoard])

    const handleAddition = async () => {
        setError("")
        if (communities.indexOf(selectedCommunity) > -1) {
            setError("Community already exists on the board!!")
            return;
        }
        setLoading(true);
        try {
            const boardName = props.selectedBoard;
            const docRef = doc(firestore, 'meta', 'boards')
            await updateDoc(docRef, { [boardName]: [...communities, selectedCommunity].join(',') })
            setCommunities([...communities, selectedCommunity]);

            const tagDocRef = doc(firestore, 'meta', 'tags')
            const tagDoc = await getDoc(tagDocRef);
            const value = { ...tagDoc.data() }
            if (value[selectedCommunity]) {
                const originalTags = (value[selectedCommunity] as string).split(',');
                await updateDoc(
                    tagDocRef,
                    {
                        [selectedCommunity]: [boardName, ...originalTags].join(',')
                    }
                )
            } else {
                await updateDoc(
                    tagDocRef,
                    {
                        [selectedCommunity]: boardName
                    }
                )
            }
        } catch (error: any) {
            setError(error);
        }
        setLoading(false)
        return;
    }
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
                        display={'flex'}
                    >
                        <Flex
                            width={'100%'}
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
                                        {props.selectedBoard}
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
                            <Spinner
                                color='white'
                                display={loading ? 'flex' : 'none'}
                            />
                            <Flex
                                width={'90%'}
                                justify={'left'}
                                flexWrap={'wrap'}
                                flexDirection={'column'}
                                maxH={'140px'}
                                display={!loading ? 'flex' : 'none'}
                            >
                                {communities.map((item) => {
                                    return (
                                        <Text
                                            onClick={() => { props.setOpen(false); router.push('/b/' + item) }}
                                            key={item}
                                            color={'white'}
                                            cursor={'pointer'}
                                            _hover={{
                                                textDecoration: 'underline',
                                                color: 'yellow'
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    )
                                })}
                            </Flex>
                            <Flex
                                mt={2}
                                width={'95%'}
                                height={0.25}
                                border={'0.5px solid white'}
                                mb={2}
                            />
                            <Text
                                color={'white'}
                                fontSize={12}
                                mb={1}
                                display={!user ? 'flex' : 'none'}
                            >
                                Login to add a board
                            </Text>
                            <Text
                                color={'white'}
                                fontSize={12}
                                mb={1}
                                display={!communityStateValue.mySnippets.length && user ? 'flex' : 'none'}
                            >
                                You can only add the boards which you are a member of. . .
                            </Text>
                            <Flex
                                width={'90%'}
                                pb={2}
                                justify={'space-around'}
                                display={user ? 'flex' : 'none'}
                            >
                                <Select
                                    icon={<MdArrowDropDown />}
                                    display={communityStateValue.mySnippets.length ? 'flex' : 'none'}
                                    placeholder='Select a board to add. . .'
                                    color={'white'}
                                    width={'65%'}
                                    backgroundColor={'transparent'}
                                    _hover={{
                                        backgroundColor: 'white',
                                        color: 'black'
                                    }}
                                    _focusVisible={{
                                        outline: "none",
                                    }}
                                    value={selectedCommunity}
                                    onChange={(e) => { setSelectedCommunity(e.target.value); setError(""); }}
                                >
                                    {communityStateValue.mySnippets.map((item) =>
                                        <option
                                            key={item.communityID}
                                            value={item.communityID}
                                        >
                                            {item.communityID}
                                        </option>)
                                    }
                                </Select>
                                <Button
                                    display={selectedCommunity ? 'flex' : 'none'}
                                    border={'2px solid white'}
                                    onClick={handleAddition}
                                    isLoading={loading}
                                >
                                    Add Board
                                </Button>
                            </Flex>
                            {error &&
                                <Alert status='error' minHeight={'10px'} border={'2px solid brown'} borderRadius={'5px'}>
                                    <AlertIcon />
                                    <Text mr={2} fontSize={12} fontWeight={600}>{error}</Text>
                                </Alert>
                            }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}
export default BoardModal;