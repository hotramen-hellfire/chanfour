import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';

type SignUpProps = {

};

const SignUp: React.FC<SignUpProps> = () => {

    const setAuthModelState = useSetRecoilState(authModalState)
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: ""
    });

    const onSubmit = () => { };
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
            />
            <Input
                required
                textAlign={"center"}
                name="password"
                placeholder='set password'
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
            <Input
                required
                textAlign={"center"}
                name="confirmPassword"
                placeholder='confirm password, (or STML check?)'
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
            <Button
                width="100%"
                height="36px"
                mt={"2px"}
                mb={"2px"}
                type="submit">SignUp</Button>
            <Flex mt={2} fontSize="9pt" justifyContent={"center"}>
                <Text mr={1}>
                    Already have an account??
                </Text>
                <Text ml={1} color={"purple.500"} fontWeight={700} cursor="pointer"
                    onClick={() =>
                        setAuthModelState((prev) => ({
                            ...prev,
                            view: "login"
                        }))
                    }
                >
                    Login
                </Text>
            </Flex>
        </form>
    )
}
export default SignUp;