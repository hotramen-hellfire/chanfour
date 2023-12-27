import { User } from 'firebase/auth';
import React from 'react';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import Icons from './Icons';

type RightContentProps = {
    user?: User | null;
    UName: string
};

const RightContent: React.FC<RightContentProps> = ({ user, UName }) => {
    return (
        <>
            {user ? <Icons /> : <AuthButtons />}
            <AuthModal />
        </>
    );
};
export default RightContent;