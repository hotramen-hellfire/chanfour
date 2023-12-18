import PageContent from '@/src/components/Layout/PageContent';
import NewPostsForm from '@/src/components/Posts/NewPostsForm';
import SubmitHeader from '@/src/components/Posts/SubmitHeader';
import React from 'react';

const SubmitPostPage: React.FC = () => {
    const communityID = window.location.pathname.split('/')[2]
    return (
        <>
            <SubmitHeader communityID={communityID} />
            <PageContent>
                <>
                    <NewPostsForm communityID={communityID} />
                </>
                <>about</>
            </PageContent>
        </>

    )
}
export default SubmitPostPage;