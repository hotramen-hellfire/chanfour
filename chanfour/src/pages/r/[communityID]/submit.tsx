import PageContent from '@/src/components/Layout/PageContent';
import PostBox from '@/src/components/Posts/PostBox';
import SubmitHeader from '@/src/components/Posts/SubmitHeader';
import React from 'react';

const SubmitPostPage: React.FC = () => {
    const communityID = window.location.pathname.split('/')[2]
    return (
        <>
            <SubmitHeader communityID={communityID} />
            <PageContent>
                <>
                    <PostBox communityID={communityID} />
                </>
                <>about</>
            </PageContent>
        </>

    )
}
export default SubmitPostPage;