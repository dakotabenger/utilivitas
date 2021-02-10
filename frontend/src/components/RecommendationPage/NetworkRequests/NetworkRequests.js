import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import '../css/style.css'
import { fetch } from '../../../store/csrf';
import {setUser} from '../../../store/session'


function NetworkRequest({sessionUser,isLoaded}) {
    const [warm_up_response,setWarmUpResponse] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
  

      const handleConnection = async (e,approvedStatus) => {
        e.preventDefault()
        const res = await fetch(`/api/connections/act/${sessionUser.Requests[0].id}`, {
          method: 'POST',
          body: JSON.stringify({approvedStatus})
        });
        console.log(res.data)
        await dispatch(setUser(res.data.userWithProfileData));
        history.go(0)
      }


            return (
                <div>
                {!sessionUser.Requests[0] ? "No Requests Right Now" : (
                    <div class="row">
                    
                    <dl class="col-sm-12">
                    <dt>
                    {sessionUser.Requests[0].User.username} wants to be in your network.
                    </dt>
                    <dd>
                    Here are some details about them to help you decide if they are a good fit:
                    </dd>
                    <dt>
                    Bio:
                    </dt>
                    <dd>
                    {sessionUser.Requests[0].User.bio}
                    </dd>
                    <dt>
                    Age:
                        </dt>
                        <dd>
                        {sessionUser.Requests[0].User.age}
                        </dd>
                        <dt>
                        Occupation:
                        </dt>
                        <dd>
                        {sessionUser.Requests[0].User.occupation}
                        </dd>
                            <dt>
                            User's Warm Up Question: {sessionUser.Requests[0].User.warm_up_question}
                            </dt>
                            <dt>
                                 <a href="#">See Full Profile</a>
                            </dt>
                            </dl>
					
                            
					
                    <div class="row">
                    <div class="col-sm-1"></div>
                    <button  onClick={(e) => handleConnection(e,false)} class="col-sm-4 btn btn-success btn-sm">
								Deny Request
                                </button>
                                <div class="col-sm-1"></div>
                                <button class="col-sm-4 btn btn-success  btn-sm" onClick={(e) => handleConnection(e,true)}>
                                Accept Request
                                </button>
                                <div class="col-sm-1"></div>
                                </div>
                                </div>
                                
                )}
                </div>
                                )
                                
                            }
                            
                            export default NetworkRequest