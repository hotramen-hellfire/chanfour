import { Button, Flex, Input, Stack, Textarea, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaLock } from "react-icons/fa";
type CreatePostTypeProps = {
    textInputs: {
        title: string,
        body: string
    };
    onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
    fileSize: number,
};

const CreatePostType: React.FC<CreatePostTypeProps> = ({
    textInputs,
    onTitleChange,
    onBodyChange,
    handleCreatePost,
    loading,
    fileSize
}) => {
    return (
        <>
            <Stack spacing={3} width='100%' >
                <Input
                    name={textInputs.title}
                    placeholder="Title(Required!!)"
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
                    borderColor="pink.500"
                    height="36px"
                    borderRadius={'9px'}
                    mr={5}
                    color={'purple'}
                    onChange={onTitleChange}
                />
                <Textarea
                    name={textInputs.body}
                    placeholder={fileSize <= 1024 * 1024 * 5 ? "Write something here (optional)" : 'hidden tip: try using  https://oshi.at/ for files>5MB or if you want them to be permanent use git etc... '}
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
                    borderColor="pink.500"
                    min-height={'250px'}
                    borderRadius={'9px'}
                    mr={5}
                    color={'purple'}
                    onChange={onBodyChange}
                />
                <Flex justify={'center'} align='center' mb={1} flexDirection={'column'}>
                    <Button
                        borderRadius={0}
                        height={'40px'}
                        width={'200px'}
                        border='2px solid purple'
                        variant={'outline'}
                        bg='white'
                        color='purple'
                        _hover={{
                            mt: 5,
                            bg: 'pink',
                            color: 'white',
                            fontSize: '40px',
                            top: '-4',
                            height: '80px',
                            width: '200px',
                            border: '2px solid white'
                        }}
                        display={textInputs.title && fileSize < 1024 * 1024 * 5 ? 'unset' : 'none'}
                        isLoading={loading}
                        justifyContent='center'
                        onClick={handleCreatePost}
                    >
                        POST XD
                    </Button>
                    <Button
                        borderRadius={0}
                        height={'40px'}
                        width={'200px'}
                        border='2px solid black'
                        variant={'outline'}
                        bgGradient={'linear(to-b,' + 'gray.700' + ', purple.50)'}
                        color='black'
                        _hover={{
                            mt: 5,
                            bg: 'black',
                            color: 'white',
                            fontSize: '40px',
                            top: '-4',
                            height: '80px',
                            width: '200px',
                            border: '2px solid white'
                        }}
                        display={!textInputs.title ? 'unset' : 'none'}
                        isLoading={loading}
                        justifyContent='center'
                        fontSize={20}
                    >
                        <Icon as={FaLock} />
                    </Button>
                    <Text fontSize={12} color='purple' display={fileSize > 1024 * 1024 * 5 ? 'unset' : 'none'} mb={1} mt={2}>
                        The file selected has size&lt;5MB, please use a link, best to use github  or https://oshi.at/ :)
                    </Text>
                </Flex>
            </Stack >
        </>
    )
}
export default CreatePostType;