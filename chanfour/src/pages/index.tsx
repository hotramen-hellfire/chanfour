import { useRecoilState } from "recoil"
import { bgState } from "../components/Atoms/bgAtom";
import { useEffect, useState } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import Stats from "./homePage/Stats";
import Originalboards from "./homePage/Originalboards";
import TopBoards from "./homePage/TopBoards";
import { collection, getCountFromServer } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
export default function Home() {
  const [numUsers, setNumUsers] = useState(0);
  const [numPosts, setNumPosts] = useState(0);
  const [numBoards, setNumBoards] = useState(0);
  const [numVisits, setNumVisits] = useState(0);
  const [statsLoading, setStatsLoading] = useState(false);
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
    const fetchStats = async () => {
      setStatsLoading(true)
      var coll = collection(firestore, 'userByID');
      var snapshot = await getCountFromServer(coll);
      setNumUsers(snapshot.data().count);
      var coll = collection(firestore, 'communities');
      var snapshot = await getCountFromServer(coll);
      setNumBoards(snapshot.data().count);
      var coll = collection(firestore, 'posts');
      var snapshot = await getCountFromServer(coll);
      setNumPosts(snapshot.data().count);
      setStatsLoading(false)
    }
    fetchStats();
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
        <TopBoards />
        <Originalboards />
        <Stats loading={statsLoading} numBoards={numBoards} numPosts={numPosts} numUsers={numUsers} numVisits={numVisits} />
      </Stack>

    </>
  )
}
