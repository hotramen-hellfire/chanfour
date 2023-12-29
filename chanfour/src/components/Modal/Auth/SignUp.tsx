import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authentication, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from '../../../firebase/errors';
import { authModalState } from '../../Atoms/authModalAtom';
import { loadingState } from "../../Atoms/loadingAtom";
import { domains } from "@/envDom";
type SignUpProps = {

};

const SignUp: React.FC<SignUpProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [charsRemaining, setCharsRemaining] = useState(17);
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        UName: ""
    });
    const [error, setError] = useState("");
    const [uerror, setUError] = useState("");
    const [loading, setLoading] = useState(false);
    const [
        createUserWithEmailAndPassword,
        _,
        __,
        userError,
    ] = useCreateUserWithEmailAndPassword(authentication);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("signup write request + read check!!");
        var etype = 'n';
        try {
            if (error) setError("");
            if (uerror !== '') return;
            setLoading(true);
            // if (!domains.some(((item) => (signUpForm.email.includes(item))))) {
            //     etype = 'e';
            //     throw new Error("only emails with .*@iit* allowed!! :)");
            // }


            var userDocRef: any = doc(firestore, 'userByID', signUpForm.email);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                etype = 'e';
                throw new Error('email already in use :(. . .');
            }
            if (signUpForm.password.length < 8) {
                etype = 'e';
                throw new Error("use passphrase of length>=8 pls. . .")
            }
            if (signUpForm.password !== signUpForm.confirmPassword) {
                etype = 'e';
                throw new Error("sadly, passes do not match. . .")
            }
            //check if an id with the same username exists
            var snapshot = await getDocs(query(collection(firestore, 'userByID'), where("UName", "==", signUpForm.UName)));
            if (snapshot.size > 0) {
                etype = 'u';
                throw new Error('username is taken, get more creative++ :)');
            }
            await setDoc(userDocRef, {
                uid: signUpForm.email,
                UName: signUpForm.UName,
                joined: serverTimestamp(),
                activity: 0,
            })
            await createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
            setLoading(false);
            // location.reload();
        } catch (error: any) {
            console.log('in handleCreateCommunity: ', error);
            if (etype === 'u') setUError(error.message);
            else setError(error.message);
        }
        setLoading(false);
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const onUNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 17) {
            event.target.value = event.target.value.substring(0, 17);
            return;
        }
        setCharsRemaining(17 - event.target.value.length)
        if (format.test(event.target.value)) {
            setUError("cannot contain /[ `!@#$%^&*()+\-=\[\]{};':\"\\|,.<>\/?~]/</>");
            return;
        }
        setUError('');
    }
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
                placeholder='@... email'
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
                _focusVisible={{
                    outline: "none",
                }}
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
                _focusVisible={{
                    outline: "none",
                }}
                required
                textAlign={"center"}
                name="confirmPassword"
                placeholder='confirm passphrase, (or STML check?)'
                type='password'
                onChange={onChange}
                fontSize={"10pt"}
                mb={1}
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
                _focusVisible={{
                    outline: "none",
                }}
                required
                textAlign={"center"}
                name="UName"
                placeholder='set username'
                type='text'
                onInput={onChange}
                onChange={onUNameChange}
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
            <Text fontSize={11} fontWeight={charsRemaining === 0 ? 1000 : 500} color={charsRemaining === 0 ? 'purple' : 'gray.500'}>
                {charsRemaining} Characters remaining
            </Text>
            <Text fontSize={12} color={'purple'} display={uerror === '' ? 'none' : 'flex'}>{uerror}</Text>

            <Text fontSize={12} color={'purple'} display={error === '' ? 'none' : 'flex'}>{error}</Text>
            {
                userError && <Text textAlign="center" fontSize={12} color={'purple'} display={userError ? 'flex' : 'none'}>
                    {FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]}
                </Text>
            }
            <Button
                width="100%"
                height="36px"
                mt={1}
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