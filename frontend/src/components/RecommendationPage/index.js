import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { fetch } from '../../store/csrf';
import {setUser} from '../../store/session'
import { getRandomRecommendation } from "../../store/selectedUser";
 function RecommendationPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const selectedUser = useSelector((state) => state.selectedUser.user)
  const [isLoaded, setIsLoaded] = useState(false);
  const [warm_up_response,setWarmUpResponse] = useState("")
  const [postText,setPostText] = useState("")
  const history = useHistory()
//   useEffect(() => {
//     setIsLoaded(true)
//   }, [dispatch]);
  if (!sessionUser || !selectedUser) return <Redirect to="/login" />;

  const getRecommendation = async (e) => {
      e.preventDefault()
      setIsLoaded(true)
  }
  const handleConnection = async (e) => {
      e.preventDefault()
      const res = await fetch(`/api/connections/${sessionUser.id}/${selectedUser.id}`, {
        method: 'POST',
        body: JSON.stringify({ warm_up_response})
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
        <h1>{selectedUser.username.charAt(0).toUpperCase() + selectedUser.username.slice(1)}'s Profile</h1>
        <span>Age: {selectedUser.age} <br></br>Occupation: {selectedUser.occupation}</span>
        <div>
            <h2>Their Bio:</h2>
            <div>
                {selectedUser.bio}
            </div>
            <h2>What's important to them:</h2>
            <div>
            {selectedUser.Values[0].description}
            </div>
            <div><br></br>Their Values Tags: {selectedUser.Values.map((value,i) => {return (<div>Tag  {i+1})  {value.tag}  </div>)})}</div>
            <h2>Here's what they have to say about their interests:</h2>
            <div>
                {selectedUser.Interests[0].description}
            </div>
            <div><br></br>Their Interests Tags:{selectedUser.Interests.map((interest,i) => {return (<div>Tag  {i+1})  {interest.tag}  </div>)})}</div></div>
            <div>
            <span>Send them a network request by answering their Warm Up Question:</span>
            <textarea value={warm_up_response} onChange={(e) => setWarmUpResponse(e.target.value)} />
            <button onClick={(e) => handleConnection(e)} >Send Request</button>
            </div>
            </>
    )}
    <button onClick={(e) => getRecommendation(e)}>Get Recommendation</button>
    <div>
        <label>Create A Post On Your Public Feed:
        <textarea value={postText} onChange={(e)=>setPostText(e.target.value)}></textarea>
        <button onClick={(e) => handlePost(e)}>Post Comment</button>
        </label>
    </div>
    </>
    
  );
}

export default RecommendationPage