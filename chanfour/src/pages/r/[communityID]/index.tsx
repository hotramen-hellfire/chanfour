import NotFound from '@/src/components/Community/NotFound';
import { Community } from '@/src/components/atoms/communitiesAtom';
import { firestore } from '@/src/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import Header from './Header';
import PageContent from '@/src/components/Layout/PageContent';
import CreatePostLink from '@/src/components/Community/CreatePostLink';
type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
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
                </>
                <>rhs</>
            </PageContent>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    //get the document
    console.log('here');
    try {
        console.log(context.query.communityID as string);
        const communityDocRef = doc(firestore, 'communities', context.query.communityID as string);
        const communityDoc = await getDoc(communityDocRef);
        if (!communityDoc.exists()) {
            return {
                props: {
                    communityData: null,
                }
            }
        }
        else return {
            props: {
                communityData: JSON.parse(safeJsonStringify({ communityID: communityDoc.id, ...communityDoc.data() })),
            }
        }
    } catch (error: any) {
        console.log('GetServerSideProps error: ', error);
    }
}
export default CommunityPage;