import { Button, Card, CardBody, Flex, Link, Progress, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
const CommunityNotFound: React.FC = () => {
    var communitypage = "loading. . .";
    const { asPath } = useRouter();
    if (asPath) communitypage = '/r/' + asPath.split('/')[2];
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
                        <Text >Please submit through community page :(</Text>
                        <Link href={communitypage}>
                            <Button
                                mt={4}
                                _hover={{
                                    color: 'purple',
                                    bg: 'white',
                                    fontSize: '15px'
                                }}
                            > Go To Community Page</Button>
                        </Link>
                    </CardBody>
                </Card>
            </Flex >
        </>
    )
}

export default CommunityNotFound;