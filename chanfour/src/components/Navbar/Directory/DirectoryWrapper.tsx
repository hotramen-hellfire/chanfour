import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Text
} from "@chakra-ui/react";
import React from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import Communities from "./Communities";

type DirectoryWrapperProps = {
    UName: string;
};

const DirectoryWrapper: React.FC<DirectoryWrapperProps> = ({ UName }) => {
    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding="0px 6px"
                borderRadius="4px"
                mr={2}
                color={'white'}
                ml={{ md: 4, lg: 0 }}
                _hover={{
                    border: '1px solid black',
                    color: 'black',
                    background: 'white'
                }}
            >
                <Flex
                    align="center"
                    justify="center"
                    width={{ base: "120px", lg: "120px" }}
                    borderRadius={5}
                    cursor={'pointer'}
                    height={'38px'}
                >
                    <Flex align="center" justify={'space-evenly'} >
                        <Flex >
                            <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={TfiAlignJustify} />
                            <Text fontWeight={600} fontSize={"10pt"}>
                                /navigate
                            </Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />
                </Flex>


            </MenuButton>
            <MenuList
                width={'100%'}
                boxShadow={'dark-lg'}
            >
                <Communities />
            </MenuList>
        </Menu >
    );
};
export default DirectoryWrapper;