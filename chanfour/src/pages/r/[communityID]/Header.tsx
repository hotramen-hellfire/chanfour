import { Community } from '@/src/components/atoms/communitiesAtom';
import { Box, Flex } from '@chakra-ui/react';
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
                <Box bg={''} />
                <Flex justify={'center'} bg='white' flexGrow={1}>
                    <Flex width='95%' maxWidth={'860px'} border='1px solid'>

                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
export default Header;