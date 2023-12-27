import { authentication } from '@/src/firebase/clientApp';
import { Flex, Icon, MenuDivider, MenuItem } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";

type UserListProps = {};

const UserList: React.FC<UserListProps> = () => {
    const logout = async () => {
        await signOut(authentication);
    };

    return (
        <>
            <MenuItem
                fontSize="10pt"
                fontWeight={700}
                _hover={{ bg: "purple.700", color: "white" }}
            >
                <Flex alignItems="center">
                    <Icon fontSize={20} mr={2} as={CgProfile} />
                    Profile
                </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
                fontSize="10pt"
                fontWeight={700}
                _hover={{ bg: "purple.700", color: "white" }}
                onClick={logout}
            >
                <Flex alignItems="center">
                    <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                    Log Out
                </Flex>
            </MenuItem>
        </>
    );
};
export default UserList;