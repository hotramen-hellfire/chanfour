import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication } from '@/src/firebase/clientApp';
const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(authentication);
    return (
        <Flex bg="#710193" border="1px solid purple" height="44px" padding="6px 12px" overflow={"visible"}>
            <Flex align="center">
                <Image src="images/leaf.svg" height="30px" />
                <Image display={{ base: "none", md: "unset" }} src="images/webname.png" height="46px" />
            </Flex>
            {/* <Directory /> */}
            <SearchInput />
            <RightContent user={user} />
        </Flex>
    );
};
export default Navbar;