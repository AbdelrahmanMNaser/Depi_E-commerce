import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const handleLogin = async () => {
      
      if (!email || !password) {
        alert("Please fill in both fields.");
        return;
      }
    
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
          // Handle unsuccessful login 
          const errorData = await response.json();
          alert(errorData.message || 'Login failed. Please try again.');
          return;
        }
    
        // Handle successful login
        const data = await response.json();
        console.log('Logged in successfully!', data);
    

        localStorage.setItem('token', data.token); // Store the token for authentication
  
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
      }
    };
    
    console.log('Logging in with', { email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-5">Login</h1>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
