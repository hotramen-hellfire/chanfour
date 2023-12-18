import { Flex, Icon, Input, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GrDocumentUpdate } from "react-icons/gr";
import { BsFileEarmarkImage, BsLink45Deg } from "react-icons/bs";
import CreatePostType from './CreatePostType';
import CreateMediaType from './CreateMediaType';
import CreateLinkType from './CreateLinkType';
type NewPostsFormProps = {
    communityID: string;
};

export type TabItem = {
    title: string,
    icon: typeof Icon.arguments,
}

const NewPostsForm: React.FC<NewPostsFormProps> = ({ communityID }) => {
    const tabcolor = 'pink.200';
    const hovertabcolor = 'purple.100';
    const [fileSize, setFileSize] = useState(0);
    const [selectedTab, setSelectedTab] = useState('post');//post, media or link
    const [textInput, setTextInput] = useState({
        title: "",
        body: ""
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const [loading, setLoading] = useState(false);
    const handleCreatePost = async () => { };
    const [link, setLink] = useState("");
    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                            onClick={
                                () => { setSelectedTab('post') }
                            }
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
                            onClick={
                                () => { setSelectedTab('media') }
                            }
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
                            onClick={
                                () => { setSelectedTab('link') }
                            }
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
                            <CreatePostType textInputs={textInput} onTitleChange={onTitleChange} onBodyChange={onBodyChange} handleCreatePost={handleCreatePost} loading={loading} fileSize={fileSize} />
                        </TabPanel>
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', purple.50)'} padding={'10px 5px 5px 5px'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <CreateMediaType selectedFile={selectedFile} onSelectImage={onSelectImage} setSelectedFile={setSelectedFile} fileSize={fileSize} />
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