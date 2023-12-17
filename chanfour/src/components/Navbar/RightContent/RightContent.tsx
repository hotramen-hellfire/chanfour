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
    UName: string
};

const RightContent: React.FC<RightContentProps> = ({ user, UName }) => {
    return (
        <>
            <AuthModal />
            <Flex justifyContent="space-between" alignItems="center" overflow={"visible"}>
                {user ? <Icons /> : <AuthButtons />}
                <MenuWrapper UName={UName} />
            </Flex>
        </>
    );
};
export default RightContent;