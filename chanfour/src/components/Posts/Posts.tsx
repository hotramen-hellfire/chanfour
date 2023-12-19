import React from 'react';
import { Community } from '../atoms/communitiesAtom';

type PostsProps = {
    communityData: Community;
    uid?: string;//creatorID
};

const Posts: React.FC<PostsProps> = () => {

    return (
        <>
            communityData
        </>
    )
}
export default Posts;