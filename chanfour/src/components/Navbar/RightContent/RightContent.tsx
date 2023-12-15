import { Button, Flex, Menu } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';
import { User, signOut } from 'firebase/auth';
import { authentication } from '@/src/firebase/clientApp';
import Icons from './Icons';
import MenuWrapper from './ProfileMenu/MenuWrapper';

type RightContentProps = {
    user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justifyContent="space-between" alignItems="center" overflow={"visible"}>
                {user ? <Icons /> : <AuthButtons />}
                <MenuWrapper />
            </Flex>
        </>
    );
};
export default RightContent;