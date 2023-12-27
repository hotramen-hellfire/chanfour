import { Box, Flex, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

const PostSkeleton: React.FC = () => {

    return (
        <>
            {/* //parent of postitem */}
            <Flex border='2px solid purple'
                mt={2}
                padding='4px 4px 4px 4px'
                bg='white'
                borderRadius={10}
                flexDirection={'column'}
                boxShadow={'dark-lg'}
            >
                {/* this is the postobject */}
                <Flex
                    width={'100%'}
                    flexDir={'column'}
                >
                    {/* this is title box */}
                    <Flex width={'100%'} mb={1}>
                        <Box borderRadius={5} height='35px' bg='white' width={"100%"} justifyContent={'center'} alignItems={'center'} justifyItems={'center'} alignContent={'center'}>

                            <Stack>
                                <Skeleton height='20px' borderRadius={5} width={"100%"} />
                                <Skeleton height='10px' borderRadius={5} width={"100%"} />
                            </Stack>
                        </Box >
                    </Flex >
                    <Flex
                        mt={2}
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                    />
                    {/* <Divider orientation='horizontal' bg='black' /> */}
                    {/* content box */}
                    <Flex
                        borderRadius={5}
                        bg='white'
                        border={'2px solid'}
                        borderColor={'white'}
                        flexDirection={'column'}
                        justify={'center'}
                        padding='2px 2px 2px 2px'
                        align={'center'}
                    >

                        <Skeleton width={'90%'} mb={2} borderRadius={5}>
                            <Flex
                                width={'100%'}
                                height={'100px'}
                            >
                            </Flex>
                        </Skeleton>
                        <Skeleton width={'100%'}>
                            <Flex
                                width={'100%'}
                                height={'250px'}
                            >
                            </Flex>
                        </Skeleton>
                    </Flex>
                    <Flex
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                        mt={1}
                    />
                    <Flex
                        mt={1}
                        width={'100%'}
                        height={'40px'}
                        flexDirection={'row'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Skeleton width={'185px'} height={'35px'} />

                    </Flex>
                </Flex >
            </Flex >
            {/* //parent of postitem */}
            <Flex border='2px solid purple'
                mt={2}
                padding='4px 4px 4px 4px'
                bg='white'
                borderRadius={10}
                flexDirection={'column'}
                boxShadow={'dark-lg'}
            >
                {/* this is the postobject */}
                <Flex
                    width={'100%'}
                    flexDir={'column'}
                >
                    {/* this is title box */}
                    <Flex width={'100%'} mb={1}>
                        <Box borderRadius={5} height='35px' bg='white' width={"100%"} justifyContent={'center'} alignItems={'center'} justifyItems={'center'} alignContent={'center'}>

                            <Stack>
                                <Skeleton height='20px' borderRadius={5} width={"100%"} />
                                <Skeleton height='10px' borderRadius={5} width={"100%"} />
                            </Stack>
                        </Box >
                    </Flex >
                    <Flex
                        mt={2}
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                    />
                    {/* <Divider orientation='horizontal' bg='black' /> */}
                    {/* content box */}
                    <Flex
                        borderRadius={5}
                        bg='white'
                        border={'2px solid'}
                        borderColor={'white'}
                        flexDirection={'column'}
                        justify={'center'}
                        padding='2px 2px 2px 2px'
                        align={'center'}
                    >

                        <Skeleton width={'90%'} mb={2} borderRadius={5}>
                            <Flex
                                width={'100%'}
                                height={'100px'}
                            >
                            </Flex>
                        </Skeleton>
                        <Skeleton width={'100%'}>
                            <Flex
                                width={'100%'}
                                height={'250px'}
                            >
                            </Flex>
                        </Skeleton>
                    </Flex>
                    <Flex
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                        mt={1}
                    />
                    <Flex
                        mt={1}
                        width={'100%'}
                        height={'40px'}
                        flexDirection={'row'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Skeleton width={'185px'} height={'35px'} />

                    </Flex>
                </Flex >
            </Flex >
            {/* //parent of postitem */}
            <Flex border='2px solid purple'
                mt={2}
                padding='4px 4px 4px 4px'
                bg='white'
                borderRadius={10}
                flexDirection={'column'}
                boxShadow={'dark-lg'}
            >
                {/* this is the postobject */}
                <Flex
                    width={'100%'}
                    flexDir={'column'}
                >
                    {/* this is title box */}
                    <Flex width={'100%'} mb={1}>
                        <Box borderRadius={5} height='35px' bg='white' width={"100%"} justifyContent={'center'} alignItems={'center'} justifyItems={'center'} alignContent={'center'}>

                            <Stack>
                                <Skeleton height='20px' borderRadius={5} width={"100%"} />
                                <Skeleton height='10px' borderRadius={5} width={"100%"} />
                            </Stack>
                        </Box >
                    </Flex >
                    <Flex
                        mt={2}
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                    />
                    {/* <Divider orientation='horizontal' bg='black' /> */}
                    {/* content box */}
                    <Flex
                        borderRadius={5}
                        bg='white'
                        border={'2px solid'}
                        borderColor={'white'}
                        flexDirection={'column'}
                        justify={'center'}
                        padding='2px 2px 2px 2px'
                        align={'center'}
                    >

                        <Skeleton width={'90%'} mb={2} borderRadius={5}>
                            <Flex
                                width={'100%'}
                                height={'100px'}
                            >
                            </Flex>
                        </Skeleton>
                        <Skeleton width={'100%'}>
                            <Flex
                                width={'100%'}
                                height={'250px'}
                            >
                            </Flex>
                        </Skeleton>
                    </Flex>
                    <Flex
                        height={'1px'}
                        border={'0.5px solid black'}
                        boxShadow={'dark-lg'}
                        mt={1}
                    />
                    <Flex
                        mt={1}
                        width={'100%'}
                        height={'40px'}
                        flexDirection={'row'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Skeleton width={'185px'} height={'35px'} />

                    </Flex>
                </Flex >
            </Flex >
        </>
    )
}
export default PostSkeleton;