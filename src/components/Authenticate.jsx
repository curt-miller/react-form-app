import { useState } from "react";

function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
    );
    const result = await response.json();
    setSuccessMessage(result.message);
    setUsername(result.data.username)
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate!</h2>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {username && <p>Logged in as <strong className="username">{username}</strong></p>}
      {error && <p className="errorMessage">{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}

export default Authenticate;
