import { Button, Flex, Icon, Input, Text, baseTheme } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsYoutube } from "react-icons/bs";
import Iframe from 'react-iframe';
type EmbedYtProps = {
    setYtEmbed: (url: string) => void;
};

const EmbedYt: React.FC<EmbedYtProps> = ({ setYtEmbed }) => {
    const [url, setUrl] = useState("");
    const [source, setSource] = useState("");
    const getId = (url: string) => {
        if (url.indexOf('/embed/') > 0) { setYtEmbed(url); return url; }
        if (url.indexOf('/watch?v=') > 0) { setYtEmbed(url.replace('/watch?v=', '/embed/')); return url.replace('/watch?v=', '/embed/'); }
        setYtEmbed('https://youtube.com/embed/' + url.split('/')[3]);
        return 'https://youtube.com/embed/' + url.split('/')[3];
    }
    return (
        <>
            <Flex width='100%' justify='center' align={'center'} flexDirection={'column'} mt={2}>
                <Text color={'purple'} fontSize={20}>
                    Embed Youtube
                </Text>
                <Flex
                    width='100%' justify='space-evenly' align={'center'}
                    border='1px dashed'
                    _hover={{ borderColor: 'purple', boxShadow: '2xl' }}
                    boxShadow={'xl'}
                    borderColor='purple.200'
                    borderRadius={5}
                    flexDirection={'column'}
                    padding={'16px 16px 16px 16px'}
                >
                    <Flex
                        flexDirection={'row'}
                        width='100%' justify='space-evenly' align={'center'}
                    >
                        <Input
                            value={url}
                            onChange={(e) => { setUrl(e.target.value); }}
                            border={'1px solid'}
                            borderColor={'white'}
                            placeholder="URL to be embedded"
                            _placeholder={{ color: 'purple.200' }}
                            _hover={{
                                border: '1px solid purple',
                                boxShadow: '2xl'
                            }}
                            _focus={{
                                outline: "none",
                                border: '1px solid purple',
                                boxShadow: 'dark-lg'
                            }}
                            _focusVisible={{
                                outline: "none",
                            }}
                            boxShadow={'xl'}
                            type='url'
                            width={'70%'}
                        />
                        <Flex
                            align="center"
                            justify="space-around"
                            width={'16%'}
                            color={'red'}
                            _hover={{
                                border: '1px solid red',
                            }}
                            borderRadius={5}
                            cursor={'pointer'}
                            height={'38px'}
                            onClick={() => { setSource(url) }}
                        >
                            &lt;
                            <Text fontWeight={600} fontSize={"10pt"}>
                                {(!source) || (url !== source) ? 'Embed' : 'Embedded/'}
                            </Text>
                            <Icon fontSize={24} as={BsYoutube} />
                            &gt;
                        </Flex>
                    </Flex>
                    {source && <Flex
                        border='1px solid black'
                        m={2}
                        w={{ base: '80%', lg: '60%' }}
                        h={{ base: '226px', lg: '314px' }}
                    >
                        <Iframe url={getId(source)}
                            // width="640px"
                            // height="320px"
                            id=""
                            className=""
                            display="block"
                            position="relative"
                            width='100%'
                            height='100%'
                        />
                    </Flex>
                    }
                </Flex>
            </Flex >
            <Text fontSize={11} color={'gray.500'} mt={2}>
                embed empty to clean<br />
                YtShorts aren't supported
            </Text>
        </>
    )
}
export default EmbedYt;