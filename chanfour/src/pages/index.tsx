import { Stack, Text } from "@chakra-ui/react";
import { collection, doc, getCountFromServer, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bgState } from "../components/Atoms/bgAtom";
import { firestore } from "../firebase/clientApp";
import Originalboards from "./homePage/Originalboards";
import Stats from "./homePage/Stats";
import TopBoards from "./homePage/TopBoardsPosts";
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
      const metaDoc = doc(firestore, 'meta', 'metadata')
      await updateDoc(metaDoc, { visitors: increment(1) })
      var coll = collection(firestore, 'userByID');
      var snapshot = await getCountFromServer(coll);
      setNumUsers(snapshot.data().count);
      var coll = collection(firestore, 'communities');
      var snapshot = await getCountFromServer(coll);
      setNumBoards(snapshot.data().count);
      var coll = collection(firestore, 'posts');
      var snapshot = await getCountFromServer(coll);
      setNumPosts(snapshot.data().count);
      const docRef = doc(firestore, 'meta', 'metadata')
      const document = await getDoc(docRef);
      const value = { ...document.data() }
      setNumVisits(value['visitors'])
      setStatsLoading(false)
    }
    fetchStats();
  }, [])


  return (
    <>
      <Text
        color={'white'}
      >
        <br />fix loading?
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
