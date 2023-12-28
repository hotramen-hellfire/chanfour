import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { TfiGithub } from "react-icons/tfi";
type ActionIconsProps = {};

const ActionIcons: React.FC<ActionIconsProps> = () => {

    return (
        <>
            <Flex
                align={'center'}
                justify={'space-between'}
            >
                <Link
                    href="https://github.com/hotramen-hellfire/chanfour"
                    target="_blank"
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
                            background: 'white',
                        }}
                        borderRadius={5}
                        cursor={'pointer'}
                        height={'38px'}
                    // onClick={logout}
                    >
                        <Flex align="center" justify={'space-evenly'}>
                            <Flex >
                                <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={TfiGithub} />
                                <Text fontWeight={600} fontSize={"10pt"} _hover={{ as: 'samp' }} display={{ base: 'none', md: 'flex' }}>
                                    Source
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Link>
            </Flex >

        </>
    );
};
export default ActionIcons;