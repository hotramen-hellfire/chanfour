import { Community } from '@/src/components/atoms/communitiesAtom';
import { firestore } from '@/src/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    return <div>WELCOME TO {communityData.communityID}</div>
}

export async function GetServerSideProps(context: GetServerSidePropsContext) {
    //get the document
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityID as string);
        const communityDoc = await getDoc(communityDocRef);
        return {
            props: {
                communityData: communityDoc.data()
            }
        }
    } catch (error: any) {
        console.log('GetServerSideProps error: ', error);
    }
}
export default CommunityPage;