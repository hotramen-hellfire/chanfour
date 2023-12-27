import { authentication } from '@/src/firebase/clientApp';
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsReddit } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { authModalState } from '../../Atoms/authModalAtom';
import { loadingState } from '../../Atoms/loadingAtom';


const ResetPassword: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [sendPasswordResetEmail, sending, error] =
        useSendPasswordResetEmail(authentication);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await sendPasswordResetEmail(email);
        setSuccess(true);
    };
    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        setLoadingBar(sending)
    }, [sending])

    return (<>
        <Flex direction="column" alignItems="center" width="100%">
            <Icon as={BsReddit} color="brand.100" fontSize={40} mb={2} />
            <Text fontWeight={700} mb={2}>
                Reset your password
            </Text>
            {success ? (
                <Text mb={4}>Check your email :)</Text>
            ) : (
                <>
                    <Text fontSize="sm" textAlign="center" mb={2}>
                        Enter the email associated with your account and we will send you a
                        reset link
                    </Text>
                    <form onSubmit={onSubmit} style={{ width: "100%" }}>
                        <Input
                            required
                            name="email"
                            placeholder="email"
                            type="email"
                            mb={2}
                            onChange={(event) => setEmail(event.target.value)}
                            fontSize="10pt"
                            textAlign={"center"}
                            _placeholder={{ color: "gray.500" }}
                            _hover={{
                                bg: "white",
                                border: "1px solid",
                                borderColor: "blue.500",
                            }}
                            _focus={{
                                outline: "none",
                                bg: "white",
                                border: "1px solid",
                                borderColor: "blue.500",
                            }}
                            bg="gray.50"
                            _focusVisible={{
                                outline: "none",
                            }}
                        />
                        <Text textAlign="center" fontSize="10pt" color="red">
                            {error?.message}
                        </Text>
                        <Button
                            width="100%"
                            height="36px"
                            mb={0}
                            mt={1}
                            type="submit"
                            isLoading={sending}
                        >
                            Reset Password
                        </Button>
                    </form>
                </>
            )}
        </Flex>
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
    </>
    );
};
export default ResetPassword;