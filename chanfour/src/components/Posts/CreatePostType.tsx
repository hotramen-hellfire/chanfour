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
                    // onClick={}
                    >
                        POST XD
                    </Button>
                </Flex>
            </Stack>
        </>
    )
}
export default CreatePostType;