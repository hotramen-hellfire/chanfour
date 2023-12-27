import { Code, Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

type StatsProps = {
    numUsers: number,
    numPosts: number,
    numBoards: number,
    numVisits: number,
    loading: boolean
};

const Stats: React.FC<StatsProps> = (props) => {

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
            boxShadow={'2xl'}
            _hover={{
                boxShadow: 'dark-lg'
            }}
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
                    STATISTICS
                </Text>
            </Flex>
            <Flex
                width={'95%'}
                height={0.25}
                border={'0.5px solid white'} />
            <Flex
                height={'60px'}
                width={'93%'}
                align={'center'}
                justify={'space-evenly'}
                display={props.loading ? 'flex' : 'none'}
            >
                <Spinner
                    color='white'
                    size={'lg'}
                />
            </Flex>
            <Flex
                height={'40px'}
                width={'93%'}
                align={'center'}
                justify={'space-evenly'}
                display={props.loading ? 'none' : 'flex'}
            >
                <Text
                    color={'white'}
                >
                    #Users: {props.numUsers}
                </Text>
                <Text
                    color={'white'}
                >
                    #Posts: {props.numPosts}
                </Text>
                <Text
                    color={'white'}
                >
                    #Boards: {props.numBoards}
                </Text>
                <Text
                    color={'white'}
                >
                    #Visits: {props.numVisits}
                </Text>
            </Flex>
        </Flex>
    )
}
export default Stats;