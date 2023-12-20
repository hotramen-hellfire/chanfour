import { useRecoilState } from 'recoil';
import { PostState } from '../components/atoms/postsAtom';

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const onVote = async () => { }
    const onSelectPost = () => { }
    const onDeletePost = async () => { return true; }
    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;