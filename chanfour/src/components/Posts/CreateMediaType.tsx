import { Flex, Button } from '@chakra-ui/react';
import React, { useRef } from 'react';

type CreateMediaTypeProps = {
    textInputs: {
        title: string,
        body: string
    };
    onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
};

const CreateMediaType: React.FC<CreateMediaTypeProps> = () => {
    const selectedFileRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <Flex width='100%' height='354px' justify='center' align={'center'}>
                <Flex
                    width='100%' height='354px' justify='center' align={'center'}
                    border='2px dashed'
                    borderColor='pink.500'
                    borderRadius={5}
                >
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
                            width: '500px',
                            border: '2px solid white'
                        }}
                        isLoading={false}
                        justifyContent='center'
                        onClick={() => selectedFileRef.current?.click()}
                    >
                        UPLOAD IMG/ VIDEO
                    </Button>
                    <input type='file' hidden ref={selectedFileRef} />
                </Flex>
            </Flex >
        </>
    )
}
export default CreateMediaType;