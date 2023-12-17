import React, { useEffect, useState } from 'react';
import { Flex, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication, firestore } from '@/src/firebase/clientApp';
import DirectoryWrapper from './Directory/DirectoryWrapper';
import { doc, getDoc } from 'firebase/firestore';
const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(authentication);
    const [UName, setUName] = useState('notfetched');
    const getUName = async () => {
        if (!user) { return; }//will never be invoked
        setUName("reached");
        var uid = user.email!.split(".")[0];
        const userDocRef = doc(firestore, 'userByID', uid);
        const userDoc = await getDoc(userDocRef);
        setUName(userDoc.data()!['UName'] as string);
        return;
    }
    useEffect(() => { if (user) getUName(); }, [user])

    return (
        <Flex bg="#710193" border="1px solid purple" height="44px" padding="6px 12px" overflow={"visible"}>
            <Flex align="center" mr={{ base: 2, md: 6, lg: 2 }}>
                <Image src="images/leaf.png" height="30px" mr={2} />
                <Image display={{ base: "none", md: "unset" }} src="images/webname.png" height="46px" />
            </Flex>
            {user && <DirectoryWrapper UName={UName} />}
            <SearchInput user={user} />
            <RightContent user={user} UName={UName} />
        </Flex>
    );
};
export default Navbar;