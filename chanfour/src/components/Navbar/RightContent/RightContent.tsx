import { Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
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