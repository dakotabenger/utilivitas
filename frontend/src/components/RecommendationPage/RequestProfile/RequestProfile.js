import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import '../css/style.css'

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
						<dt className="details-header-intro">
                            {selectedUser.username} might be a good fit for your network <br></br>
                            <img className="profile_picture" src={selectedUser.photoUrl}></img>
                        </dt>
						<dd className="details-sub">
							Here are some details about them to help you decide.
                        </dd>
                        <dt className="details-header">
                            Biography: 
                        </dt>
                        <dd className="details">
                            {selectedUser.bio}
                        </dd>
                        <dt className="details-header">
                            Age: <span className="details-age">{selectedUser.age}</span>
                        </dt>
                        <dt className="details-header">
                            Occupation: <span className="details-age">
                        {selectedUser.occupation}
                        </span>
                        </dt>
                        
						<dt className="details-header">
							Interests:
						</dt>
                        <dd className="details-description-intro">
                        {selectedUser.username} has this to say about their interests: <br></br><p className="details-description">{selectedUser.Interests[0].description}</p>
                        </dd>
                        <dd className="details-description-intro">
                        These are their interests tags:
                        <br></br>
                        {selectedUser.Interests.map((interest) => {
                            console.log(interest)
                            return (
                                <>
                            <span className="detail-tags">
                                {interest.tag + " "}
                                </span>
                                <br></br>                              
                                </>
                                )
                            })}
                        </dd>
                        <dt className="details-header">
                            Values:
						</dt>
                        <dd className="details-description-intro">
                        {selectedUser.username} has this to say about their values: 
                        <br></br><p className="details-description">{selectedUser.Values[0].description}</p>
                        </dd>
                        <dd className="details-description-intro">
                        These are the value tags this user signed up with:<br></br>
                        {selectedUser.Values.map((value) => {
                            return (
                                <>
                                <span className="detail-tags">
                                {value.tag + " "} 
                                </span><br></br>                             
                                </>
                                )
                            })}
                        </dd>
                        <dt className="details-header-warm_up"><br></br>
                            User's Warm Up Question: <br></br><p className="details-warm_up_question">{selectedUser.warm_up_question}</p>
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