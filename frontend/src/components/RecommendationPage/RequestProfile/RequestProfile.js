import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import '../css/style.css'
import NetworkRequest from '../NetworkRequests/NetworkRequests'

import { fetch } from '../../../store/csrf';
import {setUser} from '../../../store/session'


function RequestProfile({getRecommendation,selectedUser,sessionUser,isLoaded}) {
    const [warm_up_response,setWarmUpResponse] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
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


            return (
                <div class="row ">
                    <dl class="col-lg-12">
						<dt>
                            {selectedUser.username} might be a good fit for your network
                        </dt>
						<dd>
							Here are some details about them to help you decide.
                        </dd>
                        <dt>
                            Bio: 
                            <br></br>
                            <br></br><br></br>
                        </dt>
                        <dd>
                            {selectedUser.bio}
                        </dd><br></br><br></br>
                        <dt>
                            Age:
                        </dt>
                            <br></br>
                        <dd>
                            {selectedUser.age}
                        </dd><br></br>
                        <dt>
                            Occupation:
                        </dt><br></br><br></br>
                        <dd>
                        {selectedUser.occupation}
                        </dd><br></br><br></br>
						<dt>
							Interests:
						</dt><br></br><br></br>
                        <dd>
                        {selectedUser.username} has this to say about their interests: <br></br>
                        <br></br>{selectedUser.Interests[0].description}
                        </dd><br></br><br></br>
                        <dd>
                        These are the interests tags this user signed up with:
                        <br></br><br></br>
                        {selectedUser.Interests.map((interest) => {
                            console.log(interest)
                            return (
                                <>
                            <span>
                                {interest.tag + ",  "}
                                </span>                                 
                                </>
                                )
                            })}
                        </dd>
                        <dt><br></br><br></br>
							Values:
						</dt><br></br><br></br>
                        <dd>
                        {selectedUser.username} has this to say about their values: <br></br>
                        <br></br>{selectedUser.Values[0].description}
                        </dd><br></br><br></br>
                        <dd>
                        These are the value tags this user signed up with:<br /><br></br>
                        {selectedUser.Values.map((value) => {
                            return (
                                <>
                                <span>
                                {value.tag + ",  "} 
                                </span>                             
                                </>
                                )
                            })}
                        </dd>
                        <dt><br></br>
                            User's Warm Up Question: {selectedUser.warm_up_question}
                        </dt><br></br>
                    </dl>
					
						
					<div class="row">
						<div class="col-md-12">
                        <div class="form-group post-text-area">
        

        <textarea class="form-control  post-text-area" rows="8"value={warm_up_response} onChange={(e)=>setWarmUpResponse(e.target.value)}></textarea>
        
    </div>
						<div class="row">
                            <div class="col-sm-1"></div>
							<button  onClick={(e) => handleConnection(e)} class="col-sm-4 btn btn-success btn-sm">
								Send Request
							</button>
                            <div class="col-sm-1"></div>
                            <button class="col-sm-4 btn btn-success  btn-sm" onClick={(e) => getRecommendation(e,sessionUser)}>
                                {isLoaded ? "Try Another" : "See a similar profile:"  }
                            </button>
                            <div class="col-sm-1"></div>
						</div>
						</div>
					</div>
				</div>
            )
         
        }

        export default RequestProfile