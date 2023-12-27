import { Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type AllBoardsProps = {
    communitiesString: string
};

const AllBoards: React.FC<AllBoardsProps> = (props) => {

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
                    ALL COMMUNITIES
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
                {(props.communitiesString.split(',') as string[]).map(item => {
                    return (<Text
                        key={item}
                        color={'white'}
                        onClick={() => { }}
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