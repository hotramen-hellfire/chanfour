import { Box } from '@chakra-ui/react';
import React from 'react';
import NewPostsForm from './NewPostsForm';
type PostBoxProps = {
    communityID: string;
};
const PostBox: React.FC<PostBoxProps> = ({ communityID }) => {

    return (
        <>
            <Box p="0px 0px">
                <NewPostsForm communityID={communityID} />
            </Box>
        </>
    )
}
export default PostBox;