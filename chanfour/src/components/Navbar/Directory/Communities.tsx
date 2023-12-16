import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';
import { GrAddCircle } from 'react-icons/gr';

const Communities: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
            <MenuItem
                width="100%"
                fontSize="10pt"
                fontWeight={700}
                _hover={{ bg: "purple.400", color: "white" }}
                onClick={() => setOpen(true)}
            >
                <Flex align="center">
                    <Icon as={GrAddCircle} fontSize={20} mr={2} />
                    Start A Board
                </Flex>

            </MenuItem>
        </>
    )
}
export default Communities;