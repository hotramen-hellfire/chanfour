import { Stack } from "@chakra-ui/react";
import { collection, doc, getCountFromServer, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bgState } from "../components/Atoms/bgAtom";
import { firestore } from "../firebase/clientApp";
import AllBoards from "./homePage/AllBoards";
import Originalboards from "./homePage/Originalboards";
import Stats from "./homePage/Stats";
import TopBoards from "./homePage/TopBoardsPosts";
import AboutSite from "./homePage/AboutSite";
export default function Home() {
  const [numUsers, setNumUsers] = useState(0);
  const [numPosts, setNumPosts] = useState(0);
  const [numBoards, setNumBoards] = useState(0);
  const [numVisits, setNumVisits] = useState(0);
  const [communities, setCommunities] = useState("");
  const [statsLoading, setStatsLoading] = useState(false);
  const [indexes, setIndexes] = useState("")
  const [bgLink, setBGLink] = useRecoilState(bgState);
  const photos = [
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b1.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b2.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b3.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b4.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b5.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b6.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b7.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b8.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b9.jpg",
    "https://raw.githubusercontent.com/hotramen-hellfire/chanfour/main/imagebank/b10.jpg",
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
      if (value['communities']) {
        setCommunities((value['communities'] as string));
      }
      if (value['indexes']) {
        setIndexes((value['indexes'] as string));
      }
      setStatsLoading(false)
    }
    fetchStats();
  }, [])


  return (
    <>
      <Stack
        mt={10}
        width={'100%'}
        justify={'center'}
        align={'center'}
      >
        <AboutSite />
        <TopBoards />
        <Originalboards indexes={indexes} setIndexes={setIndexes} />
        <AllBoards communitiesString={communities} />
        <Stats loading={statsLoading} numBoards={numBoards} numPosts={numPosts} numUsers={numUsers} numVisits={numVisits} />
      </Stack>
    </>
  )
}
