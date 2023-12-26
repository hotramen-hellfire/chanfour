import { Code, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type StatsProps = {

};

const Stats: React.FC<StatsProps> = () => {

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
                    STATISTICS
                </Text>
            </Flex>
            <Flex
                width={'95%'}
                height={0.25}
                border={'0.5px solid white'} />
            <Flex
                height={'40px'}
                width={'93%'}
                align={'center'}
                justify={'space-evenly'}
            >
                <Text
                    color={'white'}
                >
                    #Users: 121
                </Text>
                <Text
                    color={'white'}
                >
                    #Posts: 121
                </Text>
                <Text
                    color={'white'}
                >
                    #Boards: 121
                </Text>
                <Text
                    color={'white'}
                >
                    #Visits: 121
                </Text>
            </Flex>
        </Flex>
    )
}
export default Stats;