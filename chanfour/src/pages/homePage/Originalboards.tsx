import { Code, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { boardsList, board } from './Originals';
import router from 'next/router';
type OrirginalBoardsProps = {

};

const OrirginalBoards: React.FC<OrirginalBoardsProps> = () => {
    const [height, setHeight] = useState(200)
    useEffect(() => {
        console.log();
        setHeight(boardsList.length * 10);
    })
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
                    ORIGINAL BOARDS
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
                align={'center'}
                flexDirection={'column'}
                maxHeight={height}
            >
                {boardsList.map(({ boardName, shortDesc, route }: board) => {
                    return (
                        <Text
                            key={boardName}
                            color={'white'}
                            onClick={() => router.push(route)}
                            cursor={'pointer'}
                            _hover={{
                                textDecoration: 'underline',
                                color: 'orange'
                            }}
                        >
                            {boardName}
                        </Text>
                    )
                })}
            </Flex>
        </Flex>
    )
}
export default OrirginalBoards;