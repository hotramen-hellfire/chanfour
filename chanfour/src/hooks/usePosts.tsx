import { collection, deleteDoc, doc, getDocs, increment, query, updateDoc, where, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '../components/Atoms/authModalAtom';
import { Community, communityState } from '../components/Atoms/communitiesAtom';
import { Post, PostState, PostVote } from '../components/Atoms/postsAtom';
import { authentication, firestore, storage } from '../firebase/clientApp';

const usePosts = () => {
    var uid = "";
    const [user] = useAuthState(authentication)
    const [hookLoad, setHookLoad] = useState(false);
    if (user) { uid = user.email! }
    const setAuthModalState = useSetRecoilState(authModalState);
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [postStateValue, setPostStateValue] = useRecoilState(PostState);
    const currentCommunity = useRecoilValue(communityState).currentCommunity;
    const onVote = async (post: Post, vote: number, communityID: string) => {
        setHookLoad(true);
        if (!uid) {
            setAuthModalState({
                view: 'login',
                open: true
            })
            setHookLoad(false);
            return;
        }
        try {
            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find((vote) => vote.postID === post.id)
            const batch = writeBatch(firestore)
            const updatedPost = { ...post }
            const updatedPosts = [...postStateValue.posts]
            let updatedPostVotes = [...postStateValue.postVotes]
            let voteChange = vote;
            if (!existingVote) {
                console.log("vote: ", vote);
                const postVoteRef = doc(collection(firestore, 'userByID/', uid + '/votesByUser/'), '/', post.id);
                const newVote: PostVote = {
                    postID: post.id!,
                    voteValue: vote,
                    communityID: communityID
                };
                batch.set(postVoteRef, newVote)
                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [newVote, ...updatedPostVotes];
                const postRef = doc(firestore, 'posts', post.id!)
                batch.update(postRef, { voteStatus: increment(vote), activity: increment(vote) })
                await batch.commit();
            } else {
                const postVoteRef = doc(firestore, 'userByID/', uid + '/votesByUser/' + post.id);
                voteChange = -existingVote.voteValue + vote;
                updatedPost.voteStatus = voteStatus + voteChange;
                const voteIdx = postStateValue.postVotes.findIndex((vote) => vote.postID === existingVote.postID);
                updatedPostVotes[voteIdx] = {
                    ...existingVote,
                    voteValue: vote,
                }
                batch.update(postVoteRef, { voteValue: vote });
                const postRef = doc(firestore, 'posts', post.id!)
                batch.update(postRef, { voteStatus: increment(voteChange), activity: increment(voteChange) })
                await batch.commit();
            }
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
            setHookLoad(false);
        } catch (error: any) {
            setHookLoad(false);
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
            const communityDocRef = doc(firestore, 'communities', post.communityID);
            await updateDoc(communityDocRef, { numberOfPosts: increment(-1) })
            let updatedCommunity = {
                ...communityStateValue.currentCommunity!,
                numberOfPosts: communityStateValue.currentCommunity!.numberOfPosts - 1
            };
            setCommunityStateValue(prev => ({
                ...prev,
                currentCommunity: updatedCommunity as Community
            }));
            return [true, ""]
        } catch (error: any) {
            console.log("onDeletePost error: ", error.message)
            return [false, error.message];
        }
    }

    useEffect(() => {
        const getCommunityPostVotes = async (communityID: string) => {
            try {
                const postVotesQuery = query(collection(firestore, "userByID", uid + '/votesByUser/'), where("communityID", '==', communityID));
                const postVoteDocs = await getDocs(postVotesQuery);
                const postVotes = postVoteDocs.docs.map((doc) => ({
                    ...doc.data()
                }));
                setPostStateValue(prev => ({
                    ...prev,
                    postVotes: postVotes as PostVote[]
                }))
                console.log("postVotes: ", postVotes);
            } catch (error: any) {
                console.log("getCommunityPostVotes error: ", error.message)
            }
        }
        if (currentCommunity && user) getCommunityPostVotes(currentCommunity.communityID);
    }, [user, currentCommunity])

    useEffect(() => {
        if (!user) {
            setPostStateValue((prev) => ({
                ...prev,
                postVotes: [],
            }))
        }
    }, [user])

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onDeletePost,
        hookLoad
    }
}
export default usePosts;