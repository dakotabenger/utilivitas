import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './css/style.css'
import RequestProfile from './RequestProfile/RequestProfile'
import { fetch } from '../../store/csrf';
import {setUser} from '../../store/session'
import { getRandomRecommendation,getUser } from "../../store/selectedUser";
import { set } from "js-cookie";
import NetworkRequest from './NetworkRequests/NetworkRequests'
import { NavLink } from 'react-router-dom';
import ApprovedConnections from './ApprovedConnections/ApprovedConnections'
import App from "../../App";
 function RecommendationPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const selectedUser = useSelector((state) => state.selectedUser.user)
  const [isLoaded, setIsLoaded] = useState(false);
  const [warm_up_response,setWarmUpResponse] = useState("")
  const [postText,setPostText] = useState("")
  const history = useHistory()
  const [commentText,setCommentText] = useState("")
  const [recommendationClick,setRecommendationClick] = useState(false)
  const [requestClick,setRequestClick] = useState(false)
  const [approvedClick,setApprovedClick] = useState(false)
  const [feedsClick,setFeedsClick] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [dispatch]);
  if (!sessionUser || !selectedUser) return <Redirect to="/" />

  const handleCommentPost = async (e,id) => {
    setIsLoaded(true)
    e.preventDefault()
    const res = await fetch(`/api/comments/${id}/${sessionUser.id}`, {
      method: 'POST',
      body: JSON.stringify({commentText})
    });
    dispatch(setUser(res.data.userWithProfileData));
    dispatch(getUser(selectedUser.id))
  }
  const getRecommendation = async (e) => {
      setIsLoaded(true)
      e.preventDefault()
      dispatch(getRandomRecommendation(sessionUser.id))
  }
  
  const handleMyFeedClick = async (e) => {  
    e.preventDefault()
    dispatch(getUser(sessionUser.id))
    setRecommendationClick(false)
  }
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
 const handlePost = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/posts/${selectedUser.Feeds[0].id}/${sessionUser.id}`, {
      method: 'POST',
      body: JSON.stringify({postText})
    });
    console.log(res.data)
     dispatch(setUser(res.data.userWithProfileData));
     dispatch(getUser(selectedUser.id))
     
 }

 const clickedUsername = async (e,userId) => {
     e.preventDefault()
     dispatch(getUser(userId))
     setFeedsClick(false)
     setApprovedClick(false)
     setRequestClick(false)
     setRecommendationClick(true)
 }
  return (
      <>
    {isLoaded && (
      <>
      <div className="container-fluid">
	<div className="row content-container">
    
		<div className="col-md-7 feed-div">
			<h2 className="text-center card-header">
            {selectedUser.username === sessionUser.username ? "Your Public Feed" : `${selectedUser.username}'s Public Feed`}			</h2>

  <div class="card-body">
            <h3 className="text-center">
                Create A Post On {selectedUser.username === sessionUser.username ? "Your" : `${selectedUser.username}'s`} Public feed
            </h3>
            <div class="row">
                <div class="col-sm-1"></div>
                     <div class="form-group col-sm-10 post-text-area">
        

                <textarea class="form-control  post-text-area" rows="8"value={postText} onChange={(e)=>setPostText(e.target.value)}></textarea>
                
            </div>
                    <div class="col-sm-1"></div>
            {/* <div class="col-sm-1"></div> */}
            </div>
				
			<div class="row card-footer">
                <div class="col-sm-5">
                </div>

                    <button class="btn btn-primary col-sm-2 create-post-button" onClick={(e) => handlePost(e)}>
                         Create Post.
                    </button>
                <div class="col-sm-5"></div>
            </div>
			</div>	
				
 {/* ____________________________________       POSTS COMMENTS AND POSTING COMMENTS IN HERE__________________________________________________ */}
 {/* <h5>{sessionUser.Feeds[0].Posts.length > 0 ? `${sessionUser.Feeds[0].Posts[0].User.username} - Posted At: ${sessionUser.Feeds[0].Posts[0].createdAt}` : sessionUser.username}</h5>
             <p>{sessionUser.Feeds[0].Posts[0] ? sessionUser.Feeds[0].Posts[0].postText : "" }</p>
                {sessionUser.Feeds[0].Posts[0].Comments.length > 0 ? sessionUser.Feeds[0].Posts[0].Comments.slice(-3).map((comment) => (
                <div>
            <h5>{`${comment.username} - Posted At: ${comment.createdAt}`} </h5>
            <p>{comment.commentText}</p>
                </div>
                    )) : "" }
                    {sessionUser.Feeds[0].Posts.length > 0 && (
                    <div>
                        <div>
                        Post a comment:
                        <br></br>
                        <textarea type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                        <br></br>
                        <button onClick={(e) => handleCommentPost(e,sessionUser.Feeds[0].Posts[0].id)} >Comment</button>
                        </div>
                    </div>
                    )}
                <br />
                <span>{sessionUser.Feeds[0].Posts[0].Comments.length > 2 ? sessionUser.Feeds[0].Posts[0].Comments.length - 3 : `0` } More Comments</span> */}
                {selectedUser.Feeds[0].Posts.length < 0 ? `` : selectedUser.Feeds[0].Posts.slice(-10).map((post) => {
                    return (
            <div class="card">
				<h5 class="card-header">
                <a onClick={(e) => clickedUsername(e,post.User.id)}>{post.User.username.charAt(0).toUpperCase() + post.User.username.slice(1)} - Posted At: {post.createdAt}</a>
                </h5>
				<div class="card-body">
					<p class="card-text post-text">
						{post.postText}
					</p>
				</div>
				<div class="card-footer">
					{post.Comments.length < 0 ? "Be the first to leave a comment on this post" : post.Comments.map((comment) => {
                        return (
                            <>
                            <p><a onClick={(e) => clickedUsername(e,comment.User.id)}>{comment.User.username} at {comment.createdAt}</a> - </p> <em>{comment.commentText}</em> 
                        </>
                        )
                    })}
				</div>
                    <div class="card-footer post-comment-div">
                    <h5>Post A Comment:</h5>
                    <textarea class="post-comment-form" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                    <button class="btn btn-success btn btn-md post-comment-button" onClick={(e) => handleCommentPost(e,post.id)} >Comment</button>

                    </div>
			</div>
                    )
                }) }
			
			</div>
            
                    <div class="col-sm-5 right-side-container">
			<div class="row">
				<div class="col-sm-12"> 
                <nav class="nav-bar">
						<ol class="breadcrumb">
							<li onClick={(e) => {setRecommendationClick(false);setRequestClick(false);setFeedsClick(true);}} class="breadcrumb-item">
								<a href="#">Approved Connections</a>
							</li>
							<li onClick={(e) => {setRecommendationClick(false);setRequestClick(true);setFeedsClick(false);}} class="breadcrumb-item active">
								<a href="#">Network Requests</a>
							</li>
                            <li onClick={(e) => {setRecommendationClick(true);setRequestClick(false);setFeedsClick(false);getRecommendation(e)}}class="breadcrumb-item">
                               <a href="#"> Get Recommendation </a>
                            </li>
                            <li onClick={(e) => {handleMyFeedClick(e)}} class="breadcrumb-item">
                                <a href="#">Your Feed</a>
                            </li >
                            {sessionUser && (
                                <li onClick={(e) => {logout(e)}}class="breadcrumb-item">
                                    <a href="#">Logout</a>
                                </li>
                            )}
                            {!sessionUser && (
                            <li class="breadcrumb-item">
                            <NavLink to="/signup">Sign Up</NavLink>
                            </li>
                            )}
                            {!sessionUser && (
                            <li class="breadcrumb-item">
                            <NavLink to="/login">Login</NavLink>
                            </li>
                            )}

						</ol>
					</nav>
  </div>
  </div>
                                {recommendationClick && (<RequestProfile  getRecommendation={getRecommendation} selectedUser={selectedUser} sessionUser={sessionUser} isLoaded={isLoaded}/>)}
                                {requestClick && (<NetworkRequest sessionUser={sessionUser} isLoaded={isLoaded} />)}
                                {feedsClick && (<ApprovedConnections sessionUser={sessionUser} isLoaded={isLoaded} /> )}
                    
                    </div>
  </div>
	</div>
    </>




    

    )}
    )</>)}
    
            

export default RecommendationPage