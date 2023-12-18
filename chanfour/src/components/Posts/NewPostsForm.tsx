import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { GrDocumentUpdate } from "react-icons/gr";
import { BsFileEarmarkImage, BsLink45Deg } from "react-icons/bs";
type NewPostsFormProps = {

};

const formTabs = [
    {
        title: 'Post',
        icon: GrDocumentUpdate
    },
    {
        title: 'Post',
        icon: BsFileEarmarkImage
    },
    {
        title: 'Post',
        icon: BsLink45Deg
    },
]

export type TabItem = {
    title: string,
    icon: typeof Icon.arguments,
}

const NewPostsForm: React.FC<NewPostsFormProps> = () => {

    return (
        <Flex direction={'column'} bg='white' borderRadius={4} mt={2}>
            <Flex width='100%'>
                {
                    formTabs.map((item) => (
                        <>
                        </>
                    ))}
            </Flex>
        </Flex>
    )
}
export default NewPostsForm;