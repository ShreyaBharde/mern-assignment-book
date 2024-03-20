import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const history = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSignin = async (e) => {
      e.preventDefault();
  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  
      if (!username.match(emailPattern)) {
        setError('Please enter a valid email');
        return;
      } else if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
  
      try {
        const res = await axios.post('http://localhost:8080/signin', { username, password });
  
        if (res.status === 201) {
          history("/home");
          console.log(res.data);
        } else {
          // Handle different responses here
          if (res.status === 401) {
            setError('Invalid username or password');
            // Generate an alert box for password mismatch
            alert('Password does not match');
          } else if (res.status === 500) {
            alert('Internal Server Error');
          }
        }
      } catch (error) {
        console.error('Error signing in:', error.response.data.error);
        setError('Error signing in');
      }
    };
  
    return (
    <div className="loginpage">
  
  <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={handleSignin}>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
            {error && <p className="message" style={{ color: 'red' }}>{error}</p>}
          </form>
  
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </div>
    );
}
export default Login;