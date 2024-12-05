import { useState } from "react";

function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const API = "https://fsa-jwt-practice.herokuapp.com/signup"


  async function handleSubmit(event) {
    event.preventDefault();

if (username.length < 8) {
    setValidationError("Username must be at least 8 characters long.");
    return;
}
if (password.length < 8) {
    setValidationError("Password must be at least 6 characters long.");
    return;
}
setValidationError(null);

    try {
       const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password})
       });
       const result = await response.json();
       if (result.success) {
        setToken(result.token);
       } setError(result.message);
       
    } catch (error) {
        console.error(error);
        
    }
  }

  return (
    <>
    <h2>Please Sign Up!</h2>
    {validationError && <p className="validationError">{validationError}</p>}
    <h3 className="successMessage">{error && <p>{error}</p>}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br/>
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
        <button>Submit</button>
      </form>
    </>
  );
}

export default SignUpForm;
