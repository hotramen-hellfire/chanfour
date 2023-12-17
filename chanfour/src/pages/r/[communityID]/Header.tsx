import { Community } from '@/src/components/atoms/communitiesAtom';
import { Box, Flex, Image } from '@chakra-ui/react';
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
                height={'100px'}
            >
                <Box bg={'blue'} height={'40%'} overflow={'hidden'}>
                    <Image src={'https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communitiesBack.jpg'} alt={'just theming'} />
                </Box>
                <Flex justify={'center'} bg='white' flexGrow={1}>
                    <Flex width='95%' maxWidth={'1000px'} border='1px solid'>
                        hi
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
export default Header;