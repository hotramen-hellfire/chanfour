import { Button, Flex, Icon, Spinner, Textarea } from '@chakra-ui/react';
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
                <Flex
                    height={'100%'}
                    // border='1px solid'
                    // borderColor={'purple'}
                    borderRadius={5}
                    minHeight={'80px'}
                    width={'9%'}
                    ml={1}
                    color={'purple'}
                    _hover={{
                        border: '1px solid green',
                        color: 'green'
                    }}
                    display={props.commentText ? 'unset' : 'none'}
                    onClick={() => { props.onCreateComment(props.commentText); }}
                    bgColor={'white'}
                >
                    <Flex
                        // border={'1px solid green'}
                        align={'center'}
                        justify={'center'}
                        mt={'75%'}
                    >
                        <Icon
                            display={!props.createLoading ? 'flex' : 'none'}
                            as={FaPaperPlane}
                        />
                        <Spinner
                            justifySelf={'center'}
                            alignSelf={'center'}
                            display={props.createLoading ? 'flex' : 'none'}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
};
export default CreateComment;