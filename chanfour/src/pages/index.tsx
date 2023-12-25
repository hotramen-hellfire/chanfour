import { useRecoilState } from "recoil"
import { bgState } from "../components/Atoms/bgAtom";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
export default function Home() {
  const [bgLink, setBGLink] = useRecoilState(bgState);
  useEffect(() => {
    setBGLink("https://wallpaperaccess.com/full/856732.jpg");
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
