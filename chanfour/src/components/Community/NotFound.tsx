import { Button, Flex, Link, Progress } from "@chakra-ui/react"
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

const CommunityNotFound: React.FC = () => {
    return (
        <>
            <Progress size='xs' isIndeterminate colorScheme='pink' />
            <Flex
                direction='column'
                justifyContent='center'
                alignItems="center"
                minHeight="60vh"
            >
                The requested community doesn't exist. . . :(
                <Link href="/">
                    <Button mt={4}> Go Home</Button>
                </Link>
            </Flex>
        </>
    )
}

export default CommunityNotFound;