import React from "react";
import { Flex, Icon, MenuDivider, MenuItem } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { authentication } from '@/src/firebase/clientApp';
import { MdOutlineLogin } from "react-icons/md";
import { signOut } from "firebase/auth";
// import { useResetRecoilState } from "recoil";
// // import { communityState } from "../../../atoms/communitiesAtom";
// import { authentication } from "../../../../firebase/clientApp";
//import { signOut } from "firebase/auth";

type UserListProps = {};

const UserList: React.FC<UserListProps> = () => {
    // const resetCommunityState = useResetRecoilState(communityState);

    // const logout = async () => {
    //     await signOut(authentication);
    //     resetCommunityState();
    // };

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
                onClick={() => signOut(authentication)}
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