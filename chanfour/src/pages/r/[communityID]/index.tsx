import CreatePostLink from '@/src/components/Community/CreatePostLink';
import NotFound from '@/src/components/Community/NotFound';
import PageContent from '@/src/components/Layout/PageContent';
import Posts from '@/src/components/Posts/Posts';
import { Community, communityState } from '@/src/components/atoms/communitiesAtom';
import { firestore } from '@/src/firebase/clientApp';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';
import Header from './Header';
import About from '@/src/components/Community/About';
import { Image } from '@chakra-ui/react';
import { communityImageState } from '@/src/components/atoms/communityImageAtom';
type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    const setCommunityStateValue = useSetRecoilState(communityState);
    const setCommunityImageStateValue = useSetRecoilState(communityImageState);
    const [imageLink, setImageLink] = useState("https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communityDefaultIcon.jpg");
    const [backLink, setBackLink] = useState('https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communitiesBack.jpg');
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
    }, [])

    useEffect(() => {
        if (communityData.imageURL) {
            setImageLink(communityData.imageURL);
            setCommunityImageStateValue((prev) => ({ ...prev, icon: communityData.imageURL }));
        }
        if (communityData.backURL) {
            setBackLink(communityData.backURL);
            setCommunityImageStateValue((prev) => ({ ...prev, backImg: communityData.backURL }));
        }
    }, [])

    return (<>
        {communityData.backURL && <style jsx global>
            {`body {background-image: url(${backLink}); background-attachment:fixed; background-size:cover; background-repeat: no-repeat;background-position: center center}`}
        </style>}
        <Header communityData={communityData} imageLink={imageLink} backLink={backLink} />
        <PageContent>
            <>
                <CreatePostLink />
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