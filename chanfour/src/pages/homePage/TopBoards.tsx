import { Community } from '@/src/components/Atoms/communitiesAtom';
import { firestore } from '@/src/firebase/clientApp';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
type OrirginalBoardsProps = {

};

const OrirginalBoards: React.FC<OrirginalBoardsProps> = () => {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getBoardRecommendations = async () => {
            setLoading(true);
            try {
                const communityQuery = query(collection(firestore, 'communities'), orderBy('activity', "desc"), limit(20));
                const communityDocs = await getDocs(communityQuery);
                const communities = communityDocs.docs.map((doc) => ({
                    ...doc.data(),
                }));
                setCommunities(communities as Community[])
            } catch (error: any) {
                console.log("getBoardRecommnedations error: ", error)
            }
            setLoading(false);
        }
        getBoardRecommendations();
    }, [])
    return (
        <Flex
            width={'90%'}
            // height={'100px'}
            flexDirection={'column'}
            backdropFilter={'blur(100px)'}
            borderRadius={10}
            justify={'center'}
            align={'center'}
            border={'1px solid purple'}
        >
            <Flex
                height={'40px'}
                width={'100%'}
                // border={'1px solid white'}
                justify={'center'}
                align={'center'}
            >
                <Text
                    color={'white'}
                    fontSize={30}
                    fontWeight={50}
                >
                    TOP BOARDS
                </Text>
            </Flex>
            <Flex
                width={'95%'}
                height={0.25}
                border={'0.5px solid white'} />
            <Flex
                // height={'40px'}
                width={'93%'}
                flexWrap={'wrap'}
                justify={'center'}
                align={'center'}
                height={'50px'}
                flexDirection={'column'}
                maxHeight={'250px'}
                display={loading ? 'flex' : 'none'}
            >
                <Spinner
                    size={'lg'}
                    color='white'
                />
            </Flex>
            <Flex
                // height={'40px'}
                width={'93%'}
                flexWrap={'wrap'}
                align={'center'}
                flexDirection={'column'}
                minHeight={'50px'}
                maxHeight={'250px'}
                display={loading ? 'none' : 'flex'}
            >
                {communities.map(({ communityID }: Community) => {
                    return (
                        <Text
                            color={'white'}
                            onClick={() => router.push('/r/' + communityID)}
                            cursor={'pointer'}
                            _hover={{
                                textDecoration: 'underline',
                                color: 'orange'
                            }}
                        >
                            {communityID}
                        </Text>
                    )
                })}
            </Flex>
        </Flex >
    )
}
export default OrirginalBoards;