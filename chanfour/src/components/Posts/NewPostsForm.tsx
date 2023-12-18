import { Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
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
    const tabcolor = 'purple';
    const hovertabcolor = 'purple.100';
    return (
        <Flex direction={'column'} borderRadius={4} >
            <Flex width='100%'>
                <Tabs isFitted variant='enclosed' width={'100%'} >
                    <TabList>
                        <Tab
                            color='purple'
                            bg='white'
                            border={'1px solid purple'}
                            _selected={{ color: 'white', bg: tabcolor }}
                            _hover={{ color: 'purple', bg: hovertabcolor }}
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
                            _selected={{ color: 'white', bg: tabcolor }}
                            _hover={{ color: 'purple', bg: hovertabcolor }}
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
                            _selected={{ color: 'white', bg: tabcolor }}
                            _hover={{ color: 'purple', bg: hovertabcolor }}
                        >
                            <Icon
                                as={BsLink45Deg}
                                mr={2}
                            />
                            Link
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel padding={'0px 0px 0px 0px'}>
                            <CreatePostType />
                        </TabPanel>
                        <TabPanel padding={'0px 0px 0px 0px'}>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel padding={'0px 0px 0px 0px'}>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex >
    )
}
export default NewPostsForm;