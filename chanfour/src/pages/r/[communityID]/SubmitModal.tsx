import SubmitRedirect from '@/src/components/Community/SubmitRedirect';
import { UNameState } from '@/src/components/Atoms/UNameAtom';
import { Community, communityState } from '@/src/components/Atoms/communitiesAtom';
import { loadingState } from '@/src/components/Atoms/loadingAtom';
import { Post, PostState } from '@/src/components/Atoms/postsAtom';
import { authentication, firestore, storage } from '@/src/firebase/clientApp';
import { Button, Code, Flex, Icon, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Skeleton, Spinner, Text, Textarea } from '@chakra-ui/react';
import { Timestamp, addDoc, collection, deleteDoc, doc, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from 'recoil';
import EmbedYt from '@/src/components/Community/EmbedYt';
type CommunityAdminModalProps = {
    commmunityData: Community;
    submitModalState: boolean
    setSubmitModalState: (state: boolean) => void;
};



const CommunityAdminModal: React.FC<CommunityAdminModalProps> = ({ commmunityData, submitModalState, setSubmitModalState }) => {
    if (!commmunityData) <SubmitRedirect />;
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const [ytEmbed, setYtEmbed] = useState("");
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [fileSize, setFileSize] = useState(0);
    const [selectedFile, setSelectedFile] = useState<string>();
    const [UNameObj] = useRecoilState(UNameState);
    const [user] = useAuthState(authentication);
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState("");
    const [url, setUrl] = useState("");
    const [lastSet, setlastSet] = useState("")
    const [error, setError] = useState("");
    const [link, setLink] = useState("");
    const [embedLoad, setEmbedLoad] = useState(false);
    const onSetLink = (url: string) => {
        setLink(url);
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };
    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const reader = new FileReader();
        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
            setFileSize(event.target.files[0].size);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        }
        setLoading(false);
    };
    const selectedFileRef = useRef<HTMLInputElement>(null);
    const [textInput, setTextInput] = useState({
        title: "",
        body: ""
    });
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(prev => ({
            ...prev,
            title: event.target.value,
        }))
    };
    const onBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextInput(prev => ({
            ...prev,
            body: event.target.value,
        }))
    };
    const handleCreatePost = async () => {
        if (error) setError("");
        console.log('post write start');
        setLoading(true);
        let newPost: Post = {
            id: '#',
            communityID: commmunityData.communityID,
            creatorID: user!.email!.split('.')[0],
            embedURL: link,
            title: textInput.title,
            body: textInput.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
            creatorUName: UNameObj.UName,
            activity: 0,
            ytURL: ytEmbed,
        }
        newPost.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
        var postDocRef: any = null;
        try {
            postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            await updateDoc(postDocRef, {
                id: postDocRef.id
            })
            if (selectedFile) {
                const imageRef = ref(storage, 'posts/' + postDocRef.id + '/image');
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                    id: postDocRef.id
                })
                newPost.imageURL = downloadURL;
            }
            newPost.id = postDocRef.id;
            let updatedPosts = postStateValue.posts;
            updatedPosts = [newPost].concat(updatedPosts);
            setPostStateValue(prev => ({
                ...prev,
                posts: updatedPosts,
            }))
            const communityDocRef = doc(firestore, 'communities', commmunityData.communityID);
            await updateDoc(communityDocRef, { numberOfPosts: increment(1), activity: increment(1) })
            let updatedCommunity = {
                ...communityStateValue.currentCommunity!,
                numberOfPosts: communityStateValue.currentCommunity!.numberOfPosts + 1
            };
            setCommunityStateValue(prev => ({
                ...prev,
                currentCommunity: updatedCommunity as Community
            }));
            console.log('post write end,', communityStateValue.currentCommunity?.numberOfPosts);
            setSubmitModalState(false);
        } catch (error: any) {
            console.log('handleCreatePost error: ', error.message);
            setError(error.message);
            await deleteDoc(postDocRef);
        }
        setLoading(false);
    };
    const exitModal = () => {
        setSubmitModalState(false);
    }
    //useEffectToClearFileSizeAutomatically
    useEffect(() => {
        if (!selectedFile) {
            setFileSize(0);
            return;
        }
    }, [selectedFile])
    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        setLoadingBar(loading)
    }, [loading])
    return (
        <>
            {commmunityData && <Modal isOpen={submitModalState} onClose={() => { }} size={'xl'}>
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
                            <Code fontSize={{ base: 25, md: 30 }} colorScheme='purple'>r/{commmunityData.communityID}/submit</Code>
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
                                Post Title*
                            </Text>
                            <Input
                                name={textInput.title}
                                placeholder="Title(Required!!)"
                                _placeholder={{ color: "purple.200" }}
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
                                onChange={onTitleChange}
                                boxShadow={'xl'}
                            />
                        </Flex>

                        <Flex
                            mt={2}
                            flexDirection={'column'}
                            textAlign={'center'}
                        >
                            <Text color={'purple'} fontSize={20}>
                                Content
                            </Text>
                            <Textarea
                                name={textInput.body}
                                placeholder="Write something here (optional)"
                                _placeholder={{ color: "purple.200" }}
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
                                minHeight={'200px'}
                                onChange={onBodyChange}
                                boxShadow={'xl'}
                            />
                        </Flex>
                        <Flex width='100%' minHeight={'120px'} justify='center' align={'center'} mt={2} flexDirection={'column'}>
                            <Text color={'purple'} fontSize={20}>
                                Image
                            </Text>
                            <Flex
                                width='100%' minHeight={'120px'} justify='center' align={'center'}
                                border='1px dashed'
                                _hover={{ borderColor: 'purple', boxShadow: '2xl' }}
                                boxShadow={'xl'}
                                borderColor='purple.200'
                                borderRadius={5}
                                flexDirection={'column'}
                                padding={'16px 16px 16px 16px'}
                            >

                                <Flex maxWidth={"70%"} display={selectedFile ? 'unset' : 'none'} mb={1} mt={1}>
                                    <Text fontSize={12} color='purple'>
                                        fileSize:{fileSize / (1024 * 1024)} MB/2 MB
                                    </Text>
                                    <Text fontSize={16} color='purple' display={fileSize > 1024 * 1024 * 2 ? 'unset' : 'none'} mb={1}>
                                        Pwweasee use Links For Large Files :) (&gt; 2MB)
                                    </Text>
                                    <Image src={selectedFile} border='4px solid black' alt='only images are supported as of now' />
                                </Flex>
                                <Flex flexDirection={'row'}>
                                    <Button
                                        borderRadius={10}
                                        height={'40px'}
                                        width={'200px'}
                                        border='1px solid'
                                        borderColor={'purple.200'}
                                        variant={'outline'}
                                        bg='white'
                                        color='purple.200'
                                        _hover={{
                                            border: '1px solid purple',
                                            color: 'purple'
                                        }}
                                        isLoading={loading}
                                        justifyContent='center'
                                        onClick={() => selectedFileRef.current?.click()}
                                        mr={2}
                                    >
                                        {selectedFile ? 'CHANGE SELECTION' : 'UPLOAD IMG/ VIDEO'}
                                    </Button>
                                    <Button
                                        borderRadius={10}
                                        height={'40px'}
                                        width={'200px'}
                                        border='1px solid'
                                        borderColor={'purple.200'}
                                        variant={'outline'}
                                        bg='white'
                                        color='purple.200'
                                        _hover={{
                                            border: '1px solid purple',
                                            color: 'purple'
                                        }}
                                        isLoading={loading}
                                        justifyContent='center'
                                        display={selectedFile ? 'unset' : 'none'}
                                        onClick={() => setSelectedFile("")}
                                    >
                                        CLEAR SELECTION
                                    </Button>
                                </Flex>
                                <input
                                    type='file'
                                    hidden
                                    ref={selectedFileRef}
                                    onChange={onSelectImage}
                                />
                            </Flex>
                        </Flex >
                        <Flex width='100%' justify='center' align={'center'} flexDirection={'column'} mt={2}>
                            <Text color={'purple'} fontSize={20}>
                                Embed Image
                            </Text>
                            <Flex
                                width='100%' justify='center' align={'center'}
                                border='1px dashed'
                                _hover={{ borderColor: 'purple', boxShadow: '2xl' }}
                                boxShadow={'xl'}
                                borderColor='purple.200'
                                borderRadius={5}
                                flexDirection={'column'}
                                padding={'16px 16px 16px 16px'}
                            >
                                <Input
                                    value={url}
                                    onChange={onChange}
                                    border={'1px solid'}
                                    borderColor={'white'}
                                    placeholder="URL to be embedded"
                                    _placeholder={{ color: 'purple.200' }}
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
                                    boxShadow={'xl'}
                                    type='url'
                                />
                                <Text color="white" fontSize={20} display={error ? 'flex' : 'none'} >
                                    {error} :(
                                </Text>

                                <Flex justify={'center'} align='center' mb={1} flexDirection={'row'}>
                                    <Button
                                        borderRadius={10}
                                        height={'40px'}
                                        width={'200px'}
                                        border='1px solid'
                                        borderColor={url === source ? 'purple.200' : 'purple'}
                                        variant={'outline'}
                                        bg='white'
                                        color={url === source ? 'purple.200' : 'purple'}
                                        _hover={{
                                            border: '1px solid blue',
                                            color: 'blue'
                                        }}
                                        display={url ? 'unset' : 'none'}
                                        justifyContent='center'
                                        onClick={() => { setSource(url); setEmbedLoad(true); }}
                                        mt={2}
                                        mr={2}
                                    >
                                        Fetch and Render
                                    </Button>
                                    <Button
                                        borderRadius={10}
                                        height={'40px'}
                                        width={'200px'}
                                        border='1px solid'
                                        borderColor={lastSet === source ? 'purple.200' : 'purple'}
                                        variant={'outline'}
                                        bg='white'
                                        color={lastSet === source ? 'purple.200' : 'purple'}
                                        _hover={{
                                            border: '1px solid green',
                                            color: 'green'
                                        }}
                                        display={url ? 'unset' : 'none'}
                                        justifyContent='center'
                                        onClick={() => { if (url !== source) { setSource(url); setEmbedLoad(true); } onSetLink(url); setlastSet(url); }}
                                        mt={2}
                                    >
                                        Embed
                                    </Button>
                                </Flex>
                                <Skeleton display={embedLoad ? 'unset' : 'none'} height={'300px'} width={'80%'} mt={1} borderRadius={10} />
                                <Image minWidth={'90%'} onLoad={() => setEmbedLoad(false)} display={!loading && source && !error ? 'unset' : 'none'} mb={4} mt={4} src={source} border='2px solid black' alt='only images are supported as of now :9' />
                                <Flex justify={'center'} align='center' mb={1} flexDirection={'row'}>
                                    <Button
                                        borderRadius={10}
                                        height={'40px'}
                                        width={'200px'}
                                        border='1px solid'
                                        borderColor={'purple'}
                                        variant={'outline'}
                                        bg='white'
                                        color='purple'
                                        _hover={{
                                            border: '1px solid red',
                                            color: 'red',
                                        }}
                                        display={lastSet ? 'unset' : 'none'}
                                        justifyContent='center'
                                        onClick={() => { setSource(""); onSetLink(""); setlastSet("") }}
                                        mt={2}
                                    >
                                        Remove Embedding
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex >
                        <Text fontSize={11} color={'gray.500'} mt={2}>
                            (smaller image sizes make loading faster)<br />
                            compress at: www.img2go.com/compress-image<br />
                        </Text>
                        <EmbedYt setYtEmbed={setYtEmbed} />
                    </ModalBody>
                    <ModalFooter>
                        <Spinner ml={1}
                            mr={1} display={loading ? 'unset' : 'none'} />
                        <Code
                            ml={1}
                            mr={1}
                            fontSize={20}
                            cursor={'pointer'}
                            _hover={{ fontSize: 30 }}
                            colorScheme='green'
                            display={(textInput.title) && (fileSize < 1024 * 1024 * 2) && (!loading) && !embedLoad ? 'unset' : 'none'}
                            justifyContent='center'
                            onClick={handleCreatePost}
                        >
                            POST
                        </Code>
                        <Code
                            ml={1}
                            mr={1}
                            fontSize={20}
                            cursor={'pointer'}
                            onClick={exitModal}
                            _hover={{ fontSize: 30 }}
                            colorScheme={'red'}>
                            CLOSE
                        </Code>
                    </ModalFooter>
                </ModalContent>
            </Modal >}
        </>
    )
}
export default CommunityAdminModal;