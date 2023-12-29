import { Flex, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

type AllBoardsProps = {
    communitiesString: string
};

const AllBoards: React.FC<AllBoardsProps> = (props) => {
    const router = useRouter();
    return (
        <Flex
            width={'90%'}
            // height={'100px'}
            flexDirection={'column'}
            borderRadius={10}
            justify={'center'}
            align={'center'}
            border={'1px solid purple'}
            backdropFilter={'blur(100px)'}
            boxShadow={'2xl'}
            _hover={{
                boxShadow: 'dark-lg'
            }}
        >
            <Stack
                width={'100%'}
                align={'center'}
                flexDirection={'column'}
                spacing={'1px'}
                mb={1}
            >
                <Text
                    color={'white'}
                    fontSize={30}
                    fontWeight={50}
                // border={'1px solid white'}
                >
                    ALL BOARDS
                </Text>
                <Text
                    color={'white'}
                    fontSize={15}
                    fontWeight={50}
                // border={'1px solid white'}
                >
                    lexicographical
                </Text>
            </Stack>
            <Flex
                width={'95%'}
                height={0.25}
                border={'0.5px solid white'} />
            <Flex
                // height={'40px'}
                width={'93%'}
                flexWrap={'wrap'}
                align={'center'}
                flexDirection={'column'}
                maxHeight={'500px'}
            >
                {props.communitiesString && (props.communitiesString.split(',') as string[]).map(item => {
                    return (<Text
                        key={item}
                        color={'white'}
                        onClick={() => { router.push("/b/" + item) }}
                        cursor={'pointer'}
                        _hover={{
                            textDecoration: 'underline',
                            color: 'yellow'
                        }}
                    >
                        {item}
                    </Text>)
                })}
            </Flex>
        </Flex >
    )
}
export default AllBoards;