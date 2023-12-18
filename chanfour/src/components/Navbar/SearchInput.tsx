import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
type SearchInputProps = {
    user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {

    return (
        <Flex flexGrow={1} ml={2} mr={1} align="center" /*maxWidth={user ? "auto" : "600px"}*/>
            <InputGroup >
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='purple.300' mb={1} />
                </InputLeftElement>
                <Input fontSize="10pt" textAlign={'center'} placeholder='search' _focusVisible={{
                    outline: "none",
                }} _placeholder={{ color: 'purple.500' }} _hover={{
                    bg: "white",
                    border: "2px solid",
                    borderColor: "purple.200"
                }}
                    _focus={{
                        outline: "none",
                        border: "2px solid",
                        borderColor: "purple.1000"
                    }}
                    height="34px"
                    bg="gray.50"
                    mr={1}
                />
            </InputGroup>
        </Flex>
    )
}
export default SearchInput;