import { useRecoilState } from 'recoil';
import { Post, PostState } from '../components/atoms/postsAtom';
import { firestore, storage } from '../firebase/clientApp';
import { deleteObject, ref } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const onVote = async () => { }
    const onSelectPost = () => { }
    const onDeletePost = async (post: Post): Promise<boolean> => {
        //check image
        //check postDoc
        //update recoil state
        try {
            if (post.imageURL) {
                const imageRef = ref(storage, 'posts/' + post.id + '/image');
                await deleteObject(imageRef);
            }

            const postDocRef = doc(firestore, 'posts', post.id);
            await deleteDoc(postDocRef);
            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter((item) => item.id !== post.id)
            }))
            return true;
        } catch (error: any) {
            console.log("onDeletePost error: ", error.message)
            return false;
        }
    }
    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;