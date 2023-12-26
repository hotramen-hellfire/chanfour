import { useRecoilState } from "recoil"
import { bgState } from "../components/Atoms/bgAtom";
import { useEffect } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import Stats from "./homePage/Stats";
import Originalboards from "./homePage/Originalboards";
export default function Home() {
  const [bgLink, setBGLink] = useRecoilState(bgState);
  const photos = [
    "https://wallpapercave.com/wp/wp8382258.jpg",
    "https://wallpapercave.com/wp/wp8988329.jpg",
    "https://wallpapercave.com/wp/wp9040375.jpg",
    "https://wallpapercave.com/wp/wp5430510.jpg",
    "https://wallpapercave.com/wp/wp9514970.jpg",
    "https://wallpapercave.com/dwp2x/wp12753708.jpg",
    "https://wallpapercave.com/dwp2x/wp7568574.jpg"

  ]
  useEffect(() => {
    setBGLink(photos[Math.floor(Math.random() * photos.length)]);
  }, [])
  return (
    <>
      <Text
        color={'white'}
      >
        implement pageranks
        <br />implement anchors to get to specific posts
      </Text>
      <Stack
        width={'100%'}
        // border={'2px solid yellow'}
        justify={'center'}
        align={'center'}
      // flexDirection={'column'}
      >
        <Originalboards />
        <Stats />
      </Stack>

    </>
  )
}
