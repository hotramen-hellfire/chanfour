import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
const Navbar: React.FC = () => {

    return (
        <Flex bg="#710193" border="1px solid purple" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image src="images/leaf.svg" height="30px" />
                <Image display={{ base: "none", md: "unset" }} src="images/webname.png" height="46px" />
            </Flex>
            {/* <Directory /> */}
            <SearchInput />
            <RightContent />
        </Flex>
    );
};
export default Navbar;