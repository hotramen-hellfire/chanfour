import { authentication, firestore } from '@/src/firebase/clientApp';
import { Modal, ModalOverlay, ModalContent, ModalBody, Flex, Icon, Button, Text, Input } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdCloseFullscreen } from 'react-icons/md';

type AddIndexProps = {
    open: boolean,
    setOpen: (value: boolean) => void,
    indexes: string,
    setIndexes: (indexes: string) => void
};

const AddIndex: React.FC<AddIndexProps> = (props) => {
    const [user] = useAuthState(authentication);
    const maxlen = 15;
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    const [charsRemaining, setCharsRemaining] = useState(maxlen);
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const handleAddition = async () => {
        var indexes = props.indexes.split(",");
        setLoading(true);
        setError("")
        if (indexes.indexOf(name) > -1) {
            setError("Index already exists!!")
        } else {
            try {
                indexes = [name, ...indexes];
                indexes.sort((a, b) => a.localeCompare(b));
                const docRef = doc(firestore, 'meta', 'metadata');
                await updateDoc(docRef, {
                    indexes: indexes.join(",") as string
                })
                setCharsRemaining(maxlen);
                setName("")
                props.setIndexes(indexes.join(","));
                props.setOpen(false)
            } catch (error: any) {
                setError(error.message);
                console.log("handleIndexAddition error: ", error.message);
            }
            setLoading(false);
        }
        setLoading(false);
    }
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > maxlen) {
            event.target.value = event.target.value.substring(0, maxlen);
            return;
        }
        setCharsRemaining(17 - event.target.value.length)
        if (format.test(event.target.value)) {
            event.target.value = event.target.value.substring(0, event.target.value.length - 1);
            setError("cannot contain /[ `!@#$%^&*()+\-=\[\]{};':\"\\|,.<>\/?~]/</>");
            return;
        }
        setName(event.target.value)
        setError('');
    }

    const onClose = () => {
        setError("");
        setName("");
        setCharsRemaining(maxlen);
        props.setOpen(false);
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
                                        ADD NEW INTREST
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
                                        onClick={onClose}
                                    />
                                </Flex>

                            </Flex>
                            <Flex
                                width={'95%'}
                                height={0.25}
                                border={'0.5px solid white'}
                                mb={2}
                            />
                            <Input
                                _focusVisible={{
                                    outline: "none",
                                }}
                                required
                                textAlign={"center"}
                                name={name}
                                placeholder='type here'
                                type='text'
                                onChange={onNameChange}
                                fontSize={"10pt"}
                                color={'white'}
                                backgroundColor={'transparent'}
                                _hover={{
                                    backgroundColor: 'white',
                                    color: 'black'
                                }}
                                _focus={{
                                    backgroundColor: 'white',
                                    color: 'black'
                                }}
                                width={'60%'}
                            />
                            <Text fontSize={11} fontWeight={charsRemaining === 0 ? 1000 : 500} color={charsRemaining === 0 ? 'purple' : 'white'}>
                                {charsRemaining} Characters remaining
                            </Text>
                            <Flex
                                mt={2}
                                width={'95%'}
                                height={0.25}
                                border={'0.5px solid white'}
                                mb={2}
                            />
                            {error && <Text
                                color={'white'}
                                fontSize={12}
                                mb={1}
                            >
                                {error}
                            </Text>}

                            <Flex
                                width={'90%'}
                                pb={2}
                                justify={'space-around'}
                                align={'center'}
                                flexDirection={'column'}
                            >
                                <Button
                                    border={'2px solid white'}
                                    onClick={handleAddition}
                                    isLoading={loading}
                                    display={user && name ? 'flex' : 'none'}
                                >
                                    ADD INTREST
                                </Button>
                                <Text
                                    color={'white'}
                                    fontSize={12}
                                    display={!user ? 'flex' : 'none'}
                                >
                                    You need to be logged in to add an intrest. . .
                                </Text>
                            </Flex>
                            {/* {error &&
                                <Alert status='error' minHeight={'10px'} border={'2px solid brown'} borderRadius={'5px'}>
                                    <AlertIcon />
                                    <Text mr={2} fontSize={12} fontWeight={600}>{error}</Text>
                                </Alert>
                            } */}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}
export default AddIndex;