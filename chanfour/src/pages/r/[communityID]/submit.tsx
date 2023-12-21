import SubmitRedirect from '@/src/components/Community/SubmitRedirect';
import PageContent from '@/src/components/Layout/PageContent';
import NewPostsForm from '@/src/components/Posts/NewPostsForm';
import SubmitHeader from '@/src/components/Posts/SubmitHeader';
import { authModalState } from '@/src/components/atoms/authModalAtom';
import { communityState } from '@/src/components/atoms/communitiesAtom';
import { communityImageState } from '@/src/components/atoms/communityImageAtom';
import { authentication } from '@/src/firebase/clientApp';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
const SubmitPostPage: React.FC = () => {
    const communityStateValue = useRecoilValue(communityState);
    const communityImageValue = useRecoilValue(communityImageState);
    if (!communityStateValue.currentCommunity) return <SubmitRedirect />;
    const communityID = communityStateValue.currentCommunity?.communityID;
    const [user] = useAuthState(authentication);
    const setAuthModalState = useSetRecoilState(authModalState);
    useEffect(() => {
        if (!user) {
            setAuthModalState({ open: true, view: 'login' });
            return;
        }
    }, [user])
    return (
        <>
            <style jsx global>
                {`body {background-image: url(${communityImageValue.backImg}); background-attachment:fixed; background-size:cover; background-repeat: no-repeat;background-position: center center}`}
            </style>
            {/* //temporary sol */}
            <SubmitHeader communityID={communityID} imageLink={communityImageValue.icon} backLink={communityImageValue.backImg} />
            <PageContent>
                <>
                    <NewPostsForm communityID={communityID} user={user ? user : null} />
                </>
                <>about</>
            </PageContent>
        </>

    )
}
export default SubmitPostPage;