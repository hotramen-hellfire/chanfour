import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../Atoms/authModalAtom';
import { FIREBASE_ERRORS } from '../../../firebase/errors';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { authentication } from "../../../firebase/clientApp";
import { loadingState } from '../../Atoms/loadingAtom';
type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        userError,
    ] = useSignInWithEmailAndPassword(authentication);


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError("");
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        setLoadingBar(loading)
    }, [loading])

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                textAlign={"center"}
                name="email"
                placeholder='email'
                type='email'
                mb={1}
                onChange={onChange}
                fontSize={"10pt"}
                bg="gray.50"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "purple.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "purple.500"
                }}
                _focusVisible={{
                    outline: "none",
                }}
            />
            <Input
                required
                textAlign={"center"}
                name="password"
                placeholder='password'
                type='password'
                mb={2}
                onChange={onChange}
                fontSize={"10pt"}
                bg="gray.50"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "purple.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "purple.500"
                }}
                _focusVisible={{
                    outline: "none",
                }}
            />
            {error || userError && <Text textAlign="center" color={"purple"} fontSize={12}>
                {error || FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]}
            </Text>}
            <Button
                width="100%"
                height="36px"
                mt={"2px"}
                mb={"2px"}
                isLoading={loading}
                type="submit">Login</Button>
            <Flex mt={2} fontSize="9pt" justifyContent={"center"}>
                <Text mr={1}>
                    Forgot passphrase??
                </Text>
                <Text ml={1} color={"purple.500"} fontWeight={700} cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "resetPassword"
                        }))
                    }
                >
                    Reset. . .
                </Text>
            </Flex>
            <Flex mt={0} fontSize="9pt" justifyContent={"center"}>
                <Text mr={1}>
                    New here??
                </Text>
                <Text ml={1} color={"purple.500"} fontWeight={700} cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "signup"
                        }))
                    }
                >
                    SignUp. . .
                </Text>
            </Flex>
        </form>
    )
}
export default Login;