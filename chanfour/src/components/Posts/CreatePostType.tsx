import { Button, Flex, Input, Stack, Textarea, Text } from '@chakra-ui/react';
import React from 'react';

type CreatePostTypeProps = {
    textInputs: {
        title: string,
        body: string
    };
    onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
};

const CreatePostType: React.FC<CreatePostTypeProps> = ({
    textInputs,
    onTitleChange,
    onBodyChange,
    handleCreatePost,
    loading
}) => {
    return (
        <>
            <Stack spacing={3} width='100%' >
                <Input
                    name={textInputs.title}
                    placeholder="Title"
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
                    placeholder="write something here (optional)"
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
                    height={'50px'}
                    borderRadius={'9px'}
                    mr={5}
                    color={'purple'}
                    onChange={onBodyChange}
                />
                <Flex justify={'center'}>
                    <Button
                        borderRadius={0}
                        height={'40px'}
                        width={'80px'}
                        border='2px solid purple'
                        variant={'outline'}
                        bg='white'
                        color='black'
                        ml={5}
                        _hover={{
                            mt: 5,
                            bg: 'pink',
                            color: 'white',
                            fontSize: '40px',
                            top: '-4',
                            height: '80px',
                            width: '180px',
                            border: '2px solid white'
                        }}
                        disabled={false}
                    >
                        POST XD
                    </Button>
                </Flex>
            </Stack>
        </>
    )
}
export default CreatePostType;