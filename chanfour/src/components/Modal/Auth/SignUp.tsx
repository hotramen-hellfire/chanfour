import React, { useState } from "react";
import { Button, Flex, Text, Input } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { authentication } from "../../../firebase/clientApp";
import { authModalState } from '../../atoms/authModalAtom';
import { useSetRecoilState } from "recoil";
import { FIREBASE_ERRORS } from '../../../firebase/errors';
type SignUpProps = {

};

const SignUp: React.FC<SignUpProps> = () => {

    const setAuthModalState = useSetRecoilState(authModalState)
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        userError,
    ] = useCreateUserWithEmailAndPassword(authentication);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError("");
        let domain = "@iitb";
        if (!signUpForm.email.includes(domain)) {
            setError("only IITB emails allowed!! :)");
            return;
        }
        if (signUpForm.password.length < 8) {
            setError("use passphrase of length>=8 pls. . .")
            return;
        }
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError("sadly, passes do not match. . .")
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                textAlign={"center"}
                name="email"
                placeholder='iitb email'
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
            />
            <Input
                required
                textAlign={"center"}
                name="password"
                placeholder='set passphrase'
                type='password'
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
            />
            <Input
                required
                textAlign={"center"}
                name="confirmPassword"
                placeholder='confirm passphrase, (or STML check?)'
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
            />
            {error || userError && <Text textAlign="center" color={"blue"} size={"10pt"}>
                {error || FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]}
            </Text>}
            <Button
                width="100%"
                height="36px"
                mt={"2px"}
                mb={"2px"}
                isLoading={loading}
                type="submit">SignUp</Button>
            <Flex mt={2} fontSize="9pt" justifyContent={"center"}>
                <Text mr={1}>
                    Already have an account??
                </Text>
                <Text ml={1} color={"purple.500"} fontWeight={700} cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "login"
                        }))
                    }
                >
                    Login. . .
                </Text>
            </Flex>
        </form>
    )
}
export default SignUp;