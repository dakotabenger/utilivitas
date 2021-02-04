import { fetch } from './csrf.js';

const SET_USER = 'selectedUser/setUser';

const setThisUser = (user) => ({
  type: SET_USER,
  payload: user
});


export const getRandomRecommendation = (userId) => async (dispatch) => {
    const res = await fetch(`/api/recommendations/${userId}`);
    await dispatch(setThisUser(res.data.matchingUser));
    return res;
  };

  export const getUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);
    await dispatch(setThisUser(res.data.userWithProfileData));
    return res;
  }





const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    default:
      return state;
  }
}

export default reducer;
