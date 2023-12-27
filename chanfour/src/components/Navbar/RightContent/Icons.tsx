import { Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TfiGithub } from "react-icons/tfi";
import { CiViewTimeline } from "react-icons/ci";
type ActionIconsProps = {};

const ActionIcons: React.FC<ActionIconsProps> = () => {
    // const { toggleMenuOpen } = useDirectory();
    return (
        <>
            <Flex
                align={'center'}
                justify={'space-between'}
            >
                <Flex
                    // display={!user ? 'none' : 'flex'}
                    align="center"
                    justify="center"
                    pl={2}
                    pr={2}
                    color={'white'}
                    _hover={{
                        border: '1px solid black',
                        color: 'black',
                        background: 'white'
                    }}
                    borderRadius={5}
                    cursor={'pointer'}
                    height={'38px'}
                // onClick={logout}
                >
                    <Flex align="center" justify={'space-evenly'}>
                        <Flex >
                            <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={TfiGithub} />
                            <Text fontWeight={600} fontSize={"10pt"}>
                                Source
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    width={'2px'}
                    border={'1px solid white'}
                    height={'22px'}
                    ml={1}
                    mr={1}
                />
                <Flex
                    // display={!user ? 'none' : 'flex'}
                    align="center"
                    justify="center"
                    pl={2}
                    pr={2}
                    color={'white'}
                    _hover={{
                        border: '1px solid black',
                        color: 'black',
                        background: 'white'
                    }}
                    borderRadius={5}
                    cursor={'pointer'}
                    height={'38px'}
                // onClick={logout}
                >
                    <Flex align="center" justify={'space-evenly'}>
                        <Flex >
                            <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={CiViewTimeline} />
                            <Text fontWeight={600} fontSize={"10pt"}>
                                About
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex >

        </>
    );
};
export default ActionIcons;