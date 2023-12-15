import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';
import { signOut } from 'firebase/auth';
import { authentication } from '@/src/firebase/clientApp';

type RightContentProps = {
    user: any;
};

const RightContent: React.FC<RightContentProps> = (props) => {

    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {
                    props.user
                        ?
                        <Button onClick={() => signOut(authentication)}
                            variant="outline"
                            height="28px"
                            display={{ base: "none", sm: "flex" }}
                            width={{ base: "70px", md: "110x" }}
                            mr={2}
                        >Logout</Button>
                        :
                        <AuthButtons />
                }
            </Flex >
        </>
    )
}
export default RightContent;