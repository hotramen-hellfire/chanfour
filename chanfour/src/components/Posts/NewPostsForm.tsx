import { firestore, storage } from '@/src/firebase/clientApp';
import { Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { Timestamp, addDoc, collection, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsFileEarmarkImage, BsLink45Deg } from "react-icons/bs";
import { GrDocumentUpdate } from "react-icons/gr";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loadingState } from '../Atoms/loadingAtom';
import { Post } from '../Atoms/postsAtom';
import CreateLinkType from './CreateLinkType';
import CreateMediaType from './CreateMediaType';
import CreatePostType from './CreatePostType';
import { UNameState } from '../Atoms/UNameAtom';
type NewPostsFormProps = {
    communityID: string;
    user: User | null;
};

export type TabItem = {
    title: string,
    icon: typeof Icon.arguments,
}

const NewPostsForm: React.FC<NewPostsFormProps> = ({ communityID, user }) => {
    const tabcolor = 'purple';
    const [UNameObj] = useRecoilState(UNameState);
    const selectedFontColor = 'white';
    const gradEnd = 'purple.100';
    const hovertabcolor = 'purple.100';
    const [fileSize, setFileSize] = useState(0);
    const [error, setError] = useState("");
    const [textInput, setTextInput] = useState({
        title: "",
        body: ""
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState("");
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
    const onSetLink = (url: string) => {
        setLink(url);
    }
    const handleCreatePost = async () => {
        if (error) setError("");
        console.log('post write start');
        setLoading(true);
        const newPost: Post = {
            id: '#',
            communityID: communityID,
            creatorID: user!.email!.split('.')[0],
            embedURL: link,
            title: textInput.title,
            body: textInput.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
            creatorUName: UNameObj.UName
        }
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
            }
            router.back();
        } catch (error: any) {
            console.log('handleCreatePost error: ', error.message);
            setError(error.message);
            await deleteDoc(postDocRef);
        }
        setLoading(false);
        console.log('post write end');
    };
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
        <Flex direction={'column'} borderRadius={4} >
            <Flex width='100%'>
                <Tabs isFitted variant='enclosed' width={'100%'} >
                    <TabList>
                        <Tab
                            color={textInput.title ? 'green' : 'purple'}
                            bg='white'
                            border={'1px solid purple'}
                            _selected={{ color: selectedFontColor, bg: tabcolor, borderBottomColor: tabcolor }}
                            _hover={{ bg: hovertabcolor }}
                        >
                            <Icon
                                as={GrDocumentUpdate}
                                mr={2}
                            />
                            Post
                        </Tab>
                        <Tab
                            color={fileSize > 0 && fileSize < 5 * 1024 * 1024 ? 'green' : 'purple'}
                            bg='white'
                            border={'1px solid purple'}
                            _selected={{ color: selectedFontColor, bg: tabcolor, borderBottomColor: tabcolor }}
                            _hover={{ bg: hovertabcolor }}
                        >
                            <Icon
                                as={BsFileEarmarkImage}
                                mr={2}
                            />
                            Image/ Video
                        </Tab>
                        <Tab
                            color={link ? 'green' : 'purple'}
                            bg='white'
                            border={'1px solid purple'}
                            _selected={{ color: selectedFontColor, bg: tabcolor, borderBottomColor: tabcolor }}
                            _hover={{ bg: hovertabcolor }}
                        >
                            <Icon
                                as={BsLink45Deg}
                                mr={2}
                            />
                            Link
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', ' + gradEnd + ')'} padding={'10px 5px 5px 5px'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <CreatePostType textInput={textInput} onTitleChange={onTitleChange} onBodyChange={onBodyChange} handleCreatePost={handleCreatePost} loading={loading} fileSize={fileSize} error={error} />
                        </TabPanel>
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', ' + gradEnd + ')'} padding={'10px 5px 5px 5px'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <CreateMediaType selectedFile={selectedFile} onSelectImage={onSelectImage} setSelectedFile={setSelectedFile} fileSize={fileSize} loading={loading} />
                        </TabPanel>
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', ' + gradEnd + ')'} padding={'10px 5px 5px 5px'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <CreateLinkType onSet={onSetLink} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex >
        </Flex >
    )
}
export default NewPostsForm;