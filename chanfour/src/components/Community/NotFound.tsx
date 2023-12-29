import { Button, Card, CardBody, Flex, Progress, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
const CommunityNotFound: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <Progress size='xs' isIndeterminate colorScheme='pink' />
            <Flex
                direction='column'
                justifyContent='center'
                alignItems="center"
                height={'100vh'}
                bgImage={'https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/communitiesBack.jpg'}
            >
                <Card >
                    <CardBody
                        border={'10px solid purple'}
                        borderRadius={'5px'}
                        color={'purple'}
                        _hover={{
                            border: '10px solid white',
                            bg: 'purple',
                            borderRadius: '5px',
                            color: 'white',
                            fontSize: '25px'
                        }}
                    >
                        <Text >The requested board doesn't exist. . . :(</Text>
                        <Button
                            mt={4}
                            onClick={() => { router.push('/') }}
                            _hover={{
                                color: 'purple',
                                bg: 'white',
                                fontSize: '15px'
                            }}
                        > Go Home</Button>
                    </CardBody>
                </Card>
            </Flex >
        </>
    )
}

export default CommunityNotFound;