import PageContent from '@/src/components/Layout/PageContent';
import NewPostsForm from '@/src/components/Posts/NewPostsForm';
import SubmitHeader from '@/src/components/Posts/SubmitHeader';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication } from '@/src/firebase/clientApp';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/components/atoms/authModalAtom';
const SubmitPostPage: React.FC = () => {
    var communityID = "loading. . .";
    const { asPath } = useRouter();
    if (asPath) communityID = asPath.split('/')[2];
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