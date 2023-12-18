import { Flex, Icon, Input, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrDocumentUpdate } from "react-icons/gr";
import { BsFileEarmarkImage, BsLink45Deg } from "react-icons/bs";
import CreatePostType from './CreatePostType';
type NewPostsFormProps = {
    communityID: string;
};

export type TabItem = {
    title: string,
    icon: typeof Icon.arguments,
}

const NewPostsForm: React.FC<NewPostsFormProps> = ({ communityID }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const tabcolor = 'pink.200';
    const hovertabcolor = 'purple.100';
    const [selectedTab, setSelectedTab] = useState('post');//post, media or link
    const [textInput, setTextInput] = useState({
        title: "",
        body: ""
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const [loading, setLoading] = useState(false);
    const handleCreatePost = async () => { };
    const onSelectImage = () => { };

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
    return (
        <Flex direction={'column'} borderRadius={4} >
            <Flex width='100%'>
                <Tabs isFitted variant='enclosed' width={'100%'} >
                    <TabList>
                        <Tab
                            color='purple'
                            bg='white'
                            border={'1px solid purple'}
                            _selected={{ color: 'white', bg: tabcolor, borderBottomColor: tabcolor }}
                            _hover={{ color: 'purple', bg: hovertabcolor }}
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
                            color='purple'
                            bg='white'
                            border={'1px solid purple'}
                            _selected={{ color: 'white', bg: tabcolor, borderBottomColor: tabcolor }}
                            _hover={{ color: 'purple', bg: hovertabcolor }}
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
                            color='purple'
                            bg='white'
                            border={'1px solid purple'}
                            _selected={{ color: 'white', bg: tabcolor, borderBottomColor: tabcolor }}
                            _hover={{ color: 'purple', bg: hovertabcolor }}
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
                            <CreatePostType textInputs={textInput} onTitleChange={onTitleChange} onBodyChange={onBodyChange} handleCreatePost={handleCreatePost} loading={loading} />
                        </TabPanel>
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', purple.50)'} padding={'10px 5px 5px 5px'} bg={'purple.50'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel bgGradient={'linear(to-b,' + tabcolor + ', purple.50)'} padding={'10px 5px 5px 5px'} bg={'purple.50'} border={'1px solid purple'} borderBottomRadius={'5px'}>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex >
        </Flex >
    )
}
export default NewPostsForm;