import { Flex, Icon, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiViewTimeline } from 'react-icons/ci';
import { IoIosGitNetwork } from "react-icons/io";
import AboutModal from '../../Modal/AboutModal';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import Icons from './Icons';
import { useRouter } from 'next/router';
// import router from 'next/router';
type RightContentProps = {
    user?: User | null;
    UName: string
};


const RightContent: React.FC<RightContentProps> = ({ user, UName }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleOpen = () => {
        setOpen(true);
        router.push({ hash: 'about' }, undefined, { shallow: true })
    }

    useEffect(() => {
        if (!open) {
            router.push({ hash: '' }, undefined, { shallow: true })
        }
    }, [open])

    useEffect(() => {
        if (open && router.asPath === '/') {
            setOpen(false);
        }
    }, [router.asPath])

    return (
        <>
            {open && <AboutModal open={open} setOpen={setOpen} />}
            <Flex
                // onLoad={() => { setPageLoaded(true) }}
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
            >
                <Flex align="center" justify={'space-evenly'}>
                    <Flex
                        onClick={() => { handleOpen(); }}
                    >
                        <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={CiViewTimeline} />
                        <Text fontWeight={600} fontSize={"10pt"} display={{ base: 'none', md: 'flex' }}>
                            About
                        </Text>
                    </Flex>
                </Flex>
            </Flex >
            {
                user ?
                    <Icons />
                    : <>
                        <Link
                            href="https://github.com/hotramen-hellfire/chanfour/issues"
                            target="_blank"
                        >
                            <Flex
                                // display={!user ? 'none' : 'flex'}
                                align="center"
                                justify="center"
                                pl={2}
                                pr={2}
                                color={'white'}
                                _hover={{
                                    border: '1px solid black',
                                    color: 'black',
                                    background: 'white',
                                }}
                                borderRadius={5}
                                cursor={'pointer'}
                                height={'38px'}
                            // onClick={logout}
                            >
                                <Flex align="center" justify={'space-evenly'}>
                                    <Flex >
                                        <Icon fontSize={24} mr={{ base: 1, md: 1 }} as={IoIosGitNetwork} />
                                        <Text fontWeight={600} fontSize={"10pt"}
                                            display={{ base: 'none', md: 'flex' }}
                                            _hover={{ as: 'samp' }}
                                        >
                                            Issues
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Link>
                        <AuthButtons />
                    </>
            }
            <AuthModal />
        </>
    );
};
export default RightContent;