import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../Atoms/loadingAtom';

type CreateMediaTypeProps = {
    selectedFile?: string;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedFile: (value: string) => void;
    fileSize: number;
    loading: boolean;
};

const CreateMediaType: React.FC<CreateMediaTypeProps> = ({
    selectedFile,
    onSelectImage,
    setSelectedFile,
    fileSize,
    loading }) => {
    const selectedFileRef = useRef<HTMLInputElement>(null);
    const snipColor = 'white';
    const setLoadingBar = useSetRecoilState(loadingState);
    useEffect(() => {
        setLoadingBar(loading)
    }, [loading])

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

                    <Flex maxWidth={"70%"} display={selectedFile ? 'unset' : 'none'} mb={4} mt={4}>
                        <Text fontSize={12} color='white'>
                            fileSize:{fileSize / (1024 * 1024)} MB/2 MB
                        </Text>
                        <Text fontSize={20} color='white' display={fileSize > 1024 * 1024 * 5 ? 'unset' : 'none'} mb={1}>
                            Pwweasee use Links For Large Files :) (&lt; 5MB)
                        </Text>
                        <Image src={selectedFile} border='4px solid black' alt='only images are supported as of now' />
                    </Flex>
                    <Flex flexDirection={'row'}>
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
                                fontSize: '30px',
                                top: '-4',
                                height: '60px',
                                width: '400px',
                                border: '2px solid white'
                            }}
                            isLoading={loading}
                            justifyContent='center'
                            onClick={() => selectedFileRef.current?.click()}
                            mr={2}
                        >
                            {selectedFile ? 'CHANGE SELECTION' : 'UPLOAD IMG/ VIDEO'}
                        </Button>
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
                                fontSize: '30px',
                                top: '-4',
                                height: '60px',
                                width: '400px',
                                border: '2px solid white'
                            }}
                            isLoading={loading}
                            justifyContent='center'
                            display={selectedFile ? 'unset' : 'none'}
                            onClick={() => setSelectedFile("")}
                        >
                            CLEAR SELECTION
                        </Button>
                    </Flex>
                    <input
                        type='file'
                        hidden
                        ref={selectedFileRef}
                        onChange={onSelectImage}
                    />
                </Flex>
            </Flex >
        </>
    )
}
export default CreateMediaType;