import CreatePostLink from '@/src/components/Community/CreatePostLink';
import NotFound from '@/src/components/Community/NotFound';
import PageContent from '@/src/components/Layout/PageContent';
import Posts from '@/src/components/Posts/Posts';
import { Community } from '@/src/components/atoms/communitiesAtom';
import { authentication, firestore } from '@/src/firebase/clientApp';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import safeJsonStringify from 'safe-json-stringify';
import Header from './Header';
type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    const [user] = useAuthState(authentication);
    var uid = "";
    if (user) uid = user.email!.split(".")[0];
    useEffect(() => {
        if (user) uid = user.email!.split(".")[0];
        else uid = "";
    }, [user])
    if (!communityData) {
        return (
            <NotFound />
        )
    }
    else return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <CreatePostLink />
                    <Posts communityData={communityData} uid={uid} />
                </>
                <>rhs</>
            </PageContent>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    //get the document
    console.log('getSS read/ writes');
    try {
        console.log(context.query.communityID as string, ' at ', Timestamp);
        const communityDocRef = doc(firestore, 'communities', context.query.communityID as string);
        const communityDoc = await getDoc(communityDocRef);
        if (!communityDoc.exists()) {
            console.log('fetched getServerSide props')
            return {
                props: {
                    communityData: null,
                }
            }
        }
        else {
            console.log('fetched getServerSide props')
            return {
                props: {
                    communityData: JSON.parse(safeJsonStringify({ communityID: communityDoc.id, ...communityDoc.data() })),
                }
            }
        }
    } catch (error: any) {
        console.log('GetServerSideProps error: ', error);
    }
}
export default CommunityPage;