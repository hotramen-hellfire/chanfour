import SubmitRedirect from '@/src/components/Community/SubmitRedirect';
import PageContent from '@/src/components/Layout/PageContent';
import NewPostsForm from '@/src/components/Posts/NewPostsForm';
import SubmitHeader from '@/src/components/Posts/SubmitHeader';
import { authModalState } from '@/src/components/atoms/authModalAtom';
import { communityState } from '@/src/components/atoms/communitiesAtom';
import { authentication } from '@/src/firebase/clientApp';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
const SubmitPostPage: React.FC = () => {
    const communityStateValue = useRecoilValue(communityState);
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
            {/* //temporary sol */}
            <SubmitHeader communityID={communityID} />
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