import { Community, communityState } from '@/src/components/Atoms/communitiesAtom';
import About from '@/src/components/Community/About';
import CreatePostLink from '@/src/components/Community/CreatePostLink';
import NotFound from '@/src/components/Community/NotFound';
import PageContent from '@/src/components/Layout/PageContent';
import Posts from '@/src/components/Posts/Posts';
import { firestore } from '@/src/firebase/clientApp';
import { Flex } from '@chakra-ui/react';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';
import Header from './Header';
import { bgState } from '@/src/components/Atoms/bgAtom';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    const setCommunityStateValue = useSetRecoilState(communityState);
    const [bgLink, setBGLink] = useRecoilState(bgState)
    const [imageLink, setImageLink] = useState("https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communityDefaultIcon.jpg");
    if (!communityData) {
        return (
            <NotFound />
        )
    }

    useEffect(() => {
        setCommunityStateValue(prev => ({
            ...prev,
            currentCommunity: communityData,
        }))
        setImageLink(communityData.imageURL ? communityData.imageURL : "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communityDefaultIcon.jpg");
        setBGLink(communityData.backURL ? communityData.backURL : "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communitiesBack.jpg")
    }, [communityData])

    useEffect(() => {
    }, [])

    return (<>
        <Header communityData={communityData} imageLink={imageLink} backLink={bgLink} />
        <PageContent>
            <>
                <Flex display={{ base: 'flex', md: 'none' }}><About communityData={communityData} /></Flex>
                <CreatePostLink communityData={communityData} />
                <Posts communityData={communityData} />
            </>
            <>
                <About communityData={communityData} />
            </>
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