import React from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Text
} from "@chakra-ui/react";
import Communities from "./Communities";
import { GrAdd } from "react-icons/gr";
import { TiHome } from "react-icons/ti";

const DirectoryWrapper: React.FC = () => {
    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding="0px 6px"
                borderRadius="4px"
                color={"white"}
                _hover={{ outline: "1px solid", outlineColor: "gray.200", bg: 'gray.100', color: 'purple' }}
                mr={2}
                ml={{ md: 4, lg: 0 }}
            >
                <Flex alignItems="center" justify="space-between" width={{ base: "auto", lg: "100px" }}>
                    <Flex alignItems="center">
                        <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={TiHome} />
                        <Flex display={{ base: 'none', lg: "flex" }}>
                            <Text fontWeight={600} fontSize={"10pt"}>
                                Home
                            </Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                <Communities />
            </MenuList>
        </Menu >
    );
};
export default DirectoryWrapper;