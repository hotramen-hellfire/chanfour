import { authentication } from '@/src/firebase/clientApp';
import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../Atoms/authModalAtom';
import AuthInputs from './AuthInputs';
import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const [user, looading, error] = useAuthState(authentication);
    const handleClose = () => {
        setModalState(prev => ({
            ...prev,
            open: false,
        })
        )
    }

    useEffect(() => {
        if (user) handleClose();
    }, [user])

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent border={"2px solid purple"}>
                    <ModalHeader textAlign={"center"}>
                        {modalState.view === 'login' && 'Login'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent={"center"}
                        pb={6}
                    >
                        <Flex
                            direction={"column"}
                            align={"center"}
                            justify={"center"}
                            width={"70%"}
                        >
                            {
                                modalState.view === 'login' || modalState.view === 'signup' ?
                                    <AuthInputs /> :
                                    <ResetPassword />
                            }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AuthModal;