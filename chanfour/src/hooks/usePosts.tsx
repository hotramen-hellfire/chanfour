import { useRecoilState } from 'recoil';
import { PostState } from '../components/atoms/postsAtom';

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const onVote = async () => { }
    const onSelectPost = async () => { }
    const onDeletePost = async () => { }
    return {
        postStateValue,
        setPostStateValue
    }
}
export default usePosts;