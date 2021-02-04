import { fetch } from './csrf.js';
import * as selectedUserActions from './selectedUser'
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const login = ({ credential, password }) => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  await dispatch(setUser(res.data.user))
  await dispatch(selectedUserActions.getRandomRecommendation(res.data.user.id))
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch('/api/session');
  await dispatch(setUser(res.data.user));
  await dispatch(selectedUserActions.getRandomRecommendation(res.data.user.id))
  return res;
};

export const signup = (user) => async (dispatch) => {
  // console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
  const { username, email, password,age,bio,valueTags,interestTags,valueDescription,interestDescription,occupation,warm_up_question,
    photoUrl} = user;
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      age,
      bio,
      valueTags,
      interestTags,
      valueDescription,
      interestDescription,
      occupation,
      warm_up_question,
      photoUrl
    })
  });
  // console.log(response)
  await dispatch(selectedUserActions.getRandomRecommendation(response.data.userWithProfileData.id))
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
