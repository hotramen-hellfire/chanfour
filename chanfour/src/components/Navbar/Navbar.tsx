import { authentication, firestore } from '@/src/firebase/clientApp';
import { Flex, Image, Progress } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import DirectoryWrapper from './Directory/DirectoryWrapper';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
import { UNameState } from '../atoms/UNameAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loadingState } from '../atoms/loadingAtom';
const Navbar: React.FC = () => {
    const setLoadingBar = useSetRecoilState(loadingState);
    const [loadingBar] = useRecoilState(loadingState);
    const [user, _, __] = useAuthState(authentication);
    const setUNameState = useSetRecoilState(UNameState);
    const [UNameObj] = useRecoilState(UNameState);
    const getUName = async () => {
        if (!user) { return; }//will never be invoked
        var uid = user.email!.split(".")[0];
        const userDocRef = doc(firestore, 'userByID', uid);
        const userDoc = await getDoc(userDocRef);
        setUNameState({
            UName: userDoc.data()!['UName'],
            isValid: true,
        })
        return;
    }
    useEffect(() => {
        if (user) { getUName() };
    }, [user, UNameObj])

    return (
        <>
            <Flex bg="#710193" border="1px solid purple" height="44px" padding="6px 12px" overflow={"visible"}>
                <Flex align="center" mr={{ base: 2, md: 6, lg: 2 }}>
                    <Image src="https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/leaf.png" height="30px" mr={2} />
                    <Image display={{ base: "none", md: "unset" }} src="https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/webname.png" height="46px" />
                </Flex>
                {user && <DirectoryWrapper UName={UNameObj.UName} />}
                <SearchInput user={user} />
                <RightContent user={user} UName={UNameObj.UName} />
            </Flex>
            <Progress size='xs' isIndeterminate display={loadingBar ? 'flex' : 'none'} colorScheme='pink' />
        </>
    );
};
export default Navbar;