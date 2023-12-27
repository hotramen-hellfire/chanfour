import { authentication } from "@/src/firebase/clientApp";
import SubmitModal from "@/src/pages/r/[communityID]/SubmitModal";
import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFileEarmarkImage, BsLink45Deg } from "react-icons/bs";
import { LiaPagerSolid } from "react-icons/lia";
import { RiAddBoxLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../Atoms/authModalAtom";
import { Community } from "../Atoms/communitiesAtom";

type CreatePostProps = {
    communityData: Community;
};

const CreatePostLink: React.FC<CreatePostProps> = (props) => {
    const [user] = useAuthState(authentication);
    const [openSubmit, setOpenSubmit] = useState(false);
    const setAuthModalState = useSetRecoilState(authModalState);
    const onClick = () => {
        if (!user) {
            setAuthModalState({ open: true, view: 'login' });
            return;
        }
        setOpenSubmit(true);
    }

    return (<>
        <SubmitModal submitModalState={openSubmit} setSubmitModalState={setOpenSubmit} commmunityData={props.communityData} />
        <Flex
            align="center"
            bg="white"
            height="56px"
            borderRadius={'28px'}
            border="2px solid"
            borderColor="pink.300"
            p={2}
            mb={4}
            flexDirection={'row'}
            boxShadow={'2xl'}
            _hover={{
                boxShadow: 'dark-lg'
            }}
            width={'100%'}
        >
            <Flex onClick={onClick} width={'80%'}>
                <Flex
                    ml={5}
                    align="center"
                    height="56px"
                    flexDirection={'row'}
                    width={'100%'}
                >
                    <Icon as={RiAddBoxLine} fontSize={24} color="pink.500" cursor="pointer" mr={3} _hover={{ color: 'purple' }} />
                    <Button
                        fontSize="10pt"
                        _hover={{
                            bg: "white",
                            border: "2px solid",
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
                        border={'1px solid'}
                        color={'pink.500'}
                        height="36px"
                        width={'100%'}
                        borderRadius={'18px'}
                        mr={5}
                        _focusVisible={{
                            outline: "none",
                        }}
                    >
                        Create A Post
                    </Button>
                </Flex>
            </Flex >
            <Flex
                width="20%"
                justify={'space-between'}
                align={'center'}
                flexDirection={'row'}
            >
                <Icon
                    as={BsFileEarmarkImage}
                    fontSize={24}
                    color="pink.500"
                    cursor="pointer"
                    _hover={{ color: 'purple' }}
                    onClick={onClick}
                />
                <Icon as={BsLink45Deg} fontSize={24} color="pink.500" cursor="pointer" _hover={{ color: 'purple' }} onClick={onClick} />
                <Icon as={LiaPagerSolid} fontSize={24} color="pink.500" cursor="pointer" _hover={{ color: 'purple' }} onClick={onClick} />
            </Flex >
        </Flex>
    </>
    );
};
export default CreatePostLink;