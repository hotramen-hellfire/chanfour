import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FaFileSignature } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../Atoms/authModalAtom';

const AuthButtons: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    return (
        <>
            <Flex
                align="center"
                justify="center"
                width={{ base: "120px", lg: "120px" }}
                color={'white'}
                _hover={{
                    border: '1px solid black',
                    color: 'black',
                    background: 'white'
                }}
                borderRadius={5}
                cursor={'pointer'}
                height={'38px'}
                onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
                <Flex align="center" justify={'center'}>
                    <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={RiLoginCircleFill} />
                    <Flex >
                        <Text fontWeight={600} fontSize={"10pt"}>
                            LOGIN
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                align="center"
                justify="center"
                width={{ base: "120px", lg: "120px" }}
                color={'white'}
                _hover={{
                    border: '1px solid black',
                    color: 'black',
                    background: 'white'
                }}
                borderRadius={5}
                cursor={'pointer'}
                height={'38px'}
                onClick={() => setAuthModalState({ open: true, view: "signup" })}
            >
                <Flex align="center" justify={'center'}>
                    <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={FaFileSignature} />
                    <Flex >
                        <Text fontWeight={600} fontSize={"10pt"}>
                            SIGN UP
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
export default AuthButtons;