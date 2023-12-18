import PageContent from '@/src/components/Layout/PageContent';
import NewPostsForm from '@/src/components/Posts/NewPostsForm';
import SubmitHeader from '@/src/components/Posts/SubmitHeader';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const SubmitPostPage: React.FC = () => {
    var communityID = "loading. . .";
    const { asPath } = useRouter();
    if (asPath) communityID = asPath.split('/')[2];
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