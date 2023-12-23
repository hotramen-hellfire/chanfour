import { Button, Flex, Icon, Textarea } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { FaPaperPlane } from "react-icons/fa";
type CreateCommentProps = {
    commentText: string,
    setCommentText: (value: string) => void,
    user?: User | null,
    createLoading: boolean,
    onCreateComment: (commentText: string) => void;
};

const CreateComment: React.FC<CreateCommentProps> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setCommentText(event.target.value)
    };
    return (
        <>
            <Flex
                mt={2}
                flexDirection={'row'}
                textAlign={'center'}
                width={'100%'}
                align={'center'}
                justify={'center'}
            >
                {/* <Text color={'purple'} fontSize={20}>
                    Add Comment
                </Text> */}
                <Textarea
                    name={props.commentText}
                    value={props.commentText}
                    placeholder="Write something here"
                    _placeholder={{ color: "purple.200" }}
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
                    onChange={onChange}
                    boxShadow={'xl'}
                    width={'90%'}
                    height={'100%'}
                    display={'flex'}
                />
                <Button
                    borderRadius={0}
                    height={'100%'}
                    border='1px solid'
                    borderColor={'purple'}
                    variant={'outline'}
                    bg='white'
                    minHeight={'80px'}
                    width={'9%'}
                    color={'purple'}
                    _hover={{
                        border: '1px solid green',
                        color: 'green'
                    }}
                    display={props.commentText ? 'unset' : 'none'}
                    justifyContent='center'
                    onClick={() => { props.onCreateComment(props.commentText); }}
                    ml={1}
                >
                    <Icon as={FaPaperPlane} />
                </Button>
            </Flex>
        </>
    )
};
export default CreateComment;