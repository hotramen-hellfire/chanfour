import { Flex, Icon, Input, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GrDocumentUpdate } from "react-icons/gr";
import { BsFileEarmarkImage, BsLink45Deg } from "react-icons/bs";
import CreatePostType from './CreatePostType';
import CreateMediaType from './CreateMediaType';
import CreateLinkType from './CreateLinkType';
import { Post } from '../atoms/postsAtom';
import { User } from 'firebase/auth';
import { UNameState } from '../atoms/UNameAtom';
import { useRecoilState } from 'recoil';
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '@/src/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
type NewPostsFormProps = {
    communityID: string;
    user: User | null;
};

export type TabItem = {
    title: string,
    icon: typeof Icon.arguments,
}

const NewPostsForm: React.FC<NewPostsFormProps> = ({ communityID, user }) => {
    const [UNameObj] = useRecoilState(UNameState);
    const tabcolor = 'pink.200';
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
        setLoading(true);
        //create new post object
        //store in db
        //check img
        //store in firebase storage
        //redirect user back to community page
        const newPost: Post = {
            id: '#',
            communityID: communityID,
            creatorID: user!.email!.split('.')[0],
            // creatorDisplayName: UNameObj.UName
            title: textInput.title,
            body: textInput.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp
        }

        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            if (selectedFile) {
                const imageRef = ref(storage, 'posts/' + postDocRef.id + '/image');
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                    id: postDocRef.id
                })
            }
        } catch (error: any) {
            console.log('handleCreatePost error: ', error.message);
            setError(error.message);
        }
        setLoading(false);

        // router.back();
    };
    //useEffectToClearFileSizeAutomatically
    useEffect(() => {
        if (!selectedFile) {
            setFileSize(0);
            return;
        }
    }, [selectedFile])
    return (
        <Flex direction={'column'} borderRadius={4} >
            <Flex width='100%'>
                <Tabs isFitted variant='enclosed' width={'100%'} >
                    <TabList>
                        <Tab
                            color={textInput.title ? 'green' : 'purple'}
                            bg='white'
                            border={'1px solid purple'}
                            _selected={{ color: 'white', bg: tabcolor, borderBottomColor: tabcolor }}
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
                            _selected={{ color: 'white', bg: tabcolor, borderBottomColor: tabcolor }}
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
                            _selected={{ color: 'white', bg: tabcolor, borderBottomColor: tabcolor }}
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
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', purple.50)'} padding={'10px 5px 5px 5px'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <CreatePostType textInput={textInput} onTitleChange={onTitleChange} onBodyChange={onBodyChange} handleCreatePost={handleCreatePost} loading={loading} fileSize={fileSize} error={error} />
                        </TabPanel>
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', purple.50)'} padding={'10px 5px 5px 5px'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <CreateMediaType selectedFile={selectedFile} onSelectImage={onSelectImage} setSelectedFile={setSelectedFile} fileSize={fileSize} loading={loading} />
                        </TabPanel>
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', purple.50)'} padding={'10px 5px 5px 5px'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <CreateLinkType onSet={onSetLink} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex >
        </Flex >
    )
}
export default NewPostsForm;