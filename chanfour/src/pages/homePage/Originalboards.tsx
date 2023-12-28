import { Flex, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BoardModal from './BoardModal';
import AddIndex from './AddIndex';
type OriginalBoardsProps = {
    indexes: string,
    setIndexes: (indexes: string) => void
};

const OriginalBoards: React.FC<OriginalBoardsProps> = (props) => {
    const [selectedBoard, setSelectBoard] = useState("AnimeDiscussions");
    const [boardModal, setBoardModal] = useState(false);
    const [addIndexOpen, setAddIndexOpen] = useState(false);
    return (<>
        {props.indexes &&
            <>
                <BoardModal selectedBoard={selectedBoard} open={boardModal} setOpen={setBoardModal} />
                <AddIndex open={addIndexOpen} setOpen={setAddIndexOpen} indexes={props.indexes} setIndexes={props.setIndexes} />
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
                        maxHeight={'250px'}
                    >
                        {props.indexes.split(",").map((item: string) => {
                            return (
                                <Text
                                    key={item}
                                    color={'white'}
                                    onClick={() => { setSelectBoard(item); setBoardModal(true); }}
                                    cursor={'pointer'}
                                    _hover={{
                                        textDecoration: 'underline',
                                        color: 'yellow'
                                    }}
                                >
                                    {item}
                                </Text>
                            )
                        })}
                        <Text
                            color={'white'}
                            onClick={() => { setAddIndexOpen(true); }}
                            cursor={'pointer'}
                            _hover={{
                                textDecoration: 'underline',
                                color: 'yellow'
                            }}
                        >
                            Add an intrest of yours. . .
                        </Text>
                    </Flex>
                </Flex >
            </>
        }
    </>
    )
}
export default OriginalBoards;