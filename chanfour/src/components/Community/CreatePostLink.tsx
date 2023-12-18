import { authentication } from "@/src/firebase/clientApp";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFileEarmarkImage, BsLink45Deg } from "react-icons/bs";
import { LiaPagerSolid } from "react-icons/lia";
import { RiAddBoxLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
    const router = useRouter();
    const [user] = useAuthState(authentication);
    const setAuthModalState = useSetRecoilState(authModalState);
    const onClick = () => {
        if (!user) {
            setAuthModalState({ open: true, view: 'login' });
            return;
        }
        const { communityID } = router.query;
        router.push('/r/' + communityID + '/submit');
    }

    return (
        <Flex
            align="center"
            bg="white"
            height="56px"
            borderRadius={'28px'}
            border="1px solid"
            borderColor="pink.300"
            p={2}
            mb={4}
            flexDirection={'row'}
        >
            <Flex onClick={onClick}>
                <Flex
                    ml={5}
                    align="center"
                    height="56px"
                    flexDirection={'row'}
                >
                    <Icon as={RiAddBoxLine} fontSize={24} color="pink.500" cursor="pointer" mr={3} _hover={{ color: 'purple' }} />
                    <Input
                        placeholder="Create Post"
                        fontSize="10pt"
                        _placeholder={{ color: "pink.500" }}
                        _hover={{
                            bg: "white",
                            border: "1px solid",
                            borderColor: "pink.500",
                        }}
                        _focus={{
                            outline: "none",
                            bg: "white",
                            border: "1px solid",
                            borderColor: "purple",
                        }}
                        textAlign={'center'}
                        bg="purple.50 "
                        borderColor="pink.500"
                        height="36px"
                        borderRadius={'18px'}
                        width={{ base: '300px', md: '430px' }}
                        mr={5}
                    />
                </Flex>
            </Flex >
            <Icon
                as={BsFileEarmarkImage}
                fontSize={24}
                mr={5}
                color="pink.500"
                cursor="pointer"
                _hover={{ color: 'purple' }}
                onClick={onClick}
            />
            <Icon as={BsLink45Deg} fontSize={24} color="pink.500" cursor="pointer" mr={5} _hover={{ color: 'purple' }} onClick={onClick} />
            <Icon as={LiaPagerSolid} fontSize={24} color="pink.500" cursor="pointer" _hover={{ color: 'purple' }} onClick={onClick} />
        </Flex >
    );
};
export default CreatePostLink;