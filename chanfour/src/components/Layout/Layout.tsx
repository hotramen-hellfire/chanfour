import React from 'react';
import Navbar from "../Navbar/Navbar"
import { Flex } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { bgState } from '../Atoms/bgAtom';
type LayoutProps = {
    children: any;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
    const bgLink = useRecoilValue(bgState)
    return (
        <>
            <Flex
                width={'100vw'}
                minHeight={'100vh'}
                flexDirection={'column'}
                bgImage={bgLink}
                backgroundAttachment={'fixed'}
                backgroundSize={'cover'}
                backgroundRepeat={'no-repeat'}
                overflowX={'hidden'}
                overflowY={'hidden'}
            >
                <Navbar />
                <main>
                    {children}
                </main>
            </Flex>
        </>
    );
};
export default Layout;