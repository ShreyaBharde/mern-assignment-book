import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";



function Signup(){
    const history = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSignup = async (e) => {
        e.preventDefault();
      
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
        if (!username.match(emailPattern)) {
          setError('Please enter a valid email');
          return;
        } else if (!password.match(passPattern)) {
          setError('Password must be at least 8 characters with numbers, symbols, lowercase, and uppercase letters');
          return;
        }
      
        try {
          const res = await axios.post('http://localhost:8080/signup', { username, password });
      
          if (res && res.status === 201) {
            history("/home");
          }
        } catch (error) {
          console.error('Error creating user:', error.response.data.error);
          setError('Error creating user');
        }
      };
      
    return (
      <div className="loginpage">
        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={handleSignup}>
              <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
              <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <button type="submit">Signup</button>
              {error && <p className="message" style={{ color: 'red' }}>{error}</p>}
            </form>
  
            <p className="message">Already registered? <Link to="/">Login</Link></p>
          </div>
        </div>
      </div>
    );
}
export default Signup