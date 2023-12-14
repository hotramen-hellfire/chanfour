import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
type SearchInputProps = {
    // user:
};

const SearchInput: React.FC<SearchInputProps> = () => {

    return (
        <Flex flexGrow={1} ml={2} mr={1} align="center">
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='green.300' mb={1} />
                </InputLeftElement>
                <Input fontSize="10pt" placeholder='search' _placeholder={{ color: 'green.500' }} _hover={{
                    bg: "white",
                    border: "2px solid",
                    borderColor: "green.200"
                }}
                    _focus={{
                        outline: "none",
                        border: "2px solid",
                        borderColor: "green.1000"
                    }}
                    height="34px"
                    bg="gray.50"
                />
            </InputGroup>
        </Flex>
    )
}
export default SearchInput;