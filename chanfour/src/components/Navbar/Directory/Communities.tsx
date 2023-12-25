import useCommunityData from '@/src/hooks/useCommunityData';
import { Code, Flex, Icon, Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { TbCornerDownRightDouble } from "react-icons/tb";
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';

const Communities: React.FC = () => {
    const { commmunityStateValue, loading } = useCommunityData();
    const [open, setOpen] = useState(false);
    const mySnippets = commmunityStateValue.mySnippets;
    const router = useRouter();

    return (
        <>
            <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
            <Stack
                display={open ? 'none' : 'unset'}
            >
                <Flex
                    mt={0.5}
                    mb={0.5}
                    width="100%"
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{
                        bg: "purple.500",
                        color: "white",
                        boxShadow: 'dark-lg',
                    }}
                    onClick={() => setOpen(true)}
                    // border={'0.5px solid black'}
                    boxShadow={'xl'}
                    flexDirection={'row'}
                    align={'center'}
                    pl={2}
                    pr={2}
                    cursor={'pointer'}
                >
                    <Flex
                        align="center"
                        width={'100%'}
                        justify={'center'}
                        height={'100%'}
                    // border={'1px solid red'}
                    >
                        <Code
                            colorScheme='purple'
                            width={'100%'}
                            height={'100%'}
                            justifyContent={'center'}
                            justifyItems={'center'}
                            alignContent={'center'}
                            alignItems={'center'}
                            fontSize={16}
                        >a/createBoard</Code>
                    </Flex>
                </Flex>
                <Flex
                    mt={0.5}
                    mb={0.5}
                    width="100%"
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{
                        bg: "purple.400",
                        color: "white",
                        boxShadow: 'dark-lg',
                    }}
                    onClick={() => router.push('/')}
                    boxShadow={'xl'}
                    flexDirection={'row'}
                    align={'center'}
                    pl={2}
                    pr={2}
                    cursor={'pointer'}
                >
                    <Flex
                        align="center"
                        width={'100%'}
                        justify={'center'}
                        height={'100%'}
                    >
                        <Code
                            colorScheme='purple'
                            width={'100%'}
                            height={'100%'}
                            justifyContent={'center'}
                            justifyItems={'center'}
                            alignContent={'center'}
                            alignItems={'center'}
                            fontSize={16}
                        >a/goHome</Code>
                    </Flex>
                </Flex>
                <Flex
                    justify={'center'}
                    width='100%'
                    mt={1}
                    display={mySnippets.length ? 'flex' : 'none'}
                >
                    <Code
                        textAlign={'center'}
                        fontSize={12}
                        textColor={'purple'}
                    >YOUR BOARDS</Code>
                </Flex>
                <Flex
                    justify={'center'}
                    width='100%'
                    mt={1}
                    color={'purple'}
                    display={loading ? 'flex' : 'none'}
                >
                    <Spinner />
                </Flex>
                {
                    mySnippets.map(item =>
                        <Flex
                            key={item.communityID}
                            mt={0.5}
                            mb={0.5}
                            width="100%"
                            fontSize="10pt"
                            fontWeight={700}
                            _hover={{
                                bg: "purple.500",
                                color: "white",
                                boxShadow: 'dark-lg',
                            }}
                            onClick={() => router.push('/r/' + item.communityID)}
                            // border={'0.5px solid black'}
                            boxShadow={'xl'}
                            flexDirection={'row'}
                            align={'center'}
                            pl={2}
                            pr={2}
                            cursor={'pointer'}
                        >
                            <Icon as={TbCornerDownRightDouble} />
                            <Flex
                                align="center"
                                width={'100%'}
                                justify={'center'}
                                height={'100%'}
                            // border={'1px solid red'}
                            >
                                <Code
                                    // textAlign={'center'}
                                    colorScheme='purple'
                                    width={'100%'}
                                    height={'100%'}
                                    justifyContent={'center'}
                                    justifyItems={'center'}
                                    alignContent={'center'}
                                    alignItems={'center'}
                                    fontSize={16}
                                >b/{item.communityID}</Code>
                            </Flex>
                        </Flex>
                    )}
            </Stack >
        </>
    )
}
export default Communities;