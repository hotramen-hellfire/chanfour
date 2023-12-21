import { useRecoilState } from 'recoil';
import { Post, PostState, PostVote } from '../components/atoms/postsAtom';
import { authentication, firestore, storage } from '../firebase/clientApp';
import { deleteObject, ref } from 'firebase/storage';
import { collection, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const usePosts = () => {
    const [user] = useAuthState(authentication)
    var uid = "";
    if (user) { uid = user.email!.split(".")[0] }
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const onSelectPost = () => { }
    const onVote = async (post: Post, vote: number, communityID: string) => {


        try {
            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find((vote) => vote.postID === post.id)
            const batch = writeBatch(firestore)
            const updatedPost = { ...post }
            const updatedPosts = [...postStateValue.posts]
            let updatedPostVotes = [...postStateValue.postVotes]
            let voteChange = vote;
            if (!existingVote) {
                const postVoteRef = doc(collection(firestore, 'userByID/' + uid + '/votesByCommunity/' + communityID + '/', post.id));
                const newVote: PostVote = {
                    postID: post.id!,
                    voteValue: vote,
                };
                batch.set(postVoteRef, newVote)
                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [...updatedPostVotes, newVote];
            } else {
                const postVoteRef = doc(firestore, 'userByID/' + uid + '/votesByCommunity/' + communityID + '/', post.id);
                voteChange = -existingVote.voteValue + vote;
                updatedPost.voteStatus = voteStatus + voteChange;
                const voteIdx = postStateValue.postVotes.findIndex((vote) => vote.postID === existingVote.postID);
                updatedPostVotes[voteIdx] = {
                    ...existingVote,
                    voteValue: vote,
                }
                batch.update(postVoteRef, { voteValue: updatedPost.voteStatus });
            }
            const postRef = doc(firestore, 'posts', post.id!)
            batch.update(postRef, { voteStatus: updatedPost.voteStatus })
            await batch.commit();
            const postIdx = updatedPosts.findIndex((postObj) => postObj.id === post.id);
            updatedPosts[postIdx] = {
                ...post,
                voteStatus: updatedPost.voteStatus,
            }
            setPostStateValue(prev => ({
                ...prev,
                posts: updatedPosts,
                postVotes: updatedPostVotes
            }))

        } catch (error: any) {
            console.log('onVote error: ', error.message);
        }
    }
    const onDeletePost = async (post: Post): Promise<[boolean, string]> => {
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
            return [true, ""]
        } catch (error: any) {
            console.log("onDeletePost error: ", error.message)
            return [false, error.message];
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