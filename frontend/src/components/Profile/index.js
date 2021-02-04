import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

 function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  
  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
        <h1>{sessionUser.username.charAt(0).toUpperCase() + sessionUser.username.slice(1)}'s Profile</h1>
        <span>Age: {sessionUser.age} <br></br>Occupation: {sessionUser.occupation}</span>
        <div>
            <h2>Your Bio:</h2>
            <div>
                {sessionUser.bio}
            </div>
            <h2>What's important to you:</h2>
            <div>
            {sessionUser.Values[0].description}
            </div>
            <div><br></br>Your Values Tags: {sessionUser.Values.map((value,i) => {return (<div>Tag  {i+1})  {value.tag}  </div>)})}</div>
            <h2>Here's what you have to say about your interests:</h2>
            <div>
                {sessionUser.Interests[0].description}
            </div>
            <div><br></br>Your Interests Tags:{sessionUser.Interests.map((interest,i) => {return (<div>Tag  {i+1})  {interest.tag}  </div>)})}</div></div>
                
      
    </>
  );
}

export default Profile