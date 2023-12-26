import { Flex, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BoardModal from './BoardModal';
import { board, boardsList } from './Originals';
type OriginalBoardsProps = {

};

const OriginalBoards: React.FC<OriginalBoardsProps> = () => {
    const [height, setHeight] = useState(200);
    const [selectedBoard, setSelectBoard] = useState("AnimeDiscussions");
    const [boardModal, setBoardModal] = useState(false);
    useEffect(() => {
        console.log();
        setHeight(boardsList.length * 10);
    })
    return (<>
        <BoardModal selectedBoard={selectedBoard} open={boardModal} setOpen={setBoardModal} />
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
                    BOARDS BY INTRESTS
                </Text>
                <Text
                    color={'white'}
                    fontSize={15}
                    fontWeight={50}
                // border={'1px solid white'}
                >
                    add your boards here, to make them accessible to those with similar intrests
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
                maxHeight={height}
            >
                {boardsList.map(({ boardName, shortDesc, route }: board) => {
                    return (
                        <Text
                            key={boardName}
                            color={'white'}
                            onClick={() => { setSelectBoard(boardName); setBoardModal(true); }}
                            cursor={'pointer'}
                            _hover={{
                                textDecoration: 'underline',
                                color: 'yellow'
                            }}
                        >
                            {boardName}
                        </Text>
                    )
                })}
            </Flex>
        </Flex >
    </>
    )
}
export default OriginalBoards;