import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { fetch } from '../../store/csrf';
import {setUser} from '../../store/session'
import { getRandomRecommendation } from "../../store/selectedUser";

 function Feed() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const selectedUser = useSelector((state) => state.selectedUser.user)
  const [isLoaded, setIsLoaded] = useState(false);
  const [postText,setPostText] = useState("")
  const [commentText,setCommentText] = useState("")
  const [posts,setPosts] = useState(selectedUser.Feed.Posts.length > 0 ? selectedUser.Feed.Posts : [])
  const history = useHistory()
  useEffect(() => {
    setIsLoaded(true)
  }, [dispatch]);
  if (!sessionUser || !selectedUser) return <Redirect to="/login" />;


  const handleComment = async (e) => {
      e.preventDefault()
      const res = await fetch(`/api/comments/${sessionUser.Feeds[0].id}/${selectedUser.id}`, {
        method: 'POST',
        body: JSON.stringify({ commentText})
      });
      console.log(res.data)
      await dispatch(setUser(res.data.userWithProfileData));
      history.go(0)
    }

 const handlePost = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/posts/${sessionUser.Feeds[0].id}/${sessionUser.id}`, {
      method: 'POST',
      body: JSON.stringify({postText})
    });
    console.log(res.data)
    await dispatch(setUser(res.data.userWithProfileData));
 }

  return (
      <>
    {isLoaded && (

    <>

   </> 
    )}
    <div>
        <h4>Fill Out A New Post On This Feed</h4>
        <label>
            Post Text:
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)}></textarea>
            <button onClick={handlePost}>Submit Post</button>
        </label>
    </div>
    </>
   
    
  );
}

export default RecommendationPage