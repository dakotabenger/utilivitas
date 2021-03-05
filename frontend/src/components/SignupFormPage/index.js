import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
// import { WithOutContext as ReactTags } from 'react-tag-input';

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
  const history = useHistory()
  const [photoUrl, setPhotoUrl] = useState("")
  const [valueSuggestions,setValueSuggestions] = useState([
    { id: 'genorsity', text: 'Genorsity' },
    { id: 'loyalty', text: 'Loyalty' },
    { id: 'family', text: 'Family' },
    { id: 'friends', text: 'Friends' },
    { id: 'honesty', text: 'Honesty' },
    { id: 'respect', text: 'Respect' }
 ])
 const [interestSuggestions,setInterestSuggestions] = useState([
  { id: 'programming', text: 'Programming' },
  { id: 'diy', text: 'DIY' },
  { id: 'movies', text: 'Movies' },
  { id: 'TV', text: 'TV' },
  { id: 'Sports', text: 'Sports' },
  { id: 'politics', text: 'Politics' }
])
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      if (!isNaN(age)) {
      return dispatch(sessionActions.signup({ email, username, password,age,bio,valueTags,interestTags,
        valueDescription,interestDescription,occupation,warm_up_question,
        photoUrl })).then((res) => {
          history.push("/home")
        })
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
    <div className="row">
    <div className="col-sm-4"></div>
    <div className="col-sm-4 form-container">
      <div className="row">
        <div className="col-sm-1 form-margin"></div>
        <div className="col-lg-10 actual-form-container">
      <h1 className="sign-up-h2">Sign up to start creating your network!</h1>
      <h2 className="existing-account-header">Already Have An Account? <NavLink to="/">Click Here</NavLink></h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      <div className="form-group">
        <label className="email-label">
          Email:
          <input className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br></br>
        <label className="username-label">
          Username:
          <input className="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="form-group">
  
        <label className="password-label">
          Password:
          <input className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br></br>
        <label className="confirm-password-label">
          Confirm Password:
          
          <input className="confirm-password-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="form-group">
        <label className="bio-label">
          Bio:<br></br>
          <textarea className="bio-textarea"value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <br></br>
        <label className="age-label">
          Age:
          <input className="age-input" type="text" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
        </label>
        </div>
        <div className="form-group">
        <label className="interest-description-label">
          Tell us about some of your interests and what gets you up in the morning?
          <br></br>
          <textarea className="interest-description-textarea" value={interestDescription} onChange={(e) => setInterestDescription(e.target.value)} />
          </label>
          <br></br>
          <label className="interest-tags-label">
            Interest Tags(Usa a Comma or Press Enter to Seperate Tags):
          {/* <ReactTags tags={interestTags}
                    suggestions={interestSuggestions}
                    handleDelete={handleInterestDelete}
                    handleAddition={handleInterestAddition}
                    handleDrag={handleInterestDrag}
                    delimiters={delimiters} /> */}
        </label>
        </div>
        <div className="form-group">
        <label className="values-description-label">
          What matters to you? Here is where you let users know about your values:
          <br></br>
          <textarea className="values-description-textarea" value={valueDescription} onChange={(e) => setValueDescription(e.target.value)} />
          </label>
          <br></br>
          <label className="values-tag-label">
            Values Tags (Use a Comma or Press Enter to Seperate Tags):
          {/* <ReactTags tags={valueTags}
                    suggestions={valueSuggestions}
                    handleDelete={handleValueDelete}
                    handleAddition={handleValueAddition}
                    handleDrag={handleValueDrag}
                    delimiters={delimiters} /> */}

        </label>
        </div>
        <div className="form-group">
        <label className="occupation-label">
          Occupation: 
          <input className="occupation-input" type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
        </label>
        </div>
        <div className="form-group">
        <label className="photo-label">
          Enter the URL of a Photo to use on your profile:
          <input placeholder="Use imgur for hosting..."className="photo-input" type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        </div>
        <div className="form-group">
        <label className="warm-up-question-label">
          Finally, come up with a question that users can answer to help you decide if you want them in you're network:
          <br></br>
          <textarea  className="warm-up-question-textarea" value={warm_up_question} onChange={(e) => setWarmUpQuestion(e.target.value)} />
        </label>
        </div>
        <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
        <button className="sign-up-submit-button"type="submit">Sign Up</button>
        </div>
        <div className="col-sm-3"></div>
        </div>
      </form>
      </div>
      <div className="col-sm-1 form-margin"></div>
      </div>
      </div>
      <div className="col-sm-4"></div>
    </div>
  );
}

export default SignupFormPage;
