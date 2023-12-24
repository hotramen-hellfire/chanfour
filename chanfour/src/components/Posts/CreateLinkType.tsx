import { Button, Text, Flex, Image, Input, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../Atoms/loadingAtom';
type CreateLinkTypeProps = {
    onSet: (url: string) => void;
};

const CreateLinkType: React.FC<CreateLinkTypeProps> = ({ onSet }) => {
    const setLoadingBar = useSetRecoilState(loadingState)
    const [source, setSource] = useState("");
    const [url, setUrl] = useState("");
    const [lastSet, setlastSet] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };
    const snipColor = 'white';

    return (
        <>
            <Flex width='100%' minHeight={'354px'} justify='center' align={'center'}>
                <Flex
                    width='100%' minHeight={'354px'} justify='center' align={'center'}
                    border='2px dashed'
                    borderColor={snipColor}
                    borderRadius={5}
                    flexDirection={'column'}
                    padding={'16px 16px 16px 16px'}
                >
                    <Input
                        value={url}
                        onChange={onChange}
                        placeholder="URL to be embedded"
                        _placeholder={{ color: "pink.400" }}
                        _hover={{
                            bg: "white",
                            border: "1px solid",
                            borderColor: "pink.500",
                        }}
                        _focus={{
                            outline: "none",
                            bg: "white",
                            border: "1px solid",
                            borderColor: "purple.500",
                        }}
                        _focusVisible={{
                            outline: "none",
                        }}
                        bg="purple.50 "
                        height="36px"
                        borderRadius={'9px'}
                        borderColor={url === lastSet && url ? 'green' : 'purple'}
                        color={url === source ? 'green' : 'purple'}
                        type='url'
                    />
                    <Text color="white" fontSize={20} display={error ? 'flex' : 'none'} >
                        {error} :(
                    </Text>

                    <Flex justify={'center'} align='center' mb={1} flexDirection={'row'}>
                        <Button
                            borderRadius={0}
                            height={'40px'}
                            width={'200px'}
                            border='2px solid'
                            variant={'outline'}
                            bg='white'
                            borderColor={url === source && url ? 'green' : 'purple'}
                            color={url === source && url ? 'green' : 'purple'}
                            _hover={{
                                mt: 5,
                                bg: 'pink',
                                color: 'white',
                                fontSize: '20px',
                                top: '-4',
                                height: '60px',
                                width: '200px',
                                border: '2px solid white'
                            }}
                            display={url ? 'unset' : 'none'}
                            justifyContent='center'
                            onClick={() => { setSource(url); setLoading(true); }}
                            mt={2}
                            mr={2}
                        >
                            Fetch and Render
                        </Button>
                        <Button
                            borderRadius={0}
                            height={'40px'}
                            width={'200px'}
                            border='2px solid'
                            borderColor={url === lastSet && url ? 'green' : 'purple'}
                            variant={'outline'}
                            bg='white'
                            color={url === lastSet && url ? 'green' : 'purple'}
                            _hover={{
                                mt: 5,
                                bg: 'pink',
                                color: 'white',
                                fontSize: '20px',
                                top: '-4',
                                height: '60px',
                                width: '200px',
                                border: '2px solid white'
                            }}
                            display={url ? 'unset' : 'none'}
                            justifyContent='center'
                            onClick={() => { if (url !== source) { setSource(url); setLoading(true); } onSet(url); setlastSet(url); }}
                            mt={2}
                        >
                            Embed
                        </Button>
                    </Flex>
                    <Skeleton display={loading ? 'unset' : 'none'} height={'300px'} width={'80%'} mt={1} borderRadius={10} />
                    <Image minWidth={'90%'} onLoad={() => setLoading(false)} display={!loading && source && !error ? 'unset' : 'none'} mb={4} mt={4} src={source} border='2px solid black' alt='only images are supported as of now :9' />
                    <Flex justify={'center'} align='center' mb={1} flexDirection={'row'}>
                        <Button
                            borderRadius={0}
                            height={'40px'}
                            width={'200px'}
                            border='2px solid'
                            borderColor='red'
                            variant={'outline'}
                            bg='white'
                            color='red'
                            _hover={{
                                mt: 5,
                                bg: 'pink',
                                color: 'RED',
                                fontSize: '20px',
                                top: '-4',
                                height: '60px',
                                width: '250px',
                                border: '2px solid white'
                            }}
                            display={lastSet ? 'unset' : 'none'}
                            justifyContent='center'
                            onClick={() => { setSource(""); onSet(""); setlastSet("") }}
                            mt={2}
                        >
                            Remove Embedding
                        </Button>
                    </Flex>
                </Flex>
            </Flex >
        </>
    )
}
export default CreateLinkType;