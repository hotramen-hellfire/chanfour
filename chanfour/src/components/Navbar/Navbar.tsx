import { authentication, firestore } from '@/src/firebase/clientApp';
import { Flex, Icon, Image, Progress, Text } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaHome } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { signOut } from "firebase/auth";
import { UNameState } from '../Atoms/UNameAtom';
import { loadingState } from '../Atoms/loadingAtom';
import DirectoryWrapper from './Directory/DirectoryWrapper';
import RightContent from './RightContent/RightContent';
import { RiLogoutCircleRFill } from "react-icons/ri";
const Navbar: React.FC = () => {
    const [loadingBar] = useRecoilState(loadingState);
    const [user, _, __] = useAuthState(authentication);
    const setUNameState = useSetRecoilState(UNameState);
    const [UNameObj] = useRecoilState(UNameState);
    const router = useRouter();
    const logout = async () => {
        await signOut(authentication);
    };
    useEffect(() => {
        const getUName = async () => {
            if (!user) { return; }//will never be invoked
            var uid = user.email!.split(".")[0];
            const userDocRef = await doc(firestore, 'userByID', uid);
            const userDoc = await getDoc(userDocRef);
            await setUNameState({
                UName: userDoc.data()!['UName'],
                isValid: true,
            })
            return;
        }
        getUName();
    }, [user])

    return (
        <>
            <Flex
                zIndex={1}
                backdropFilter={'blur(40px)'}
                border="1px solid white"
                height="44px"
                padding="6px 12px"
                overflow={"visible"}
                justify={'space-evenly'}
                align={'center'}
                boxShadow={'2xl'}
                _hover={{
                    boxShadow: 'dark-lg'
                }}
            >
                <Flex align="center" mr={{ base: 2, md: 6, lg: 2 }}>
                    <Image src="https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/leaf.png" height="30px" mr={2} />
                    <Image display={{ base: "none", md: "unset" }} src="https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/webname.png" height="46px" />
                </Flex>
                {user && <DirectoryWrapper UName={UNameObj.UName} />}
                {/* <SearchInput user={user} /> */}
                <Flex
                    display={user ? 'none' : 'flex'}
                    align="center"
                    justify="center"
                    width={{ lg: "120px" }}
                    color={'white'}
                    _hover={{
                        border: '1px solid black',
                        color: 'black',
                        background: 'white'
                    }}
                    borderRadius={5}
                    cursor={'pointer'}
                    height={'38px'}
                    onClick={() => router.push('/')}
                >
                    <Flex align="center" justify={'space-evenly'}>
                        <Icon fontSize={24} mr={{ base: 1, md: 1 }}
                            ml={{ base: 1, md: 1 }} as={FaHome} />
                        <Flex
                            display={{ base: 'none', md: 'flex' }}
                        >
                            <Text fontWeight={600} fontSize={"10pt"}>
                                goHome();
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <RightContent user={user} UName={UNameObj.UName} />
                <Flex
                    display={!user ? 'none' : 'flex'}
                    align="center"
                    justify="center"
                    pl={2}
                    pr={2}
                    color={'white'}
                    _hover={{
                        border: '1px solid black',
                        color: 'black',
                        background: 'white'
                    }}
                    borderRadius={5}
                    cursor={'pointer'}
                    height={'38px'}
                    onClick={logout}
                >
                    <Flex align="center" justify={'space-evenly'}>
                        <Flex >
                            <Text fontWeight={600} fontSize={"10pt"}>
                                LogOut
                            </Text>
                        </Flex>
                        <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={RiLogoutCircleRFill} />
                    </Flex>
                </Flex>
            </Flex>
            <Progress size='xs' isIndeterminate display={loadingBar ? 'flex' : 'none'} colorScheme='pink' />
        </>
    );
};
export default Navbar;