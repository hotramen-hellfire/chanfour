import React, { useEffect, useState } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { authentication, firestore } from "../../../../firebase/clientApp";


import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import UserList from "./UserList";
import NoUserList from "./NoUserList";
import { doc, getDoc } from "firebase/firestore";
import { TiSpiral } from "react-icons/ti";

type MenuWrapperProps = {};

const MenuWrapper: React.FC<MenuWrapperProps> = () => {
    const [authModal, setModalState] = useRecoilState(authModalState);
    const [user] = useAuthState(authentication);
    const [UName, setUName] = useState('notfetched');
    const getUName = async () => {
        if (!user) { return; }//will never be invoked
        setUName("reached");
        var uid = user.email!.split("@")[0];
        const userDocRef = doc(firestore, 'userByID', uid);
        const userDoc = await getDoc(userDocRef);
        setUName(userDoc.data()!['UName'] as string);
        return;
    }
    if (UName === 'notfetched' && user) getUName();
    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding="0px 6px"
                borderRadius="4px"
                color={"white"}
                _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
            >
                <Flex alignItems="center">
                    <Flex alignItems="center">
                        {user ? (
                            <>
                                <Icon
                                    fontSize={24}
                                    mr={1}
                                    color="white"
                                    as={FaRedditSquare}
                                />
                                <Box
                                    display={{ base: "none", lg: "flex" }}
                                    flexDirection="column"
                                    fontSize="8pt"
                                    alignItems="center"
                                    mr={8}
                                >
                                    <Text fontWeight={700}>
                                        {UName}
                                    </Text>
                                    <Flex alignItems="center">
                                        <Icon as={TiSpiral} color="white" mr={1} fontSize={20} />
                                        <Text color="gray.100">1 karma</Text>
                                    </Flex>
                                </Box>
                            </>
                        ) : (
                            <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
                        )}
                    </Flex>
                    <ChevronDownIcon color="gray.500" />
                </Flex>
            </MenuButton>
            <MenuList>
                {user ? <UserList /> : <NoUserList setModalState={setModalState} />}
            </MenuList>
        </Menu>
    );
};
export default MenuWrapper;