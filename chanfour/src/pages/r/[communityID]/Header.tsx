import { Community } from '@/src/components/atoms/communitiesAtom';
import { Flex } from '@chakra-ui/react';
import React from 'react';

type HeaderProps = {
    communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {

    return (
        <>
            <Flex
                flexDirection={'column'}
                width={'100%'}
                height={'146px'}
            >
                HEADER
            </Flex>
        </>
    )
}
export default Header;