import { Code, Flex, Icon, Stack, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { TbCornerDownRightDouble } from "react-icons/tb";
import { MdOutlineAddBox } from "react-icons/md";
import { useRecoilValue } from 'recoil';
import { communityState } from '../../Atoms/communitiesAtom';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';

const Communities: React.FC = () => {
    const [open, setOpen] = useState(false);
    const mySnippets = useRecoilValue(communityState).mySnippets;
    const router = useRouter();
    const imageWidth = 30

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
                        bg: "purple.400",
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
                >
                    <Flex
                        align="center"
                        width={'90%'}
                        justify={'center'}
                        height={'100%'}
                        border={'1px solid red'}
                    >
                        <Code
                            colorScheme='purple'
                            width={'100%'}
                            height={'100%'}
                            justifyContent={'center'}
                            justifyItems={'center'}
                            alignContent={'center'}
                            alignItems={'center'}
                        >a/createBoard</Code>
                    </Flex>
                </Flex>
                <Flex
                    justify={'center'}
                    width='100%'
                    mt={1}
                >
                    <Code
                        textAlign={'center'}
                        fontSize={12}
                    >YOUR BOARDS</Code>
                </Flex>
                {
                    mySnippets.map(item =>
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
                            onClick={() => router.push('/r/' + item.communityID)}
                            // border={'0.5px solid black'}
                            boxShadow={'xl'}
                            flexDirection={'row'}
                            align={'center'}
                            pl={2}
                            pr={2}
                        >
                            <Icon as={TbCornerDownRightDouble} />
                            <Flex
                                align="center"
                                // width={'90%'}
                                justify={'center'}
                                height={'100%'}
                                border={'1px solid red'}
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
                                >b/{item.communityID}</Code>
                            </Flex>
                        </Flex>
                    )}
            </Stack >
        </>
    )
}
export default Communities;