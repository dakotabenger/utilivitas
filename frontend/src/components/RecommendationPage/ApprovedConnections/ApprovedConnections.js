import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import '../css/style.css'
import { fetch } from '../../../store/csrf';
import {setUser} from '../../../store/session'
import {getUser} from '../../../store/selectedUser'

function ApprovedConnections({sessionUser,isLoaded}) {
    const dispatch = useDispatch()
    const history = useHistory()
  

	const seeFeed = async (e,id) => {
		e.preventDefault()
		dispatch(getUser(id))

	} 

            return (
                <div>
                {!sessionUser.Network[0] ? "You don't have anyone in your network right now! Try expanding your network to see user feeds!" : (
                    <div class="row">
                    <dl class="col-sm-12">
					{sessionUser.Network.map((user) => {
						
						return ( <div class="row">
							
							<dt class="col-sm-4">
							User: <br ></br> 
							</dt><br />
							<dd className="col-sm-4">
							{user.User.username}
							</dd><br />
							<dd className="col-sm-4">
								 <a href="#" onClick={(e) => seeFeed(e, user.User.id)}>See feed</a>
							</dd>
						</div>

					)})}
                    </dl>
				</div>
					
                            
					
                               
                )}
                </div>
                                )
                                
                            }
                            
                            export default ApprovedConnections