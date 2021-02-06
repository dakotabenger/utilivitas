// import React, { useState,useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
// import * as sessionActions from "../../store/session";
// import { fetch } from '../../store/csrf';
// import {setUser} from '../../store/session'
// import { getRandomRecommendation } from "../../store/selectedUser";
//  function Feed() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const selectedUser = useSelector((state) => state.selectedUser.user)
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [warm_up_response,setWarmUpResponse] = useState("")
//   const [postText,setPostText] = useState("")
//   const history = useHistory()
//   const [commentText,setCommentText] = useState("")
// //   useEffect(() => {
// //     setIsLoaded(true)
// //   }, [dispatch]);
//   if (!sessionUser || !selectedUser) return <Redirect to="/login" />;

//   const handleCommentPost = async (e) => {
//     e.preventDefault()
//     const res = await fetch(`/api/comments/${sessionUser.Feeds[0].Posts[0].id }/${sessionUser.id}`, {
//       method: 'POST',
//       body: JSON.stringify({commentText})
//     });
//     await dispatch(setUser(res.data.userWithProfileData));
//   }


//  const handlePost = async (e) => {
//     e.preventDefault()
//     const res = await fetch(`/api/posts/${sessionUser.Feeds[0].id}/${sessionUser.id}`, {
//       method: 'POST',
//       body: JSON.stringify({postText})
//     });
//     console.log(res.data)
//     await dispatch(setUser(res.data.userWithProfileData));
//  }

//   return (
//       <>
//     {isLoaded && (
//     <div>
//         <div>
//         <h4>Create A Post On Your Public Feed:
//         </h4>
//         <br></br>
//         <textarea value={postText} onChange={(e)=>setPostText(e.target.value)}></textarea>
//         <br />
//         <button onClick={(e) => handlePost(e)}>Create A Post on your public feed.</button>
//         </div>
//         <div>
//             <h2 > Posts </h2> 
//             {sessionUser.Feeds[0].Posts.length > 10 ? sessionUser.Feeds[0].Posts.slice(-5).map((post) => {
//                 return (
//                 <div>
//                     <p>{post.User.username} - Posted At {post.createdAt}</p>
//                     <p>{post.postText}</p>
//                        {post.Comments.length > 0 ? post.Comments.slice(-2).map((comment) => (
//                        <div>
//                    <h5>{`${comment.username} - Posted At: ${comment.createdAt}`} </h5>
//                    <p>{comment.commentText}</p>
//                        </div>
//                            )) : "" }
                          
//                                <div>
//                                Post a comment:
//                                <br></br>
//                                <textarea type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
//                                <br></br>
//                                <button onClick={(e) => handleCommentPost(e,sessionUser.Feeds[0].Posts[0].id)} >Comment</button>
//                                </div>
//                                 <br />
//                        <span>{sessionUser.Feeds[0].Posts[0].Comments.length > 2 ? sessionUser.Feeds[0].Posts[0].Comments.length - 3 : `0` } More Comments</span>
                    
//                 )
//             }) :   : sessionUser.username}
//         </div>
//         </div>
//     )}
//     </>
    
//   );
// }

// export default Feed