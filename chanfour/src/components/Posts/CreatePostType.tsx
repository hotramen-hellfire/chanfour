import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';

type CreatePostTypeProps = {

};

const CreatePostType: React.FC<CreatePostTypeProps> = () => {

    return (
        <>
            <Stack spacing={3} width='100%' >
                <Input
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

                />
                <Textarea
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
                />
                <Flex>
                    <Button>Post</Button>
                </Flex>
            </Stack>
        </>
    )
}
export default CreatePostType;