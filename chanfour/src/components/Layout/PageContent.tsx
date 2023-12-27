import { Flex, Image } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
    children: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {

    return (<>
        <Flex justify='center' p='40px 0px'>
            <Flex
                width={'95%'}
                maxWidth={'1024px'}
                // border={'2px solid orange'}
                bg='transparent'>
                <Flex
                    // border={'2px solid green'}
                    width={{ base: '100%', md: '65%' }}
                    flexDirection={'column'}
                    mr={{ base: 2, md: 6 }}
                >
                    {children[0 as keyof typeof children]}
                </Flex>
                <Flex
                    display={{ base: 'none', md: 'flex' }}
                    flexGrow={1}
                    direction={'column'}
                    maxWidth={'30%'}
                // border={'2px solid brown'}
                >
                    {children[1 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    </>
    )
}
export default PageContent;