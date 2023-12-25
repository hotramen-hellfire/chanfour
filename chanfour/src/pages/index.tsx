import { useRecoilState } from "recoil"
import { bgState } from "../components/Atoms/bgAtom";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
export default function Home() {
  const [bgLink, setBGLink] = useRecoilState(bgState);
  const photos = [
    "https://wallpapercave.com/wp/wp8382258.jpg",
    "https://wallpapercave.com/wp/wp8595392.jpg",
    "https://wallpapercave.com/wp/wp8988329.jpg",
    "https://wallpapercave.com/wp/wp9040375.jpg",
    "https://wallpapercave.com/wp/wp5430510.jpg",
    "https://wallpapercave.com/wp/wp5108937.jpg",
    "https://wallpapercave.com/wp/wp9514970.jpg",
    "https://wallpapercave.com/dwp2x/wp12753708.jpg",
    "https://wallpapercave.com/dwp2x/wp10874361.jpg",
    "https://wallpapercave.com/dwp2x/wp2847270.jpg",
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
    </>
  )
}
