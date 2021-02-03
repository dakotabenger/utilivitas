import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { WithOutContext as ReactTags } from 'react-tag-input';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [age, setAge] = useState(""); 
  const [valueTags,setValueTags] = useState([])
  const [interestTags,setInterestTags] = useState([])
  const [valueDescription,setValueDescription] = useState("")
  const [interestDescription,setInterestDescription] = useState("")
  const [occupation,setOccupation] = useState("")
  const [warm_up_question,setWarmUpQuestion] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [valueSuggestions,setValueSuggestions] = useState([
    { id: 'USA', text: 'USA' },
    { id: 'Germany', text: 'Germany' },
    { id: 'Austria', text: 'Austria' },
    { id: 'Costa Rica', text: 'Costa Rica' },
    { id: 'Sri Lanka', text: 'Sri Lanka' },
    { id: 'Thailand', text: 'Thailand' }
 ])
 const [interestSuggestions,setInterestSuggestions] = useState([
  { id: 'USA', text: 'USA' },
  { id: 'Germany', text: 'Germany' },
  { id: 'Austria', text: 'Austria' },
  { id: 'Costa Rica', text: 'Costa Rica' },
  { id: 'Sri Lanka', text: 'Sri Lanka' },
  { id: 'Thailand', text: 'Thailand' }
])
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      if (!isNaN(age)) {
      return dispatch(sessionActions.signup({ email, username, password,age,bio,valueTags,interestTags,
        valueDescription,interestDescription,occupation,warm_up_question,
        photoUrl }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    } else {
      return setErrors(['Age Field Must Be A Number'])
    }
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  function handleInterestDelete(i) {
    setInterestTags(interestTags.filter((tag, index) => index !== i))
    };

    
  function handleValueDelete(i) {
    setValueTags(valueTags.filter((tag, index) => index !== i))
    };
   function handleInterestAddition(tag) {
      setInterestTags([...interestTags, tag]);
  }

  function handleValueAddition(tag) {
    setValueTags([...valueTags, tag]);
}


function handleValueDrag(tag, currPos, newPos) {
  const newTags = valueTags.slice();

  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);

  // re-render
  setValueTags(newTags)
}

function handleInterestDrag(tag, currPos, newPos) {
  const newTags = interestTags.slice();

  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);

  // re-render
  setInterestTags(newTags)
}
  return (
    <>
    
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          Age:
          <input type="text" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
        </label>
        <label>
          Tell us about some of your interests and what gets you up in the morning?
          <textarea value={interestDescription} onChange={(e) => setInterestDescription(e.target.value)} />
          </label>
          <label>
            Interest Tags(Usa a Comma or Press Enter to Seperate Tags):
          <ReactTags tags={interestTags}
                    suggestions={interestSuggestions}
                    handleDelete={handleInterestDelete}
                    handleAddition={handleInterestAddition}
                    handleDrag={handleInterestDrag}
                    delimiters={delimiters} />
        </label>
        <label>
          What matters to you? Here is where you let users know about your values:
          <textarea value={valueDescription} onChange={(e) => setValueDescription(e.target.value)} />
          </label>
          <label>
            Values Tags (Use a Comma or Press Enter to Seperate Tags):
          <ReactTags tags={valueTags}
                    suggestions={valueSuggestions}
                    handleDelete={handleValueDelete}
                    handleAddition={handleValueAddition}
                    handleDrag={handleValueDrag}
                    delimiters={delimiters} />

        </label>
        <label>
          Occupation: 
          <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
        </label>
        <label>
          Enter the URL of a Photo to use on your profile:
          <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <label>
          Finally, come up with a question that users can answer to help you decide if you want them in you're network:
          <textarea value={warm_up_question} onChange={(e) => setWarmUpQuestion(e.target.value)} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
