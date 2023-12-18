import { Box } from '@chakra-ui/react';
import React from 'react';
import NewPostsForm from '../Posts/NewPostsForm';

const PostBox: React.FC = () => {

    return (
        <>
            <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                <NewPostsForm />
            </Box>
        </>
    )
}
export default PostBox;